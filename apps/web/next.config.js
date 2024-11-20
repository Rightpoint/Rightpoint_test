// /* eslint-disable @typescript-eslint/no-var-requires */
const packagesToTranspile = [
    '@rightpoint/data-generators',
    '@rightpoint/core',
    '@rightpoint/contentful',
    '@rightpoint/private-variables',
    '@rightpoint/app-insights',
    // DO NOT REMOVE: GENERATOR_PACKAGES_ENTRYPOINT
]

const config = {
    transpilePackages: packagesToTranspile,
    reactStrictMode: true,
    webpack: (config, { dev }) => {
        config.module.rules = [
            ...config.module.rules,
            // force local packages to not have side effects
            {
                test: /packages\/.*/,
                sideEffects: false,
            },
        ]
        return config
    },
    // https://nextjs.org/docs/advanced-features/compiler
    compiler: {
        // ssr and displayName are configured by default
        styledComponents: {
            // Enabled by default in development, disabled in production to reduce file size,
            // setting this will override the default for all environments.
            // displayName: true,
            // Enabled by default.
            ssr: true,
        },

        // removeConsole: {
        //     exclude: ['error'],
        // },
    },
    images: {
        domains: ['images.ctfassets.net', 'source.unsplash.com'],
    },
    async redirects() {
        const redirectsFromCms = await getContentfulRedirects()
        return [
            {
                source: '/thought/articles/(\\d{1,})/(\\d{1,})/(\\d{1,})/:slug',
                destination: '/thought-detail/:slug', // Matched parameters can be used in the destination
                permanent: false,
            },

            ...redirectsFromCms,
        ].splice(0, 1000)
    },
}

// const withBundleAnalyzer = require('@next/bundle-analyzer')({
//     enabled: process.env.ANALYZE === 'true',
// })

// const withPlugins = require('next-compose-plugins')
// module.exports = withPlugins([[withBundleAnalyzer]], config)

module.exports = config

/**
 * Get redirects from Contentful
 * - Note: runs per build, so does not instantly update.
 * - Another layer should handle post-build redirects
 */
async function getContentfulRedirects() {
    const SPACE = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID
    const ACCESS_TOKEN = process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN
    const ENVIRONMENT = process.env.NEXT_PUBLIC_CONTENTFUL_ENVIRONMENT
    const CONTENTFUL_URL = `https://graphql.contentful.com/content/v1/spaces/${SPACE}/environments/${ENVIRONMENT}`

    const fetchGraphQL = async ({ query }) => {
        const response = await fetch(CONTENTFUL_URL, {
            method: 'POST',
            body: JSON.stringify({ query: query }),
            headers: {
                authorization: `Bearer ${ACCESS_TOKEN}`,
                'Content-Type': 'application/json',
            },
        })
        return response.json()
    }

    // next.js has a 1000 redirect limit
    const query = `
        query Redirects {
            redirectCollection(limit: 1000) {
                items {
                    source
                    destination
                    permanent
                }
            }
        }`

    const result = await fetchGraphQL({ query })
    const items = result.data?.redirectCollection?.items ?? []
    return items.map(validateSimpleRedirect).filter(Boolean)
}

/**
 * Validate a string to string basic redirect.
 */
function validateSimpleRedirect(redirect) {
    const { source, destination, permanent } = redirect
    try {
        const redirectResponse = {
            source: getValidPathname(source),
            destination: getValidPathname(destination),
            permanent: Boolean(permanent),
        }
        return redirectResponse
    } catch (ex) {
        // ignore invalid redirects; do not break build.
        console.error(
            'Invalid CMS redirect: ',
            source,
            destination,
            ex?.message
        )
        return null
    }
}

/**
 * The build time redirects are powerful, but also fail loudly if
 * there is an error in teh configuration via exit(1).
 *
 * There is a function we can import directly from the next validator, but its failure uses process.exit()
 * which cannot be caught;
 *
 * Let's have a naive implementation that allows simple source to destination mappings.
 *
 * Advanced redirects can be handled by developers, or in the future, perhaps a well hidden "advanced" field in the CMS.
 *
 * https://nextjs.org/docs/api-reference/next.config.js/redirects
 */
function getValidPathname(url) {
    const DOES_NOT_MATTER = 'http://rightpoint.com' // this is used just to use the URL helper
    try {
        // this method will throw if the url contains regex mostly
        const urlObj = new URL(url, DOES_NOT_MATTER)
        const pathname = urlObj.pathname
        if (pathname.includes('*') || pathname.includes(':')) {
            console.log('redirect contains wildcard -- unsupported from CMS')
            throw new Error('Wildcard not supported yet')
        }
        return urlObj.pathname
    } catch (ex) {
        throw ex
    }
}
