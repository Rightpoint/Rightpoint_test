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

    const query = req.query as QueryParams
    const imageUrl = query.imageUrl
    const absolute = imageUrl.replace('//', 'https://')
    const { css, img, base64 } = await getPlaiceholder(absolute)
    return res.status(200).json({
        base64,
        css,
        img,
    })
}

export default getBase64
