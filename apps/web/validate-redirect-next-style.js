/**
 * An attempt to reverse engineer/borrow the validation function in Next.js redirects paths
 * so that we can validate the redirects from the CMS and allow globs.
 * For now, we have disabled globs / patterns in CMS via naive matching (not allowing * or :)
 */
function validateRedirect(redirectIn) {
    const redirect = { ...redirectIn, permanent: Boolean(redirectIn.permanent) }

    try {
        // if this fails, it throws an exist code. you cannot stop an exit.
        checkCustomRoutes([redirect], 'redirect')
        return redirect
    } catch (ex) {
        console.log('error', ex)
    }
}
const namedGroupsRegex = /\(\?<([a-zA-Z][a-zA-Z0-9]*)>/g
export function normalizeRouteRegex(regex) {
    // clean up un-necessary escaping from regex.source which turns / into \\/
    return regex.replace(/\\\//g, '/')
}
function checkRedirect(route) {
    const invalidParts = []
    let hadInvalidStatus = false
    if (route.statusCode && !allowedStatusCodes.has(route.statusCode)) {
        hadInvalidStatus = true
        invalidParts.push(`\`statusCode\` is not undefined or valid statusCode`)
    }
    if (typeof route.permanent !== 'boolean' && !route.statusCode) {
        invalidParts.push(`\`permanent\` is not set to \`true\` or \`false\``)
    }
    return {
        invalidParts,
        hadInvalidStatus,
    }
}

const validateRedirect = (redirect) => {
    const allowedKeys = new Set(['source', 'locale', 'has', 'missing'])
    allowedKeys.add('basePath')
    allowedKeys.add('statusCode')
    allowedKeys.add('permanent')
    allowedKeys.add('destination')
    const result = checkRedirect(route)
    hadInvalidStatus = hadInvalidStatus || result.hadInvalidStatus
    invalidParts.push(...result.invalidParts)
}

/**
 * Only valid regex allowed, but also non regex
 * Also blobs allowed.
 *
 * Maybe look at next.js sourfe
 */
function isValidRegex(input) {
    try {
        new RegExp(input)
        return true
    } catch (e) {
        return false
    }
}
