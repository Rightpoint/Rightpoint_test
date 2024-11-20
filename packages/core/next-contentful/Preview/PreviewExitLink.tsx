import { useClientSafePreviewData } from './use-client-safe-preview-data'
import { PreviewExitLinkStyles as s } from './PreviewExitLink.styles'
import { CgCloseR } from 'react-icons/cg'
import { PreviewWrapperStyles } from './PreviewWrapper.styles'

export const PreviewExitLink = () => {
    const previewData = useClientSafePreviewData()

    if (previewData.__isPreview) {
        return (
            <s.PreviewExitLink
                href="/api/preview/exit"
                title="Exit preview mode"
            >
                <PreviewWrapperStyles.Icon>
                    <CgCloseR size={16} />
                </PreviewWrapperStyles.Icon>
                <s.Label>Exit Preview: </s.Label>
                {previewData.__contentfulEnvironmentOverride}
            </s.PreviewExitLink>
        )
    }
    return null
}
