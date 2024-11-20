// let loggedOnce = false
/**
 * Check if we're in a local development environment.
 *
 * Used to add verbose logging or detect absolute URLs unique to local development (e.g. local dev vs local prod)
 */
export const isLocalDevelopmentEnvironment = () => {
    // in local development, VERCEL_ENV is a private var that is visible server-side
    if (process.env.VERCEL_ENV === 'development') {
        // !loggedOnce &&
        //     console.log(
        //         'IS LOCAL DEVELOPMENT (Server): Verbose Logging. Why: VERCEL_ENV is development.'
        //     )
        return true
    }

    // otherwise, check if we're in the client and on localhost
    if (
        typeof window !== 'undefined' &&
        window.location?.hostname === 'localhost'
    ) {
        // !loggedOnce &&
        //     console.log(
        //         'IS LOCAL DEVELOPMENT (Client): Verbose Logging. Why: VERCEL_ENV is window exists client side and is localhost.'
        //     )
        return true
    }
    // loggedOnce = true
}
