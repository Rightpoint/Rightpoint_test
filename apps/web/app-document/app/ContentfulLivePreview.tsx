import { GlobalContext } from '@rightpoint/core/context'
import { useCallback, useContext, useEffect, useMemo } from 'react'
import { ContentfulLivePreview } from '@contentful/live-preview'

/**
 * If in preview mode, enable the contentful library.
 *
 * NOTE: Lazily loading the library caused unexpected issues. -04/2023
 */
export const ContentfulLivePreviewInPreviewMode = () => {
    const { __isPreview } = useContext(GlobalContext)
    useEffect(() => {
        if (__isPreview) {
            ContentfulLivePreview.init()
        }
    }, [__isPreview])
    return null
}
