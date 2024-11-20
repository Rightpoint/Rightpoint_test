/**
 * Get public domain name: https://www.rightpoint.com or via ENV
 */
export const getPublicDomainWithProtocol = () => {
    const hostname = process.env.NEXT_PUBLIC_SITE_URL
    if (hostname) {
        return `https://${hostname}`
    }
    return 'https://www.rightpoint.com'
}
