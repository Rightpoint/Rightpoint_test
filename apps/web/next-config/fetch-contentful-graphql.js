const SPACE = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID
const ACCESS_TOKEN = process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN
const ENVIRONMENT = process.env.NEXT_PUBLIC_CONTENTFUL_ENVIRONMENT
const CONTENTFUL_URL = `https://graphql.contentful.com/content/v1/spaces/${SPACE}/environments/${ENVIRONMENT}`

/**
 * Fetch GraphQL from Contentful (next.config.js usage only)
 * For use in next.config.js only as it is not transpiled and cannot use TS.
 *
 * Otherwise use @rightpoint/contentful
 */
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
exports.fetchGraphQL = fetchGraphQL
