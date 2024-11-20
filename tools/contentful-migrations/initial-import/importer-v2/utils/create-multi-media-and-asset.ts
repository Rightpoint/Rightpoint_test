import { MultiMediaEntry } from '@rightpoint/core/components'
import {
    createOrUpdateAsset,
    createOrUpdateEntry,
} from './create-or-update-entry'
import { deterministicId } from './deterministic-id'
import { entryToLink } from './entry-to-link'

export const createMultiMediaAndAsset = async ({
    environment,
    url,
    title,
    description,
    asLinkReference = false,
}) => {
    console.log(' ')
    console.log('BEGIN MULTI MEDIA IMAGE: ', title, url)
    const urlWithoutQuery = url.split('?')[0]
    const asset = await createOrUpdateAsset({
        environment,
        title,
        description,
        url,
    })
    if (!asset) {
        console.log('!!!')
        console.log('ERROR: No asset returned, exit')
        console.log('!!!')
        return null
    }
    const multiMediaFields: Partial<MultiMediaEntry['fields']> = {
        internalTitle: `${title}`,
        image: entryToLink(asset, 'Asset'),
    }

    const multiMedia = await createOrUpdateEntry({
        environment,
        id: deterministicId('multiMedia', urlWithoutQuery),
        contentTypeId: 'multiMedia',
        fields: multiMediaFields,
    })
    console.log('COMPLETE MULTI MEDIA IMAGE: ', title, urlWithoutQuery)
    if (asLinkReference) {
        return entryToLink(multiMedia, 'Entry')
    }
    return multiMedia
}

export const createMultiMediaVideo = async ({
    environment,
    url,
    title,
    description,
    asLinkReference = false,
}) => {
    console.log(' ')
    console.log('BEGIN MULTI MEDIA VIDEO: ', title, url)
    const multiMediaFields: Partial<MultiMediaEntry['fields']> = {
        internalTitle: `Work Media: ${title}`,
        videoUrl: url,
    }
    const multiMedia = await createOrUpdateEntry({
        environment,
        id: deterministicId('multiMedia', url),
        contentTypeId: 'multiMedia',
        fields: multiMediaFields,
    })

    console.log('COMPLETE MULTI MEDIA VIDEO: ', title, url)
    console.log(' ')
    if (asLinkReference) {
        return entryToLink(multiMedia, 'Entry')
    }
    return multiMedia
}
