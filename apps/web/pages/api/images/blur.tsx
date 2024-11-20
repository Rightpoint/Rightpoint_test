import { NextApiHandler } from 'next'
import { getPlaiceholder } from 'plaiceholder'
import Cors from 'cors'

const cors = Cors({
    methods: ['GET', 'HEAD'],
})

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(req, res, fn) {
    return new Promise((resolve, reject) => {
        fn(req, res, (result) => {
            if (result instanceof Error) {
                return reject(result)
            }
            return resolve(result)
        })
    })
}

type QueryParams = {
    imageUrl: string
}

const getBase64: NextApiHandler = async (req, res) => {
    await runMiddleware(req, res, cors)
    // https://vercel.com/docs/concepts/functions/serverless-functions/edge-caching#recommended-cache-control
    const MINUTE = 60
    const MAX_AGE = MINUTE * 60 * 24 // use cached version for 24 hours
    res.setHeader('Cache-Control', `max-age=0, s-maxage=${MAX_AGE}`)

    const query = req.query as QueryParams
    const imageUrl = query.imageUrl

    /**
     * Contentful returns protocol relative paths
     */
    const absoluteUrl = imageUrl.startsWith('//')
        ? imageUrl.replace('//', 'https://')
        : imageUrl

    const url = new URL(absoluteUrl)

    const CONTENTFUL_PARAMS = {
        IMAGE_FORMAT: 'fm',
        WIDTH: 'w',
        QUALITY: 'q',
    }

    /**
     * Get a small version of the image to base the blur on to reduce
     * network bandwidth, function execution time, memory usage, etc.
     */
    url.searchParams.set(CONTENTFUL_PARAMS.IMAGE_FORMAT, 'jpg')
    url.searchParams.set(CONTENTFUL_PARAMS.WIDTH, '500')
    url.searchParams.set(CONTENTFUL_PARAMS.QUALITY, '50')

    const { css } = await getPlaiceholder(url.href)
    return res.status(200).json({
        css, // we use the CSS linear gradient technique
        // base64,
        // img,
    })
}

export default getBase64
