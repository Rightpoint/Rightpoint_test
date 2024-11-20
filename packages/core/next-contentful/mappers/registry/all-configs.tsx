import { personPageMapperConfig } from '@rightpoint/core/components'
import { officePageMapperConfig } from '@rightpoint/core/pages'
import { getAllComponentMappers } from './all-components'
import { getAllPageMappers } from './all-pages'

import { ConfigsManager } from './manager'

const getManager = () => {
    const pages = [
        ...getAllPageMappers(),

        /**
         * Special cases: these pages don't exist, but we still want to use them for entry->card mapping.
         */
        personPageMapperConfig,
        officePageMapperConfig,
    ]
    const components = [...getAllComponentMappers()]
    const manager = ConfigsManager.init([...pages, ...components])
    return manager
}

const cache = {
    manager: null,
}

export const getConfigsManager = (): ReturnType<typeof getManager> => {
    if (!cache.manager) {
        /**
         * This will currently log from:
         * - imports to serverless functions
         */
        cache.manager = getManager()
    }
    return cache.manager
}

export type ConfigManagerType = ReturnType<typeof getConfigsManager>
