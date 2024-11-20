import {
    MultiMediaEntry,
    MultiMediaProps,
    MultiMediaTypes,
} from '@rightpoint/core/components'
import { ConfigsManager } from '@rightpoint/core/next-contentful/mappers/registry/manager'

/**
 * Utility to help turn a standard multi media entry into an open graph image.
 * 
 * @param multiMediaEntry 
 * @param manager 

 */
export const getOpenGraphImageFromMultiMedia = async (
    multiMediaEntry: MultiMediaEntry,
    manager: ConfigsManager
) => {
    const multiMedia = await manager.getProps<MultiMediaProps>(
        multiMediaEntry,
        {
            restrictToContentTypes: ['multiMedia'],
        }
    )
    if (multiMedia && multiMedia.mediaType === MultiMediaTypes.IMAGE) {
        // TODO: use contentful transform to turn it into a standard size
        return relativeToAbsolute(multiMedia.mediaProps.src)
    }
    return null
}

/**
 * Contentful returns protocol relative URLs which do not resolve outside the browser.
 * Convert to https://
 */
const relativeToAbsolute = (relativeUrl: string): string => {
    if (relativeUrl.startsWith('//')) {
        return `https:${relativeUrl}`
    }
    return relativeUrl
}
