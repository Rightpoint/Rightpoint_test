import type { ComponentMapperConfig, Config } from '../../configs/config.types'
import { getAllComponentMappers } from '../registry/all-components'

let contentTypeToComponentMap: Config<any, any>[]

/**
 * Get content type ids to components.
 *
 * - This must be done in a function to avoid circular build issues
 * - Unfortunately it also means we can't tree shake the mapper data extracted (but even all mappers added results in about 7kb gzipped)
 */
export const getContentTypeToComponentMap = () => {
    if (!contentTypeToComponentMap) {
        const allComponentMappers = getAllComponentMappers()
        contentTypeToComponentMap = allComponentMappers.reduce(
            (acc, mapper) => {
                acc[mapper.contentTypeId] = mapper.component
                return acc
            },
            {} as any
        )
    }
    return contentTypeToComponentMap
}
