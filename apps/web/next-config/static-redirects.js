/**
 * Static Next.js redirects
 */
const isOldSiteRedirectPermanent = false // do not make permanent until certain. Permanents are cached heavily across network layers and devices.

const staticRedirects = [
    /**
     * Thought redirects.
     * https://www.rightpoint.com/thought/articles/2022/09/19/adobe-commerce-and-adobe-experience-manager-more-than-the-sum-of-their-parts
     * To: /thought/detail/<slug>
     */
    {
        source: '/thought/articles/(\\d{1,})/(\\d{1,})/(\\d{1,})/:slug',
        destination: '/thought/detail/:slug',
        permanent: isOldSiteRedirectPermanent,
    },

    /**
     * Contact city redirects.
     *
     * https://www.rightpoint.com/company/contact/atlanta
     * to: /contact
     */
    {
        source: '/company/contact/:city?',
        destination: '/contact',
        permanent: isOldSiteRedirectPermanent,
    },

    /**
     * Company Leadership
     *
     * https://www.rightpoint.com/company/leadership
     * to: /inside-rightpoint
     */
    {
        source: '/company/leadership/:person',
        destination: '/inside-rightpoint',
        permanent: isOldSiteRedirectPermanent,
    },

    /**
     * Practice Leads
     *
     * https://www.rightpoint.com/company/practice-leads
     * to: /inside-rightpoint
     */
    {
        source: '/company/practice-leads',
        destination: '/inside-rightpoint',
        permanent: isOldSiteRedirectPermanent,
    },

    /**
     * Solution Partners
     *
     * https://www.rightpoint.com/solutions/partners/sitecore
     * to: /partner-<slug>
     */
    {
        source: '/solutions/partners/:slug',
        destination: '/partner-:slug',
        permanent: isOldSiteRedirectPermanent,
    },
]

exports.staticRedirects = staticRedirects
