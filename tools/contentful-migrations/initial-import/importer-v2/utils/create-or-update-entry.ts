import { Entry, Asset } from 'contentful-management'
import { ContentfulEnvironmentAPI } from 'contentful-management/dist/typings/create-environment-api'
import { deterministicId } from './deterministic-id'
import { transformToLocale } from './transform-to-locale'
import kebabCase from 'lodash/kebabCase'
import { metadataTags } from './import-metadata'

type EntryArg = {
    environment: ContentfulEnvironmentAPI
    id: string
    fields: Record<string, unknown>
    contentTypeId: string
}
export async function createOrUpdateEntry({
    environment,
    id,
    fields,
    contentTypeId,
}: EntryArg): Promise<Entry> {
    const entry = await environment.getEntry(id).catch((ex) => {})
    if (entry) {
        console.log('UPDATE ENTRY: ')
        console.log({
            contentTypeId,
            id,
        })
        entry.fields = transformToLocale(fields)
        entry.metadata = metadataTags

        return await entry
            .update()
            .then((entry) => {
                const entryContentTypeId = entry.sys.contentType.sys.id
                if (entryContentTypeId !== contentTypeId) {
                    throw new Error(
                        `Content type of deterministic ID is different
                        entry is: ${entryContentTypeId} vs new entry: ${contentTypeId}`
                    )
                }
                console.log('Updated: ', entry.fields)
                return entry.publish()
            })
            .catch((ex) => {
                console.log('Error updating existing entry')
                console.log('- Consider changing the deterministic id')
                throw ex
            })
    } else {
        console.log('CREATE ENTRY: ', contentTypeId, id)
        return await environment
            .createEntryWithId(contentTypeId, id, {
                fields: transformToLocale(fields),
                metadata: metadataTags,
            })
            .then((entry) => {
                console.log('Created: ', entry.fields)
                return entry.publish()
            })
    }
}

type AssetArg = {
    environment: ContentfulEnvironmentAPI
    url: string
    title: string
    description: string
    domain?: string
}
export async function createOrUpdateAsset({
    environment,
    url,
    title = '',
    description = '',
    domain = 'https://rightpoint.com', // to calculate absolute url for download
}: AssetArg): Promise<Asset> {
    console.log(' ')
    console.log('BEGIN ASSET: for url: ', url)
    const stripQueryString = (v: string) => v.split('?')[0]
    const getFilenameFromUrl = (url) => {
        const getFilename = (v: string) => v.split('/').slice(-1)[0]
        const filename = getFilename(url)
        const filenameWithoutQueryString = stripQueryString(filename)
        return filenameWithoutQueryString
    }
    // get the filename without querystrings, and kebab case it
    const fileName = getFilenameFromUrl(url)
    const urlWithoutQueryString = stripQueryString(url)

    // RP urls contain spaces
    // some image urls might be absolute, but not for now.
    console.log(' Converted url from ', url, ' to ', urlWithoutQueryString)
    const uploadUrlAbsolute = domain + urlWithoutQueryString

    const extension = urlWithoutQueryString.split('.').slice(-1)[0]
    const contentType = 'image/' + extension

    const id = deterministicId('asset', urlWithoutQueryString, fileName)

    if (!fileName) {
        console.log(' No filename found out of URL', url, '...bailing')
        return null
    }
    console.log(' Updating or creating:', id, ' Filename: ', fileName, {
        contentType,
    })

    const asset = await environment.getAsset(id).catch((ex) => {})

    const fields = {
        title,
        description,
        file: {
            contentType,
            fileName: fileName.replace(' ', '-').replaceAll('%20', '-'),
            // sometimes, RP uploads are url encoded, sometimes not.
            upload: encodeURI(uploadUrlAbsolute).replaceAll('%2520', '%20'),
        },
    }

    if (asset) {
        console.log('EXISTS: Use existing asset')
        return asset
        // console.log('Deleting asset and reuploading.', asset.fields.file)
        // if (asset.isPublished()) {
        //     await asset.unpublish()
        // }
        // await asset.delete()
    }

    console.log('CREATE ASSET:', fileName, 'remote URL: ', uploadUrlAbsolute)
    const newAsset = await environment
        .createAssetWithId(id, {
            fields: transformToLocale(fields),
            metadata: metadataTags,
        })
        // process images
        .then((asset) => {
            console.log(' Processing asset.', asset.fields.file)
            return asset.processForAllLocales({
                processingCheckRetries: 50,
                // time to wait before checking if asset is ready
                // 10 * 500 = 5 seconds total
                processingCheckWait: 500,
            })
        })
        .then((asset) => asset.publish())
        .catch((ex) => {
            console.log('!!!')
            console.log('!!!')
            console.log('Error processing asset', ex)
            console.log('Error processing asset', ex)
            console.log('Error processing asset', ex)
            console.log('!!!')
            console.log('!!!')
            try {
                console.log(
                    "Deleting asset because it's broken / unprocessed",
                    ex
                )
                environment
                    .getAsset(id)
                    .then((asset) => asset.delete())
                    .then(() => {
                        console.log('DELETE ASSET: Successfully deleted asset')
                    })
            } catch (ex) {
                console.log('DELETE FAIL: Failed to delete asset')
            }
            return null
        })
    console.log('Completed upload', newAsset.fields.file.fileName)
    return newAsset
}
