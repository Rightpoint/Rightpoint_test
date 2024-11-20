/**
 * Contentful returns protocol relative URLs which do not resolve outside the browser in Next.js
 * Convert to https:// if string contains relative protocol
 */
export const protocolRelativeToAbsolute = (url: string): string => {
    if (url.startsWith('//')) {
        return `https:${url}`
    }
    return url
}
