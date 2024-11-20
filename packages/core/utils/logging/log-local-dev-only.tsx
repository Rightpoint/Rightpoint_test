import { isLocalDevelopmentEnvironment } from '../urls/is-local-development-environment'

type Options = {
    namespace?: string
    logLevel?: 'debug' | 'log' | 'info' | 'warn' | 'error'
    enabled?: boolean
}

/**
 * Log in dev only
 */
export const logLocalDevOnly = (
    { namespace = '?', logLevel = 'log', enabled = true }: Options,
    ...args
) => {
    if (!enabled) {
        return
    }
    // TODO: querystring based disabling of local logging
    if (isLocalDevelopmentEnvironment()) {
        console[logLevel](`[LOCAL-DEV][${namespace}]: `, ...args)
    }
}

type BoundLocalDevLogFn = (...args) => void
/**
 * Create a reusable local dev only function
 */
export const createLogLocalDevOnlyFn = (
    options: Options
): BoundLocalDevLogFn => {
    return logLocalDevOnly.bind(logLocalDevOnly, options)
}
