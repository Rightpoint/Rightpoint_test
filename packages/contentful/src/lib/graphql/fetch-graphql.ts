const SPACE = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID
const ACCESS_TOKEN = process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN
const PREVIEW_TOKEN = process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW_TOKEN
const ENVIRONMENT = process.env.NEXT_PUBLIC_CONTENTFUL_ENVIRONMENT
const CONTENTFUL_URL = `https://graphql.contentful.com/content/v1/spaces/${SPACE}/environments/${ENVIRONMENT}`

interface FetchGraphQLParams {
    query: string
}

/**
 * Fetch a GraphQL Query from Contentful
 * query: GraphQL Query
 */
export const fetchGraphQL = async ({ query }: FetchGraphQLParams) => {
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
