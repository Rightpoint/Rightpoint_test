const {
    getContentfulRedirects,
} = require('./next-config/get-contentful-redirects.js')
const { staticRedirects } = require('./next-config/static-redirects.js')
const {
    getContentfulRewrites,
} = require('./next-config/get-contentful-rewrites.js')
const { staticRewrites } = require('./next-config/static-rewrites.js')

const { sitecoreRedirects } = require('./next-config/sitecore-redirects.js')

const packagesToTranspile = [
    '@rightpoint/data-generators',
    '@rightpoint/core',
    '@rightpoint/contentful',
    '@rightpoint/contentful',
    '@rightpoint/private-variables',
    '@rightpoint/app-insights',
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
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3000],
        formats: ['image/avif', 'image/webp'],
    },
    async redirects() {
        const redirectsFromCms = await getContentfulRedirects()
        console.log(
            'Contentful environment: ',
            process.env.NEXT_PUBLIC_CONTENTFUL_ENVIRONMENT
        )
        console.log(`redirects: imported ${redirectsFromCms.length} from CMS`)
        return [
            ...redirectsFromCms,
            ...staticRedirects,
            ...sitecoreRedirects,
        ].splice(0, 1024)
    },
    /**
     * Rewrite proxy
     * https://nextjs.org/docs/api-reference/next.config.js/rewrites
     */
    async rewrites() {
        const rewritesFromCms = await getContentfulRewrites()
        console.log(`rewrites: imported ${rewritesFromCms.length} from CMS`)
        return [...rewritesFromCms, ...staticRewrites]
    },
}

const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
})

// const withPlugins = require('next-compose-plugins')
// module.exports = withPlugins([[withBundleAnalyzer]], config)

module.exports = withBundleAnalyzer(config)
