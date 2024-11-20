import { fetchEntryById } from '@rightpoint/contentful'
import { getConfigsManager } from '@rightpoint/core/next-contentful/mappers/registry/all-configs'
import { NextApiHandler } from 'next'
import {
    __privateContentful,
    type ContentfulEnvironments,
} from '@rightpoint/private-variables'

type ExpectedQueryParams = {
    s: string
    id: string
    env?: ContentfulEnvironments
}

/**
 * Given a secret and entry ID,
 * enable preview mode and redirect to the URL.
 */
const enablePreview: NextApiHandler = async (req, res) => {
    // https://nextjs.org/docs/advanced-features/preview-mode#securely-accessing-it-from-your-headless-cms
    const query = req.query as ExpectedQueryParams
    if (query.s !== process.env.NEXT_PRIVATE_CONTENTFUL_PREVIEW_KEY) {
        console.log(
            'Invalid token',
            query.s,
            process.env.NEXT_PRIVATE_SECRET_PREVIEW_KEY
        )
        return res.status(401).json({ message: 'Invalid token' })
    }

    const isValidEnvironment = query.env in __privateContentful.environments
    const environment = query.env

    const entry = await fetchEntryById(
        query.id,
        {
            preview: true,
        },
        // override contentful environment if specified.
        // the environment param is used to preview different environments from the same space, provided
        // the environment loading the preview has the keys to do so.
        isValidEnvironment
            ? {
                  environment,
              }
            : null
    )

    if (!entry) {
        console.log(
            'Preview mode enable: failed to locate entry with ID',
            query.id
        )
        return res.status(401).json({
            message: 'Entry not found',
        })
    }

    // valid secret + entry means enable preview mode.

    // this is accessible in request context
    const previewData = {
        contentful: {
            environment,
        },
    }

    // Enable Preview Mode by setting the cookies
    res.setPreviewData(previewData, {
        maxAge: 60 * 60, // The preview mode cookies expire in 1 hour
    })

    const manager = getConfigsManager()
    const mapper = manager.getPageMapper(entry)
    const url = await mapper.getUrl()
    // Redirect to the path from the fetched post
    // We don't redirect to req.query.slug as that might lead to open redirect vulnerabilities
    return res.redirect(url)
}

export default enablePreview
