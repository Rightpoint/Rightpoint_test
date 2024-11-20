import { Entry, CreateClientParams } from 'contentful'
import { BaseMapper, ConstructorParams } from './base.mapper'
import { fetchEntries, fetchEntry } from '@rightpoint/contentful'
import { contentfulWarning, PageNotFoundError } from '@rightpoint/core/utils'
import { merge } from 'lodash'
import type { GetStaticPropsContext } from 'next'
import type { IsSanitizedToken, PageMapperInterface } from './mapper.interface'
import type { PageMapperConfig } from '../..'

export class PageMapper<
        E extends Entry<any> = Entry<any>,
        P = Record<string, any>
    >
    extends BaseMapper<E, P>
    implements PageMapperInterface<P>
{
    config: PageMapperConfig<E, P>

    nextContext?: GetStaticPropsContext<
        any,
        {
            contentful?: {
                environment?: string
            }
        }
    >

    entry?: E
    /**
     * Manually set an entry.
     *
     * Use cases:
     * - Entry is already known/loaded
     * - If custom fetch query/logic required
     */
    public setEntry(entry) {
        this.entry = entry
    }
    public async getEntry() {
        if (!this.entry) {
            this.entry = await this.fetchPageEntry()
        }
        return this.entry
    }

    constructor({
        config,
        manager,
        entryOrId,
        nextContext,
    }: ConstructorParams<PageMapperConfig<E, P>> & {
        nextContext: GetStaticPropsContext<
            any,
            {
                contentful?: {
                    environment?: string
                }
            }
        > | null
    }) {
        super({ config, manager, entryOrId })
        // Set the next page context. It contains current page parameters, preview data
        this.nextContext = nextContext
    }
    // helpers to access preview context
    private get __isPreview() {
        return !!this.nextContext?.preview
    }
    // helpers to access preview context environment
    private get __contentfulEnvironmentOverride() {
        return (
            this.__isPreview &&
            this.nextContext.previewData?.contentful?.environment
        )
    }
    /**
     * This is the main entry point into the application typically, from a page's getStaticProps
     * or getServerSideProps.
     *
     * getConfigsManager().getPageMapper('standardPage', { mapperType: 'page', nextContext: context }).getPageProps()
     */
    public async getPageProps<PageProps>() {
        /**
         * DO NOT sanitize this payload (nested sanitization causes extremely large size bloat).
         * All children are expected to do their own sanitization, so that they can be called individually.
         */
        return {
            pageProps: (await this.getProps()) as PageProps,
            seoProps: await this.getSeoProps(),
            pageGlobalsProps: await this.getPageGlobalsProps(),
            mapperProps: await this.getMapperProps(),
        }
    }
    /**
     * Return global page context props consumed in _app.tsx and exposed in global context.
     * Take care not to return any sensitive data.
     */
    public async getPageGlobalsProps() {
        return this.sanitizeJsonResponse({
            __isPreview: this.__isPreview,
            __contentfulEnvironmentOverride:
                this.__contentfulEnvironmentOverride,
        })
    }
    public async getProps(): Promise<P> {
        try {
            const pageProps = await this.config.entryToProps({
                entry: await this.getEntry(),
                manager: this.manager,
                nextContext: this.nextContext,
            })
            return this.sanitizeJsonResponse({
                ...pageProps,
            })
        } catch (ex) {
            console.error('Error getting page props', ex)
            return this.sanitizeJsonResponse({} as any)
        }
    }
    /**
     * Get card props for the page.
     *
     * Use cases:
     * - Open graph/social cards
     * - Card components linking to this page
     */
    public async getCardProps() {
        if (this.config.entryToCardProps) {
            try {
                const cardProps = await this.config.entryToCardProps({
                    entry: await this.getEntry(),
                    manager: this.manager,
                })
                if (!cardProps?.linkProps?.href) {
                    cardProps.linkProps = null
                }
                return cardProps
            } catch (ex) {
                console.error('Error getting card props', ex)
                return {}
            }
        }
        return null
    }
    /**
     * Get defaults from mapper.entryToSeoProps() if it exists.
     * If SEO override entry exists, merge with the defaults.
     *
     * Common use cases:
     * - Adding noindex, no crawl
     * - Custom canonical URL
     * - Custom title, description
     */
    public async getSeoProps() {
        const seoProps = await this.getSeoProps_()

        /**
         * If no canonical is provided, always set it.
         * - This helps ensure rewrites don't require manually remembering setting them
         * - As well as ignoring query strings such as ?404=<hint>
         */
        if (!seoProps.canonicalUrl) {
            seoProps.canonicalUrl = await this.getUrl()
        }
        return this.sanitizeJsonResponse(seoProps)
    }

    private async getSeoProps_() {
        const entry = await this.getEntry()

        /**
         * Get reasonable defaults from entry, if provided
         */
        const seoDefaults =
            (await this.config.entryToSeoProps?.({
                entry,
                manager: this.manager,
            })) ?? {}

        /**
         * Override defaults with SEO entry, if provided
         */
        const seoEntry = entry.fields[this.config.seoFieldName]
        if (seoEntry) {
            try {
                const seoMapper = this.manager.getComponentMapper(seoEntry, {
                    mapperType: 'component',
                })
                return merge(seoDefaults, await seoMapper.getProps())
            } catch (ex) {
                console.error('Error getting seo props', ex)
            }
        }

        return seoDefaults
    }
    /**
     * Get the URL for a page entry.
     *
     *
     * This function is async to allow for data fetching: an entry may be composed of multiple other parents that must be queried.
     * /<url-part-1>/<url-part-2>/
     */
    async getUrl(): Promise<string | null> {
        if (this.config.entryToUrl) {
            return await this.config.entryToUrl({
                entry: this.entry,
                manager: this.manager,
            })
        } else {
            const slug = this.entry?.fields?.[this.config.slugFieldName]
            const isRoot = slug === '/'
            return `${this.config.urlBasePath}${isRoot ? '' : slug}`
        }
    }

    /**
     * Get default query parameters.
     */
    private getQueryParams({ config, nextContext }) {
        const { contentTypeId, slugFieldName, slugContextName } = config
        const slugValue = nextContext.params[slugContextName]
        const slugQuery = `fields.${slugFieldName}`
        return {
            content_type: contentTypeId,
            [slugQuery]: slugValue,
            include: 7,
        }
    }
    /**
     * Get a page entry.
     * - Preview context may override the target environment.
     */
    public async fetchPageEntry({
        // optional query override
        getQuery,
    }: {
        getQuery?: (params: {
            config: PageMapperConfig<E, P>
            nextContext: any
        }) => Record<string, any>
    } = {}): Promise<E> {
        // if no custom query function, and no context, throw error. default query builds params from context.
        if (!getQuery && !this.nextContext) {
            throw new Error(
                'No next page context found. Initialize context first.'
            )
        }

        getQuery = getQuery ?? this.getQueryParams
        const query = await getQuery({
            config: this.config,
            nextContext: this.nextContext,
        })

        const debug = false
        debug && console.log('Query', query)

        const entry = await fetchEntry<E>(
            query,
            {
                preview: this.nextContext?.preview,
            },
            this.getContentfulClientOverrides()
        )

        const space = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID
        const accessToken = process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN
        const previewToken = process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW_TOKEN
        const environment = process.env.NEXT_PUBLIC_CONTENTFUL_ENVIRONMENT

        if (!entry) {
            console.log('no entry found for query: ', query, {
                space,
                accessToken,
                previewToken,
                environment,
            })

            throw new PageNotFoundError('No entry found')
        }
        return entry
    }
    /**
     * The preview environment may set overridden contentful client options
     * such as for accessing the staging environment from a preview link.
     */
    private getContentfulClientOverrides(): Partial<CreateClientParams> {
        const environment = this.__contentfulEnvironmentOverride
        return environment ? { environment } : null
    }
    /**
     * Return common getStaticPaths paths.
     *
     * Not intended to work for all scenarios, but to cover most use cases.
     *
     * Usage:
     *
     * const { paths } = await getConfigsManager()
     *   .getPageMapper('myPage')
     *   .fetchPagePaths()
     *
     */
    public async fetchPagePaths() {
        const { contentTypeId, slugFieldName, slugContextName } = this.config
        const entries = await fetchEntries<E>({
            content_type: contentTypeId,
            include: 0,
            limit: 1000, // default is 200 pages
            /**
             * TODO: to reduce build size, we could only fetch the latest entries by date
             * and dynamically generate the rest.
             */
        })
        const paths = entries.map((entry) => {
            const slug = entry.fields[slugFieldName]
            if (!slug) {
                contentfulWarning('no slug found on entry', entry)
            }
            return {
                params: {
                    [slugContextName]: slug,
                },
            }
        })
        return {
            paths,
        }
    }
}
