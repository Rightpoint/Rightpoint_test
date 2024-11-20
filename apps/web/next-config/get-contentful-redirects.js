/**
 * Get redirects from Contentful
 * - Note: runs per build, so does not instantly update.
 * - A webhook currently runs for CMS redirects that triggers a build.
 * A failed build will not promote to production, but is not ideal.
 *
 * Ideally, another layer handles redirects if used more frequently.
 *
 * A proposed such solution is to use:
 * - Vercel's Edge Middleware functions
 * - Vercel Edge Configs
 * - API that receives webhooks that triggers Edge Configs updates
 *
 * This way we have instant, safer, more scalable redirects.
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
            redirectCollection(limit: 900) {
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
exports.getContentfulRedirects = getContentfulRedirects

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
