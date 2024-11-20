import { getContentfulClient } from './contentful-client'

const space = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID as string
const accessToken = process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN as string
const previewToken = process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW_TOKEN as string
const environment = process.env.NEXT_PUBLIC_CONTENTFUL_ENVIRONMENT as string

/**
 * Get a contentful client via next environment variables
 *
 * @param {object} overrides - override the configuration
 */
export const getContentfulClientWithNextEnv = async (overrides = {}) => {
    return await getContentfulClient({
        space,
        accessToken,
        previewToken,
        environment,
        ...overrides,
    })
}
