/**
 * PRIVATE contentful variables
 *
 * These should NEVER be exposed to client side code.
 */

export type ContentfulEnvironments = 'master' | 'staging' | 'playground'
export type ContentfulEnvironmentConfig = {
    previewDomain: string
}
const environments: {
    [key in ContentfulEnvironments]: ContentfulEnvironmentConfig
} = {
    master: {
        previewDomain: 'https://rightpoint.vercel.app',
    },
    staging: {
        previewDomain: 'https://staging.rightpoint.vercel.app',
    },
    playground: {
        previewDomain: 'https://playground-rightpoint.vercel.app',
    },
}

export const __privateContentful = {
    environments,
    // sensitive keys should be stored in in Vercel secrets; pulled via API
} as const
