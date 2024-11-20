import { GlobalContext } from '@rightpoint/core/context'
import { createContext, useContext } from 'react'

/*
 * Use Next preview data (context.previewData) exposed through global context.
 */
export const useClientSafePreviewData = () => {
    const context = useContext(GlobalContext)
    if (context) {
        return {
            __isPreview: context.__isPreview,
            __contentfulEnvironmentOverride:
                context.__contentfulEnvironmentOverride,
        }
    }
    return {}
}
