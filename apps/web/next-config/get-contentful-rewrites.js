const { fetchGraphQL } = require('./fetch-contentful-graphql.js')
/**
 * CMS driven rewrites for Next.js
 * - Rewrites are safe when they clash with a local page URL
 * - By default, the local "file" page take precedence
 * Changing this behavior requires a different output structure in rewrites (beforeFiles, afterFiles, fallback, etc)
 * - Be aware of sitemap.xml and canonicals for pages rewritten
 */

/**
 * Map Landing Page Categories to Root Paths.
 */
async function getLandingPageCategoryRewritesToRoot() {
    const query = `
        query LandingPageCategories {
            landingPageCategoryCollection {
                items {
                    slug,
                }
            }
        }
    `
    const response = await fetchGraphQL({ query })
    const landingPageCategories =
        response?.data?.landingPageCategoryCollection?.items ?? []
    return landingPageCategories.flatMap(({ slug }) => [
        /**
         * From:
         * /<landing-page-category-slug>
         *
         * To:
         * /landing/<landing-page-category-slug>
         */
        {
            source: `/${slug}`,
            destination: `/landing-pages/category/${slug}`,
        },
        /**
         * From:
         * /<landing-page-category-slug>/<page-slug>
         *
         * To:
         * /landing-page-detail/<page-slug>
         */
        {
            source: `/${slug}/:path*`,
            destination: `/landing-pages/detail/:path*`,
        },
    ])
}

async function getContentfulRewrites() {
    const rewrites = [...(await getLandingPageCategoryRewritesToRoot())]
    return rewrites
}

exports.getContentfulRewrites = getContentfulRewrites
