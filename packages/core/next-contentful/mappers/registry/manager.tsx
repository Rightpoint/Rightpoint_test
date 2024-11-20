import { find, get } from 'lodash'

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

type EntryOrId = string | Entry<any>

type Options = {
    restrictToContentTypes?: string[]
    mapperType?: 'component' | 'page'
    nextContext?: GetStaticPropsContext<any, any>
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
            console.log("Cannot get content type of a Link entry. Likely an unresolvable Link (deleted, unpublished, etc.)")            
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
        const config = find(this.configs, {
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
            // TODO: Persistently log;
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
        const mapper = this.getComponentMapper(entryOrId, options)
        return mapper.getProps()
    }
    public async getUrl(entry: Entry<any>): Promise<string> {
        if (!entry) {
            return null
        }
        const pageMapper = this.getPageMapper(entry)
        return await pageMapper.getUrl()
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
