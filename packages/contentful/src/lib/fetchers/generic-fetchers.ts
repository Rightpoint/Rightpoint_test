import { get } from 'lodash'
import { getContentfulClientWithNextEnv } from '../client/contentful-client-next'

import { Entry, EntryCollection } from 'contentful'

/**
 * Contentful queries objects are type <any>
 */
type FetchQuery = {
    [key: string]: any
}

type FetchOptions = {
    preview?: boolean
}

/**
 *
 * @param {Object} query - contentful query
 * @param {Object} options - options
 * @param {Boolean} [options.preview] - use preview client
 */
export async function fetchEntries<E extends Entry<unknown> = Entry<unknown>>(
    query: FetchQuery = {},
    options: FetchOptions = {}
) {
    // entry type provided // no results
    const client = await getContentfulClientWithNextEnv({
        preview: options.preview,
    })
    const response = await client.getEntries<
        // client expects entry fields
        E extends Entry<any> ? E['fields'] : E
    >({
        ...query,
    })
    return response ? response.items : null
}

type ClientArgs = {
    environment?: string
}

/**
 *
 * Example:
 * {
 *  fetchEntry<MyEntry>({content_type: "myContentType"})
 * }
 * @param {Object} query - contentful query
 * @param {Object} options - options
 * @param {Boolean} [options.preview] - use preview client
 */
export async function fetchEntry<
    EntryType extends Entry<unknown> = Entry<unknown>
>(
    query: FetchQuery = {},
    options: FetchOptions = {},
    clientArgs: ClientArgs = {}
): Promise<EntryType | null> {
    const client = await getContentfulClientWithNextEnv({
        preview: options.preview,
        ...clientArgs,
    })
    const response = await client
        .getEntries({
            ...query,
        })
        .catch((ex) =>
            console.log('Error fetchEntry()', 'Query: ', query, 'Ex: ', ex)
        )

    if (!response || !response.items || !response.items[0]) {
        return null
    }

    return response.items[0] as EntryType
}

export async function fetchEntryById<
    EntryType extends Entry<unknown> = Entry<unknown>
>(
    id: string,
    options: FetchOptions = {},
    clientArgs: ClientArgs = {}
): Promise<EntryType | null> {
    const client = await getContentfulClientWithNextEnv({
        preview: options.preview,
        ...clientArgs,
    })
    const response = await client
        .getEntry(id)
        .catch((ex) =>
            console.log('Error fetchEntry()', 'Id: ', id, 'Ex: ', ex)
        )
    if (!response) {
        return null
    }
    return response as EntryType
}
