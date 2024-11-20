/**
 * https://github.com/iamvishnusankar/next-sitemap#readme
 */

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
    ? `https://${process.env.NEXT_PUBLIC_SITE_URL}` // our custom env var
    : `https://${process.env.NEXT_PUBLIC_VERCEL_URL}` || 'http://localhost:3000'

console.log('Sitemap URL Resolved: ', siteUrl)

/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl,
    sitemapBaseFileName: 'next-sitemap.xml',
    exclude: [
        '*', // exclude all pages.
    ],

    changefreq: null, // default: daily
    priority: null, // default: .7

    generateRobotsTxt: true,
    generateIndexSitemap: false,

    // robots.txt will not be useful after protecting all builds in Vercel
    robotsTxtOptions: {
        policies: [{ userAgent: '*', disallow: '/' }],
    },

    // transform: async (config, path) => {
    //     return {
    //       loc: path, // => this will be exported as http(s)://<config.siteUrl>/<path>
    //       alternateRefs: config.alternateRefs ?? [],
    //     }
    //   },

    // ...other options
}
