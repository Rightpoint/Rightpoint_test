/**
 * Static Next.js redirects
 */
const isOldSiteRedirectPermanent = false // do not make permanent until certain. Permanents are cached heavily across network layers and devices.

const staticRedirects = [
    /**
     * Work detail root.
     * Nothing links to this, but existing site SEO likely expects this to list all work.
     */
    {
        source: '/work(/?)',
        destination: '/work/browse/all',
        permanent: false,
    },

    /**
     * Thought redirects.
     * https://www.rightpoint.com/thought/articles/2022/09/19/adobe-commerce-and-adobe-experience-manager-more-than-the-sum-of-their-parts
     * To: /thought/article/<slug>
     */
    {
        source: '/thought/articles/(\\d{1,})/(\\d{1,})/(\\d{1,})/:slug',
        destination: '/thought/article/:slug',
        permanent: isOldSiteRedirectPermanent,
    },

    /**
     * Thought Author redirects.
     *
     * https://www.rightpoint.com/thought/author-directory/john-jenson
     * https://www.rightpoint.com/thought/author-directory/
     * to: /thought/
     */
    {
        source: '/thought/author-directory/:slug?',
        destination: '/thought',
        permanent: isOldSiteRedirectPermanent,
    },

    /**
     * Search redirects.
     *
     * https://www.rightpoint.com/search?q=*
     * to: /contact
     */
    {
        source: '/search/:query?',
        destination: '/contact',
        permanent: isOldSiteRedirectPermanent,
    },

    /**
     * About/ redirects.
     *
     * https://www.rightpoint.com/about/*
     * to: /contact
     */
    {
        source: '/about/employees/:slug?',
        destination: '/inside-rightpoint',
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
        source: '/company/leadership/:person?',
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
     * to: /partner-<slug>x
     */
    {
        source: '/solutions/partners/:slug',
        destination: '/partner-:slug',
        permanent: isOldSiteRedirectPermanent,
    },

    /**
     * Events
     *
     * https://www.rightpoint.com/solutions/events|news/2022/09/19/adobe-commerce-and-adobe-experience-manager-more-than-the-sum-of-the-parts
     * to: /news|category
     *
     * TODO: what if there's a match? We are launching with a few selects.
     * CMS controlled redirect, or, dynamic redirect fallback?
     * /events|news/ > /news|events/<slug> blocking redirect to /news|events
     */
    {
        source: '/:category(events|news)/(\\d{4})/(\\d{2})/:slug*',
        destination: '/:category/',
        permanent: isOldSiteRedirectPermanent,
    },
]

exports.staticRedirects = staticRedirects
