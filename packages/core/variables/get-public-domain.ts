import { logDevelopmentOnly } from '../utils'

/**
 * Get domain name with protocol: https://www.rightpoint.com
 * Should be set via ENV var.
 * If not set, return Vercel URL (which may be the *.vercel.app URL e.g. preview mode)
 * If local, return local http port
 */
export const getPublicDomainWithProtocol = () => {
    /**
     * Checking if local development requires:
     * - Checking for VERCEL_ENV (server side, e.g. yarn dev or a build)
     * - Otherwise, on client side, localhost
     */
    const IS_LOCAL_DEVELOPMENT =
        process.env.VERCEL_ENV === 'development' ||
        window?.location?.hostname === 'localhost'

    if (!IS_LOCAL_DEVELOPMENT) {
        const hostname = process.env.NEXT_PUBLIC_SITE_URL
        if (hostname) {
            return `https://${hostname}`
        } else if (process.env.NEXT_PUBLIC_VERCEL_URL) {
            return `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
        }
        return `https://www.rightpoint.com`
    } else {
        /**
         * If production/preview, return local http port
         */
        if (process.env.NODE_ENV === 'development') {
            // don't run on local, is costly
            return 'http://localhost:8000'
        } else if (process.env.NODE_ENV === 'production') {
            /**
             * If local production, return local production port
             */
            return 'http://localhost:3000'
        }
    }
}
