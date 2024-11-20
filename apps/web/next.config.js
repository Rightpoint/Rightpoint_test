const {
    getContentfulRedirects,
} = require('./next-config/get-contentful-redirects.js')
const { staticRedirects } = require('./next-config/static-redirects.js')
const {
    getContentfulRewrites,
} = require('./next-config/get-contentful-rewrites.js')
const { staticRewrites } = require('./next-config/static-rewrites.js')

const { sitecoreRedirects } = require('./next-config/sitecore-redirects.js')
const SubresourceIntegrityPlugin = require('webpack-subresource-integrity')

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
    /**
     * 60 is default and reliably kills page builds these days (launch + 3 months) even with no major code changes.
     *
     * - Vercel builds are much slower than local and not 100% sure why. Pro tier same as Enterprise.
     * - Network speed unlikely due to local testing but worth reviewing if build times get to 10m+
     * - Disabling the API route used to generate every image every build also may be helpful.
     */
    staticPageGenerationTimeout: 200,
    transpilePackages: packagesToTranspile,
    reactStrictMode: true,
    webpack: (config, { isServer, dev }) => {
        config.module.rules = [
            ...config.module.rules,
            // force local packages to not have side effects
            {
                test: /packages\/.*/,
                sideEffects: false,
            },
        ]

        config.output.crossOriginLoading = 'anonymous'
        config.plugins.push(
            new SubresourceIntegrityPlugin({
                hashFuncNames: ['sha256', 'sha384'],
                enabled: true,
            })
        )

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
    async headers() {
        const IS_DEVELOPMENT = process.env.NODE_ENV === 'development'
        console.log(`headers: is development: ${IS_DEVELOPMENT}`)

        // Define security headers
        const securityHeaders = [
            {
                key: 'Strict-Transport-Security',
                value: 'max-age=63072000; includeSubDomains; preload',
            },
            {
                key: 'Content-Security-Policy',
                value:
                    process.env.NODE_ENV === 'development'
                        ? "default-src 'self'; \
                        script-src 'self' 'unsafe-eval' 'unsafe-inline'  http: https: https://cdn.cookielaw.org https://va.vercel-scripts.com https://www.googletagmanager.com https://geolocation.onetrust.com https://td.doubleclick.net https://www.google-analytics.com https://j.6sc.co https://lltrck.com https://snap.licdn.com https://p.teads.tv https://s.yimg.com https://googleads.g.doubleclick.net http://www.google-analytics.com/ga.js https://j.6sc.co/6si.min.js; \
                        style-src 'self' 'unsafe-inline' https://vercel.live/fonts; \
                        img-src 'self' data: http: https:; \
                        font-src 'self' 'unsafe-inline' https://cdn.cookielaw.org data:; \
                        connect-src 'self' http: https: https://cdn.cookielaw.org https://va.vercel-scripts.com https://www.googletagmanager.com https://geolocation.onetrust.com https://td.doubleclick.net https://www.google-analytics.com https://t.teads.tv https://cm.teads.tv https://px.ads.linkedin.com https://s.yimg.com; \
                        frame-src http: https: https://td.doubleclick.net https://fledge.teads.tv; \
                        object-src 'none';\
                        frame-ancestors 'none';"
                        : "default-src 'self'; \
                        script-src 'self' 'unsafe-inline' http: https: https://cdn.cookielaw.org https://va.vercel-scripts.com https://www.googletagmanager.com https://geolocation.onetrust.com https://td.doubleclick.net https://www.google-analytics.com https://j.6sc.co https://lltrck.com https://snap.licdn.com https://p.teads.tv https://s.yimg.com https://googleads.g.doubleclick.net http://www.google-analytics.com/ga.js https://j.6sc.co/6si.min.js; \
                        style-src 'self' 'unsafe-inline' https://vercel.live/fonts; \
                        img-src 'self' data: http: https:; \
                        font-src 'self' 'unsafe-inline' https://cdn.cookielaw.org data:; \
                        connect-src 'self' http: https: https://cdn.cookielaw.org https://va.vercel-scripts.com https://www.googletagmanager.com https://geolocation.onetrust.com https://td.doubleclick.net https://www.google-analytics.com https://t.teads.tv https://cm.teads.tv https://px.ads.linkedin.com https://s.yimg.com; \
                        frame-src http: https: https://td.doubleclick.net https://fledge.teads.tv; \
                        object-src 'none';\
                        frame-ancestors 'none';",
            },
            {
                key: 'X-Content-Type-Options',
                value: 'nosniff',
            },
            {
                key: 'X-Frame-Options',
                value: 'SAMEORIGIN',
            },
            {
                key: 'X-XSS-Protection',
                value: '1; mode=block',
            },
            {
                key: 'Referrer-Policy',
                value: 'no-referrer',
            },
        ]

        return [
            {
                source: '/(.*)', // Apply the headers to all routes
                headers: securityHeaders,
            },
        ]
    },
}

const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
})

// const withPlugins = require('next-compose-plugins')
// module.exports = withPlugins([[withBundleAnalyzer]], config)

module.exports = withBundleAnalyzer(config)
