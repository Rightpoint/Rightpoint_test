import { getConfigsManager } from '@rightpoint/core/next-contentful/mappers/registry/all-configs'
import { NextApiHandler } from 'next'
import {
    __privateContentful,
    type ContentfulEnvironments,
} from '@rightpoint/private-variables'
import { pageConfigNotFound } from '@rightpoint/core/next-contentful/configs/fallbacks/page-config-not-found'
import { fetchEntryById } from '@rightpoint/contentful'

/**
 * Next.js method to invalidate ISR cache and revalidate target page.
 * https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration#using-on-demand-revalidation
 *
 * We handle all CMS updates through this API route, so that we do not have to maintain a list of webhook entry types in Contentful.
 */
const enablePreview: NextApiHandler = async (req, res) => {
    // Check for secret to confirm this is a valid request
    if (
        req.headers['isrtoken'] !==
        process.env.NEXT_PRIVATE_ISR_REVALIDATE_TOKEN
    ) {
        return res.status(401).json({ message: 'Invalid token' })
    }

    /**
     * The contentful webhook payload includes all locales, and
     * our page mappers do not know how to resolve.
     *
     * Use the same API as the rest of the codebase so that payloads are consistent.
     */
    const entry = await fetchEntryById(req.body.entryId)

    if (!entry) {
        return res.status(401).json({
            message: 'Entry not found',
        })
    }

    const manager = getConfigsManager()
    const mapper = manager.getPageMapper(entry)

    // this is a way to detect if there is no page handler found for an entry.
    const pageMapperNotFound = mapper.config === pageConfigNotFound

    pageMapperNotFound &&
        console.log(
            'Page mapper not found for entry',
            entry?.sys?.id,
            entry?.sys?.contentType?.sys?.id
        )

    if (pageMapperNotFound) {
        return res.json({
            revalidated: false,
            message: 'Page mapper not found',
        })
    }

    const url = await mapper.getUrl()

    try {
        // this should be the actual path not a rewritten path
        // e.g. for "/blog/[slug]" this should be "/blog/post-1"
        await res.revalidate(url)
        return res.json({ revalidated: true, URL: url })
    } catch (err) {
        // If there was an error, Next.js will continue
        // to show the last successfully generated page
        return res.status(500).send('Error revalidating')
    }
}

export default enablePreview
