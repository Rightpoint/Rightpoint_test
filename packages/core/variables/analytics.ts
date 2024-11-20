import { useEffect } from 'react'
import { pardotUrls } from './pardot-urls'

const useDataLayerOnMount = ({ payload }) => {
    useEffect(() => {
        window.dataLayer = window.dataLayer || []
        window.dataLayer.push(payload)
    }, [])
}

export const analytics = {
    /**
     * Given a pardot URL, return the analytics name for that URL.
     *
     * This is necessary to consistently track GTM analytics
     * until analytics is fully architected / implemented into the system.
     */
    getAnalyticsNameFromPardotUrl: (url: string) => {
        if (url === pardotUrls.CONTACT_FORM) {
            return 'pardot-contact-us-modal'
        }
        return url
    },
    fireDataLayer: (payload) => {
        window.dataLayer = window.dataLayer || []
        window.dataLayer.push(payload)
    },
    useDataLayerOnMount,
}

declare const window: Window & { dataLayer: Record<string, unknown>[] }
