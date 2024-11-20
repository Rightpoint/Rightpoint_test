/**
 * Static Next.js rewrites
 */
const staticRewrites = [
    {
        source: '/:path*',
        destination: 'https://www.rightpoint.com/:path*',
    },
]

exports.staticRewrites = staticRewrites
