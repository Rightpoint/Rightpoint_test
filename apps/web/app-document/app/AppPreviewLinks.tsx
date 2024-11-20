import { PreviewExitLink } from '@rightpoint/core/next-contentful/Preview/PreviewExitLink'
import { PreviewContentfulLink } from '@rightpoint/core/next-contentful/Preview/PreviewWrapper'
import { useClientSafePreviewData } from '@rightpoint/core/next-contentful/Preview/use-client-safe-preview-data'
import styles from './AppPreviewLinks.module.css'

export const AppPreviewLinks = ({ pageProps }) => {
    const previewData = useClientSafePreviewData()
    if (!previewData.__isPreview) {
        return null
    }
    return (
        <div className={styles.block}>
            <div className={styles.item}>
                <PreviewContentfulLink
                    mapperProps={pageProps.mapperProps}
                    prefix={'Edit Page: '}
                    title={`Open ${pageProps.__entryName} in Contentful Web App`}
                />
            </div>
            <div className={styles.item}>
                <PreviewContentfulLink
                    mapperProps={pageProps.mapperProps}
                    prefix={'Edit in Compose: '}
                    useComposeUrl={true}
                    title={`Open ${pageProps.__entryName} in Contentful Compose`}
                />
            </div>
            <div className={styles.item}>
                <PreviewExitLink />
            </div>
        </div>
    )
}
