import { isLocalDevelopmentEnvironment } from './is-local-development-environment'

/**
 *
 * Get domain name with protocol: http://localhost:XXXX or https://www.rightpoint.com
 *
 * If local:
 *  return local dev port or local production port
 * If not local:
 *   if NEXT_PUBLIC_SITE_URL env var manually set: return that
 *   else return Vercel automatic URL NEXT_PUBLIC_VERCEL_URL (which may be the *.vercel.app URL e.g. preview mode)
 *   else return hard coded www.rightpoint.com // NOTE: this scenario may never happen, unless we get off Vercel.
 */
export const getAbsoluteDomainUrl = () => {
    if (isLocalDevelopmentEnvironment()) {
        /**
         * If local development, return local dev port or local production port
         */
        if (process.env.NODE_ENV === 'development') {
            return 'http://localhost:8000'
        } else if (process.env.NODE_ENV === 'production') {
            return 'http://localhost:3000'
        }
    } else {
        const hostname = process.env.NEXT_PUBLIC_SITE_URL
        if (hostname) {
            return `https://${hostname}`
        } else if (process.env.NEXT_PUBLIC_VERCEL_URL) {
            return `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
        }
        return `https://www.rightpoint.com`
    }
}
