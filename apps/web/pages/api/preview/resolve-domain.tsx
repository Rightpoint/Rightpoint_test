import { NextApiHandler } from 'next'
import {
    __privateContentful,
    type ContentfulEnvironments,
} from '@rightpoint/private-variables'

type ExpectedQueryParams = {
    s: string
    env: ContentfulEnvironments
    id: string
}

/**
 * Optional domain resolver for preview mode, so that
 * we don't need to manage a preview URL for every environment.
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

    if (!query.id) {
        return res.status(401).json({ message: 'Invalid id' })
    }

    const domain = __privateContentful.environments[query.env]?.previewDomain
    if (!domain) {
        return res.status(401).json({ message: 'Invalid environment' })
    }

    const params = new URLSearchParams({
        s: query.s,
        id: query.id,
        env: query.env,
    }).toString()

    const enableApiPath = '/api/preview/enable'
    return res.redirect([domain, enableApiPath, '?', params].join(''))
}

export default enablePreview
