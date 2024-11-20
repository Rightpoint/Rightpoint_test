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
    exclude: [
        '*/thank-you', // disallow the landing thank-you pages
    ],
    generateRobotsTxt: true,
    generateIndexSitemap: false,
    // robotsTxtOptions: {
    //     policies: [{ userAgent: '*', disallow: '*' }],
    // },
    // ...other options
}
