/**
 * PRIVATE contentful variables
 *
 * These should NEVER be exposed to client side code.
 */

export type ContentfulEnvironments = 'master' | 'staging' | 'develop'
export type ContentfulEnvironmentConfig = {
    previewDomain: string
}
const environments: {
    [key in ContentfulEnvironments]: ContentfulEnvironmentConfig
} = {
    master: {
        previewDomain: 'https://www.rightpoint.com',
    },
    staging: {
        previewDomain: 'https://staging.rightpoint.vercel.app',
    },
    develop: {
        previewDomain: 'https://develop.rightpoint.vercel.app',
    },
}

export const __privateContentful = {
    environments,
    // sensitive keys should be stored in in Vercel secrets; pulled via API
} as const
