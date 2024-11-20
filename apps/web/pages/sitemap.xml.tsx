import { fetchEntries } from '@rightpoint/contentful'
import { PageMapperConfig } from '@rightpoint/core/next-contentful'
import { getAllPageMappers } from '@rightpoint/core/next-contentful/mappers/registry/all-pages'
import { getPublicDomainWithProtocol } from '@rightpoint/core/variables'
import { find, get } from 'lodash'

const DOMAIN_WITH_PROTOCOL = getPublicDomainWithProtocol()

function generateSiteMap(pages) {
    return `<?xml version="1.0" encoding="UTF-8"?>
     <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
       ${pages
           .map(({ path, lastMod }) => {
               return `
         <url>
             <loc>${`${DOMAIN_WITH_PROTOCOL}${path}`}</loc>
            <lastmod>${lastMod}</lastmod>
         </url>
       `
           })
           .join('')}
     </urlset>
   `
}

function SiteMapPage() {
    // getServerSideProps will do the heavy lifting
}

/**
 * Fake manager that won't fail if we try to use any methods on it.
 */
const fakeManager = new Proxy(
    {},
    {
        get(target, p, receiver) {
            return () => null
        },
    }
)

const getUrlForEntry = async (entry) => {
    /**
     * Get page mappers that aren't wholesale excluded from sitemap
     */
    const pageMappers = getAllPageMappers().filter((mapper) => {
        return (
            mapper.__mapperType === 'page' && mapper.excludeFromSitemap !== true
        )
    })
    const pageMapper = find(pageMappers, {
        contentTypeId: entry.sys.contentType.sys.id,
    }) as PageMapperConfig<any, any>
    /**
     * Remove entries with SEO field no_index
     */
    if (get(entry, `fields.${pageMapper.seoFieldName}.fields.no_index`)) {
        return null
    }
    if (pageMapper) {
        if (pageMapper.entryToUrl) {
            return {
                path: await pageMapper.entryToUrl({
                    entry,
                    // entryToUrl should not rely on manager long term (it is brittle)
                    manager: fakeManager as any,
                }),

                lastMod: entry.sys.updatedAt,
            }
        }
        return {
            path: pageMapper.urlBasePath + (entry.fields as any).slug,
            lastMod: entry.sys.updatedAt,
        }
    }
}

export async function getServerSideProps({ res }) {
    const MINUTE = 60
    const MAX_AGE = MINUTE * 60 // use cached version for 1 hour
    const STALE_WHILE_REVALIDATE = MINUTE * 60 * 24 // don't use cached version if it's older than 24 hours

    /**
     * Cache heavily
     */
    res.setHeader(
        'Cache-Control',
        `public, s-maxage=${MAX_AGE}, stale-while-revalidate=${STALE_WHILE_REVALIDATE}`
    )

    /**
     * Generate a sitemap given all pages.
     * This implementation receives all pages and their data from Contentful.
     *
     * Why we moved away from next-sitemap:
     * - next-sitemap uses built files to generate the sitemap, which means it cannot account for route rewrites
     * - next-sitemap does not allow us to efficiently remove pages that have no_index set on their SEO reference field
     *
     * To do:
     * - Switch to a GraphQL query to reduce payload size. Currently at about 40% capacity of API limits (3mb vs 7mb limit)
     */
    // https://www.contentful.com/developers/docs/references/graphql/#/introduction/query-complexity-limits
    const pageMappers = getAllPageMappers()

    const pageEntries =
        (await fetchEntries({
            'sys.contentType.sys.id[in]': pageMappers
                .map((mapper) => mapper.contentTypeId)
                .join(','),
            include: 1,
            limit: 1000,
            // cannot select a field to reduce payload size without specifying one content type id
        })) ?? []

    const paths = (await Promise.all(pageEntries.map(getUrlForEntry))).filter(
        Boolean
    )
    const sitemap = generateSiteMap(paths)

    res.setHeader('Content-Type', 'text/xml')
    res.write(sitemap)
    res.end()

    return {
        props: {},
    }
}

export default SiteMapPage
