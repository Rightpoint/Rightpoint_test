import type { CreateClientParams, ContentfulClientApi } from 'contentful'

interface CustomCreateClientParams extends CreateClientParams {
    /** Switches to preview endpoint & credentials */
    preview?: boolean
    previewToken: string
}

/**
 * Get contentful client via dynamic library import
 * so that client is not bundled in frontend unless needed.
 */
export const getContentfulClient = async (
    options: CustomCreateClientParams
): Promise<ContentfulClientApi> => {
    options.preview &&
        console &&
        console.log(
            'contentful client in preview mode. using public preview token:',
            options.previewToken
        )
    const createClient = (await import('contentful')).createClient
    const contentfulConfig = {
        space: options.space,
        accessToken: options.accessToken,
        environment: options.environment,
        ...(options.preview
            ? {
                  host: 'preview.contentful.com',
                  accessToken: options.previewToken,
              }
            : {}),
    }
    // !isServer && console.debug('Imported contentful client')
    const client = createClient(contentfulConfig)
    return client
}
