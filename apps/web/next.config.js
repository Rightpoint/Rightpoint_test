const {
    getContentfulRedirects,
} = require('./next-config/get-contentful-redirects')
const { staticRedirects } = require('./next-config/static-redirects')

// /* eslint-disable @typescript-eslint/no-var-requires */
const packagesToTranspile = [
    '@rightpoint/data-generators',
    '@rightpoint/core',
    '@rightpoint/contentful',
    '@rightpoint/private-variables',
    '@rightpoint/app-insights',
    // DO NOT REMOVE: GENERATOR_PACKAGES_ENTRYPOINT
]

const config = {
    transpilePackages: packagesToTranspile,
    reactStrictMode: true,
    images: {
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    },
    webpack: (config, { dev }) => {
        config.module.rules = [
            ...config.module.rules,
            // force local packages to not have side effects
            {
                test: /packages\/.*/,
                sideEffects: false,
            },
        ]
        return config
    },
    // https://nextjs.org/docs/advanced-features/compiler
    compiler: {
        // ssr and displayName are configured by default
        styledComponents: {
            // Enabled by default in development, disabled in production to reduce file size,
            // setting this will override the default for all environments.
            // displayName: true,
            // Enabled by default.
            ssr: true,
        },

        // removeConsole: {
        //     exclude: ['error'],
        // },
    },
    images: {
        domains: ['images.ctfassets.net', 'source.unsplash.com'],
    },
    async redirects() {
        const redirectsFromCms = await getContentfulRedirects()
        return [...staticRedirects, ...redirectsFromCms].splice(0, 900)
    },
    rewrites() {
        return []
    },
}

// const withBundleAnalyzer = require('@next/bundle-analyzer')({
//     enabled: process.env.ANALYZE === 'true',
// })

// const withPlugins = require('next-compose-plugins')
// module.exports = withPlugins([[withBundleAnalyzer]], config)

module.exports = config
