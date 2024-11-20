import { take } from 'lodash'

/**
 *
 * Determine if current URL matches the given href, given options.
 */
export const isActiveUrl = (
    href: string,
    asPath: string,
    options?: {
        /**
         * Exact match URLs.
         *
         * Use case:
         * - /thought/ should not match /thought/category since /thought/ is a proxy for /thought/all
         */
        exactMatch?: boolean
        /**
         * Directory depth to match.
         *
         * Example:
         * - 1 matches /a/* (anything under first directory)
         * - 2 matches /a/b/* (anything under second directory)
         *
         * Use case:
         * - Main navbar /work/browse/by-solutions/ should still match anything under /work/
         */
        matchDepth?: number
    }
) => {
    const linkPath = href
        .split('#')[0]
        .split('?')[0]
        .replace(/\/$/, '') // trailing slash
        .replace('https://', '')
        .replace('http://', '')

    const linkPathParts = linkPath.split('/')

    const getPathPartsToMatch = () => {
        const asPathParts = (asPath || '').split('/')
        if (options?.exactMatch) {
            return asPathParts
        }

        if (options?.matchDepth) {
            return take(asPathParts, options.matchDepth + 1) // +1 to account for leading slash
        }

        /**
         * By default, match the link path to the asPath up to the length of the link path
         * */
        return take(asPathParts, linkPathParts.length)
    }

    const getLinkPathPartsToMatch = () => {
        /**
         * By default, match the link path to the asPath up to the length of the link path
         * */
        if (options?.matchDepth) {
            return take(linkPathParts, options.matchDepth + 1) // +1 to account for leading slash
        }

        return linkPathParts
    }

    const pathToMatch = getPathPartsToMatch().join('/')
    const targetPathToMatch = getLinkPathPartsToMatch().join('/')
    return pathToMatch === targetPathToMatch
}
