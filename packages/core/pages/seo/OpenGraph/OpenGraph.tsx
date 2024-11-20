import { FC } from 'react'

export interface OpenGraphProps {
    title?: string
    description?: string
    image?: any
}
export const OpenGraph: FC<OpenGraphProps> = ({
    title,
    description,
    image = '',
}) => {
    const FALLBACK_OG_IMAGE = '/static/media/rightpoint-social.png'
    return (
        <>
            {title && <meta property="og:title" content={title} />}
            {description && (
                <meta property="og:description" content={description} />
            )}
            <meta property="og:image" content={image || FALLBACK_OG_IMAGE} />

            {/* current site uses: twitter:image, same content */}
            {/* current site uses: twitter:title, same content */}
            {/* current site uses: twitter:description, same content */}

            <meta property="twitter:card" content="summary" />
        </>
    )
}
