/**
 * The manager class is described below.
 *
 * WARNING: be very careful about what is imported here. It is easy to introduce circular dependencies on accident:
 * - When importing a type, make sure to use the `import type` syntax
 * - Do not import code that is itself imported into a mapper configuration file (e.g. Link.component.tsx)
 */
import { find, get, omit } from 'lodash'

import { ComponentMapper } from '../all-mappers/component.mapper'
import { PageMapper } from '../all-mappers/page.mapper'

import { pageConfigNotFound } from '../../configs/fallbacks/page-config-not-found'
import { componentConfigNotFound } from '../../configs/fallbacks/component-not-found'
import { componentConfigNotAllowed } from '../../configs/fallbacks/component-not-allowed'
import { componentConfigNoEntry } from '../../configs/fallbacks/component-no-entry'

import type { ComponentPropsWithMeta } from '../all-mappers/mapper.interface'
import type { GetStaticPropsContext } from 'next'
import type { Entry } from 'contentful'
import type { Config } from '../../configs/config.types'
import type { LinkProps, MultiMediaProps } from '@rightpoint/core/components' // careful with a non type import re: circular import

type EntryOrId = string | Entry<any>

type Options = {
    mapperType?: 'component' | 'page'

    /**
     * Next page context object.
     * Overrides queries for preview mode, exposes path parameters, etc.
     */
    nextContext?: GetStaticPropsContext<any, any>

    /**
     * Optionally pass in a custom config object to override the default behavior.
     * Useful for having multiple configurations for the same content type (landing page, landing page thank you)
     */
    customMapperConfig?: Config

    /**
     * Restrict mapper resolution to specific content types.
     * Useful when a field can be linked to multiple content types, but you only want to resolve one of them.
     * For example, there is no guarantee Contentful will return a particular content type in a reference field.
     */
    restrictToContentTypes?: string[]
}

/**
 * Handles Next.js + Contentful integration
 * ----------------------------------------
 *
 * This class is responsible for generating the Contentful data tree, fetching the data, and mapping it to local component props.
 *
 * How it works:
 *   1. Configuration objects are imported from *.contentful files across the project into all-configs.tsx.
 *      We use plain objects to reduce dependencies.
 *   2. Configurations are registered into this class in that same file. The instance is imported from that file directly throughout application without a barrel.
 *   3. This class is used to access configurations and instantiate them with Page/Component mapper classes
 *   4. The mapper classes provide a consistent API to interact with configurations such as PageMapper.getUrl()
 *      or ComponentMapper.getProps()
 *   5. The mapper classes are passed the manager instance to recursively generate their data trees via getProps()
 *      while preventing circular reference issues.
 *
 * Shortcuts:
 *   The manager class also houses shortcut functions like manager.getUrl(entry), manager.getProps(entry),
 *   manager.getPageCardProps(entry) vs manager.getXMapper(entry).getProps()
 *
 * Future enhancements:
 *   1. Use it to validate, visualize, log errors in the tree.
 */
export class ConfigsManager {
    protected __isPreview_ = false
    public configs: Config[] = []
    constructor(configs: Config[]) {
        this.register(configs)
    }
    public static init(configs: Config[] = []): ConfigsManager {
        return new ConfigsManager(configs)
    }
    public register(configs: Config[]) {
        configs.map((config) => {
            this.configs.push(config)
        })
    }
    private getContentTypeId(arg: EntryOrId): string {
        const isString = typeof arg === 'string'
        if (isString) {
            return arg
        }
        if (arg.sys.type === 'Link') {
            // this is a link _to_ an entry of unknown type
            console.log(
                'Cannot get content type of a Link entry. Likely an unresolvable Link (deleted, unpublished, etc.)'
            )
            // note: in an extremely rare scenario, the link could also be due to the 10 depth limit of the Contentful response.
            return null
        }
        // Handle the "Asset" native type which has no contentType field.
        if (get(arg, 'sys.type') === 'Asset') {
            return 'image'
        } else {
            const id = get(arg, 'sys.contentType.sys.id')
            if (!id) {
                console.log('No content type id found for arg: ', arg)
                return null
            }
            return id
        }
    }
    /**
     * Mapper getters
     */
    public getPageMapper(entryOrId: EntryOrId, options?: Options) {
        if (!entryOrId) {
            throw new Error("Nothing passed to getPageMapper. Can't continue.")
        }
        const contentTypeId = this.getContentTypeId(entryOrId)
        const config = options?.customMapperConfig
            ? options.customMapperConfig
            : find(this.configs, {
                  contentTypeId,
                  __mapperType: 'page',
              })
        const data = {
            config: config || (pageConfigNotFound as any),
            manager: this,
            entryOrId: entryOrId,
            nextContext: options?.nextContext,
        }
        if (!config) {
            /**
             * This error will appear if a page config can't be found
             * for a given contentTypeId.
             */
            console.error(
                `No page config found for contentTypeId: ${contentTypeId}`
            )
            /**
             * This is usually caused by nesting level issue?
             */
            process.env.NODE_ENV === 'development' && console.trace()
        }

        return new PageMapper(data)
    }
    public getComponentMapper(entryOrId, options?: Options) {
        let config
        if (!entryOrId) {
            // no entry/id
            config = componentConfigNoEntry
        } else {
            config = find(this.configs, {
                contentTypeId: this.getContentTypeId(entryOrId),
                __mapperType: 'component',
            })
            if (!config) {
                // entry/id, but none found
                config = componentConfigNotFound
            } else {
                // entry/id found, but is it allowed?
                if (config && options?.restrictToContentTypes) {
                    const isAllowed = options.restrictToContentTypes.includes(
                        config.contentTypeId
                    )
                    if (!isAllowed) {
                        // fallback should be a component that renders nothing
                        // an error is too expensive
                        console.log(
                            `Content type ${
                                config.contentTypeId
                            } doesn't match any of the allowed types [${options.restrictToContentTypes.join(
                                ', '
                            )}].`
                        )
                        config = componentConfigNotAllowed
                    }
                }
            }
        }

        const data = {
            config,
            manager: this,
            entryOrId: entryOrId,
        }
        return new ComponentMapper(data as any)
    }
    /**
     * Common helpers
     */
    public async getPageCardProps(entryOrId: EntryOrId) {
        if (!entryOrId) {
            return null
        }
        if (typeof entryOrId === 'string') {
            // it's an id
        } else if (entryOrId?.sys.type === 'Link') {
            // TODO: persistently log
            /**
             * If this is caused by a nesting limit as opposed to a "dead link" (i.e. deleted entry)
             * then we must trigger a new Contentful request to get the entry payload.
             *
             * For now, we'll just return an empty object, because we don't expect to hit the single response nesting limit.
             */
            process.env.NODE_ENV === 'development' &&
                console.log(
                    `getPageCardProps attempting to follow a Link reference -- either missing link, or 10x nesting limit`
                )
            return {}
        }
        try {
            return this.getPageMapper(entryOrId, {
                mapperType: 'page',
            }).getCardProps()
        } catch (ex) {
            console.error('Exception generating card props', ex)
            return {}
        }
    }
    public async getProps<T>(entryOrId: any, options?: Options): Promise<T>
    public async getProps(entryOrId: EntryOrId, options?: Options) {
        if (!entryOrId) {
            return null
        }
        const mapper = this.getComponentMapper(entryOrId, options)
        return mapper.getProps()
    }
    public async getMultiMediaProps(entryOrId: EntryOrId, options?: Options) {
        if (!entryOrId) {
            return null
        }
        const mapper = this.getComponentMapper(entryOrId, {
            restrictToContentTypes: ['multiMedia'],
            ...options,
        })
        return (await mapper.getProps()) as MultiMediaProps
    }
    public async getUrl(entry: Entry<any>): Promise<string> {
        if (!entry) {
            return null
        }
        const pageMapper = this.getPageMapper(entry)
        return await pageMapper.getUrl()
    }
    /**
     * Get LinkProps from a Link content model or a Page content model.
     */
    public async getLinkProps(
        entry: Entry<any>,
        options?: {
            text?: string
            getText?: (entry, manager) => string
        }
    ): Promise<LinkProps> {
        if (!entry) {
            return null
        }
        // if it's a link content model return it
        if (
            [
                // TODO: remove obsoleted once all references deleted.
                'componentBigLinkListItem',
                // new link model
                'link',
            ].includes(entry.sys?.contentType?.sys?.id)
        ) {
            // if it's a link content model, it has full control over text, other behavior.
            return (await this.getComponentMapper(
                entry
            ).getProps()) as LinkProps
        } else {
            // otherwise, it might be a page
            try {
                /**
                 * Do not call methods that themselves may cause link resolution,
                 * otherwise we'll get into an infinite loop.
                 *
                 * For example, do not call this.getCardProps(entry) here which itself could
                 * call getLinkProps().
                 */
                return {
                    href: await this.getUrl(entry),
                    /**
                     * NOTE: There is a blind assumption that pages contain a Title field.
                     *
                     * These titles can be too long for links. In future, consider adding a
                     * entryToLinkTitle() function to the page config.
                     */
                    text:
                        options?.text ||
                        entry.fields.title ||
                        'Page has no title field',
                }
            } catch (ex) {
                /**
                 * This is an unresolved link without entry payload data.
                 *
                 * This occurs in a few possible scenarios:
                 * - Missing reference to a stale/deleted entry (very likely)
                 * - Contentful maximum nesting limit reached of 10 (unlikely)
                 * - Explicitly requested to not resolve links but somehow made it into this function
                 *
                 * In the future, we could async resolve the link here via fetchEntryById(entry.sys.id)
                 * to confirm if it's a resolution issue or nesting issue but currently it is 99% likely to be a stale link.
                 */
                if (entry.sys.type === 'Link') {
                    return null
                }
                const contentTypeId = entry?.sys?.contentType?.sys?.id
                console.error(
                    'Error getting URL from entry. Could be an unregistered, stale page reference. Content type id: ',
                    contentTypeId || JSON.stringify(entry)
                )
                return null
            }
        }
    }
    /**
     * Convert an array of component entries to ComponentPropsWithMeta during SSG.
     * The output of this function can be passed to the `Components` renderer component.
     *
     * Usage:
     * const componentsProps = getComponentProps(entry.fields.myReferenceArray)
     * <Components componentsProps={componentsProps} />
     */
    public async getAllComponentsProps(
        componentEntries: Entry<any>[]
    ): Promise<ComponentPropsWithMeta[]> {
        if (!componentEntries) {
            // expected null scenario: getAllComponentsProps(entry.fields.optionalReferenceArray)
            return null
        }
        return await Promise.all(
            componentEntries.map((componentEntry) =>
                this.getComponentMapper(
                    componentEntry
                ).getComponentPropsWithMeta()
            )
        )
    }

    /**
     * Preview mode
     */
    public get __isPreview(): boolean {
        return this.__isPreview_
    }
    public set __isPreview(value: boolean) {
        this.__isPreview_ = value
    }
}
