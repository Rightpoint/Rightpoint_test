import { Entry } from 'contentful'
import type { Config } from './config.types'

/**
 * Make a mapper configuration object for a content type.
 */
export const makeConfig = <E extends Entry<any>, P extends Record<any, any>>(
    arg: Config<E, P>
) => {
    return arg
}
