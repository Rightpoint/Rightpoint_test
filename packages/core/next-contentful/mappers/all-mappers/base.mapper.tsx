import safeJsonStringify from 'safe-json-stringify'
import type { Entry } from 'contentful'
import type { ConfigsManager } from '../registry/manager'
import type {
    MapperProps,
    MapperInterface,
    IsSanitizedToken,
} from './mapper.interface'
import type {
    ComponentMapperConfig,
    PageMapperConfig,
} from '../../configs/config.types'
import { get } from 'lodash'

export type ConstructorParams<Config> = {
    config: Config
    manager: ConfigsManager
    entry?: Entry<any> | null
    entryOrId: string | Entry<any>
}
/**
 *
 * A mapper consumes a config object and provides a consistent API
 * to interact with data from Contentful (or other).
 *
 * - Server side
 *      - Mapper fetches data
 *      - Recursively generate json safe props
 * - Client side
 *      - Mapper receives JSON-sourced props (from renderer Component)
 *      - Contains helpers to get common data (getUrl())
 *
 * Note: the mapper can run entirely on the client side as well, as the contentful API requires no privileged information.
 *
 * Known future risks:
 * - The contentful API response has a reference depth limit of 10.
 *      - Once this limit is reached, generating the prop tree will require additional fetches.
 *      - This can be resolved by checking if the entry is an un-fetched leaf node, then adding a fetch. if (!isFetched()) fetch()
 */
export class BaseMapper<E extends Entry<any>, P extends Record<string, any>>
    implements MapperInterface<P>
{
    manager: ConfigsManager
    config: ComponentMapperConfig<E, P> | PageMapperConfig<E, P>

    entry?: E

    // this is a required field, but may have null/undefined values if the mapper is initialized with a non existing entry.
    contentTypeId: string | null | undefined
    constructor({
        config,
        manager,
        entryOrId,
    }: ConstructorParams<
        ComponentMapperConfig<E, P> | PageMapperConfig<E, P>
    >) {
        this.config = config
        this.manager = manager
        if (typeof entryOrId === 'object') {
            this.entry = entryOrId as any // todo: how do we type this
            this.contentTypeId = get(entryOrId, 'sys.contentType.sys.id')
        } else if (typeof entryOrId === 'string') {
            // or an entry id only, which requires fetching.
            this.contentTypeId = entryOrId
        }
    }
    /**
     * If a component requires non JSON serializable props,
     * this function can be set to transform them at render time.
     *
     * Use case:
     * - Component requires a React component based on JSON
     */
    public prepareJsonUnsafeProps(props) {
        if (this.config.prepareJsonUnsafeProps) {
            return this.config.prepareJsonUnsafeProps({
                props: props,
                manager: this.manager,
            })
        }
        return props
    }
    private getEntryId() {
        if (this.entry) {
            return this.entry.sys.id
        }
    }
    private getEntryName() {
        if (this.entry) {
            return (
                this.entry?.fields?.internalName ||
                this.entry?.fields?.internalTitle ||
                this.entry?.fields?.title
            )
        }
    }
    /**
     * Add metadata to the prop payload because no identifying information remains from
     * original data source such as content type id, or entry id.
     */
    public async getMapperProps() {
        const mapperProps =
            (await this.config.entryToMapperProps?.({
                entry: this.entry,
                manager: this.manager,
            })) ?? {}
        return this.sanitizeJsonResponse({
            // this is required to know what component to render with these props
            __contentTypeId: this.config.contentTypeId,
            // this isn't required outside preview, but is useful for debugging
            __entryId: this.getEntryId(),
            // todo: this can be removed if not in preview mode
            __entryName: this.getEntryName(),
            // this is used to link to storybook
            ...mapperProps,
        })
    }
    public get Component() {
        return this.config.component
    }
    /**
     * Return JSON-safe object.
     *
     * Common build breaking issues:
     * - undefined as value
     * - circular references
     */
    public sanitizeJsonResponse<T>(json: T): T & IsSanitizedToken {
        if (!json) {
            return null
        }
        if (json.hasOwnProperty('then')) {
            throw new Error('Promise-like passed to sanitizer')
        }
        return this.removeUndefined(this.removeCircularReferences(json))
    }
    /**
     * Remove un-serializable circular references with: "[Circular]" string.
     * Occurs frequently via links.
     */
    private removeCircularReferences<T>(json): T {
        return safeJsonStringify.ensureProperties(json)
    }
    /**
     * Remove un-serializable undefined values
     */
    private removeUndefined(obj) {
        if (!obj) {
            return obj
        }
        Object.keys(obj).forEach((key) => {
            const value = obj[key]
            const type = typeof value
            if (type === 'object') {
                this.removeUndefined(value)
            } else if (type === 'undefined') {
                // undefined
                obj[key] = null
            }
        })
        return obj
    }
}
