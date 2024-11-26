// netlify/functions/next.js

const { createRequestHandler } = require('@netlify/next')

const handler = createRequestHandler({
    dir: './', // The directory where Next.js is built
})

exports.handler = async (event, context) => {
    return handler(event, context)
}
