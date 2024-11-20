const SECOND = 1
const MINUTE = 60
const HOUR = MINUTE * 60
const DAY = HOUR * 24

/**
 * Revalidate time for all pages;
 *
 * Contentful publish/deletes should trigger a webhook on-demand revalidation.
 */
export const revalidate = {
    /**
     * Default revalidate time;
     */
    default: MINUTE * 5, // this is kept low for now to ensure pages are continually updated from CMS

    /**
     * Revalidate time for 404 pages;
     * - New content
     *
     * A 404 page requires hits to the application, so it's useful to cache the
     * 404 results for a moment against bots for example.
     *
     * Also note _without_ a revalidate; any page that 404s will never again ISR in the future until the next build.
     */
    notFound: MINUTE * 5,
}
