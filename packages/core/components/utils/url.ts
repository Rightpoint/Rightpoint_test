import { take } from 'lodash'

export const isSameBasePath = (path1: string, path2: string) => {
    const linkPath = path1
        .split('#')[0]
        .split('?')[0]
        .replace(/\/$/, '')
        .replace('https://', '')
        .replace('http://', '')
    const linkPathParts = linkPath.split('/')

    const activePathParts = (path2 || '').split('/')

    return (
        take(activePathParts, linkPathParts.length).join('/') ===
        linkPathParts.join('/')
    )
}
