// /* eslint-disable @typescript-eslint/no-var-requires */
const packagesToTranspile = [
    '@rightpoint/data-generators',
    '@rightpoint/core',
    '@rightpoint/contentful',
    '@rightpoint/private-variables',
    // direct dependencies of web app
    // DO NOT REMOVE: GENERATOR_PACKAGES_ENTRYPOINT
]

const config = {
    transpilePackages: packagesToTranspile,
    reactStrictMode: true,
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
        return [
            {
                source: '/thought/articles/(\\d{1,})/(\\d{1,})/(\\d{1,})/:slug',
                destination: '/thought-detail/:slug', // Matched parameters can be used in the destination
                permanent: false,
            },
        ]
    },
}

// const withBundleAnalyzer = require('@next/bundle-analyzer')({
//     enabled: process.env.ANALYZE === 'true',
// })

// const withPlugins = require('next-compose-plugins')
// module.exports = withPlugins([[withBundleAnalyzer]], config)

module.exports = config
