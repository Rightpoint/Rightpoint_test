/**
 * GraphQL Contentful Test.
 *
 * The querying syntax is fantastic for pulling arbitrary data
 * in the shape you want (in theory, though it breaks on the many reference fields nesting)
 * but requires a lot of manual typing, graphql query building and maintenance for pulling
 * full page loads of data.
 *
 */

type HeroContentfulShape = {
    title: string
    body?: string
    buttonText?: string
    __typename: 'HeroComponent'
    buttonLink: {
        slug: string
        __typename: 'Page' | string
    }
    linkedFrom: {
        pageCollection: {
            items: [
                {
                    slug: string
                    title: string
                    seo: {
                        name: string
                        description: string
                    }
                }
            ]
        }
    }
}

const fragments = {
    heroComponent: () => `
        fragment heroComponent on  {   
    `,
}

export const getComposePage = () => `
    query Index {
        pageCollection(limit: 1, where: {slug: "/"}) {
            items {
                title
                name
                slug
                content {
                    ... on PageContentPage {
                        pageTitle
                    }
                    ... on PageDemoPageType {
                        headline
                    }
                }
                seo {
                    description
                }
            }
        }
    }`
