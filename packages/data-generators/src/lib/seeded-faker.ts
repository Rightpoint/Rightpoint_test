import { isServer, logStackTrace } from '@rightpoint/core/utils'
import faker from 'faker'

/**
 * Consistently import a faker with seed to prevent visual regressions in tests.
 */
export const fakerWithSeed = ((): typeof faker => {
    faker.seed(0)
    if (!isServer) {
        /**
         * Make sure if this accidentally gets imported into the frontend, we notice it.
         * It can't be tree shaken, and it's 500kb.
         *
         * It's okay to see this in builds (server-side rendering phase) but not in browser logs (client-side rendering phase)
         *
         */
        // TODO: is there a way to detect what page was being generated during this log?
        console.error('Faker initialized')
        // logStackTrace()
    }
    return faker
})()

export const getFakerWithSeed = (seed = 0) => {
    faker.seed(seed)
    return faker
}
