import { FC } from 'react'

export interface OpenGraphProps {
    title?: string
    description?: string
    image?: any
}
export const OpenGraph: FC<OpenGraphProps> = ({
    title,
    description,
    image,
}) => {
    return (
        <>
            {title && <meta property="og:title" content={title} />}
            {description && (
                <meta property="og:description" content={description} />
            )}
            {image && <meta property="og:image" content={image} />}

            {/* current site uses: twitter:image, same content */}
            {/* current site uses: twitter:title, same content */}
            {/* current site uses: twitter:description, same content */}
        </>
    )
}
