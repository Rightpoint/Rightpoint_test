import { take } from 'lodash'
import { logDevelopmentOnly } from '@rightpoint/core/utils'

export const isSameBasePath = (
    href: string,
    asPath: string,
    options?: {
        exactMatch?: boolean
    }
) => {
    const linkPath = href
        .split('#')[0]
        .split('?')[0]
        .replace(/\/$/, '')
        .replace('https://', '')
        .replace('http://', '')
    const linkPathParts = linkPath.split('/')
    const asPathParts = (asPath || '').split('/')

    const pathToMatch = (
        options?.exactMatch
            ? asPathParts
            : /**
               * if not exact match, look for overlap at granularity of linkPath
               * for example, if the link path is "/solutions", and the target is "/solutions/foobar"
               * then match only up to "/solutions" to determine if the link is active
               */
              take(asPathParts, linkPathParts.length)
    ).join('/')

    const target = linkPathParts.join('/')

    return pathToMatch === target
}
