import Head from 'next/head'
import { FC } from 'react'

interface OpenGraphProps {
    title?: string
    description?: string
    image?: any
}
const OpenGraph: FC<OpenGraphProps> = ({ title, description, image }) => {
    return (
        <>
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            {/* <meta property="og:image" content={image} /> */}
        </>
    )
}

interface RobotsProps {
    noIndex?: boolean
    noFollow?: boolean
}
const Robots: FC<RobotsProps> = ({ noIndex, noFollow }) => {
    const robotsFields = [noIndex && 'noindex', noFollow && 'nofollow'].filter(
        Boolean
    )
    // https://developers.google.com/search/docs/advanced/crawling/special-tags
    return (
        robotsFields.length > 0 && (
            <meta name="robots" content={robotsFields.join(',')} />
        )
    )
}

export interface SeoProps {
    title?: string

    addTitleSuffix?: boolean

    description?: string
    keywords?: string

    noIndex?: boolean
    noFollow?: boolean
    openGraphImage?: any
}
export const Seo: FC<Partial<SeoProps>> = ({
    title,
    addTitleSuffix = true,
    description,
    keywords,

    noIndex,
    noFollow,
}) => {
    // pages can provide seo images by default, but can _always_ be overridden by the SEO contentful entry.

    return (
        <Head>
            {/* do not enter multiple lines in <title> -- it kust be _one_ child or will cause SSR issues and <!-- --> in initial render */}
            <title>{`${title}${addTitleSuffix ? ' | Rightpoint' : ''}`}</title>

            {/* <Robots noIndex={noIndex} noFollow={noFollow} />

            {keywords && <meta name="keywords" content={keywords} />}
            {description && <meta name="description" content={description} />}
            <OpenGraph title={title} description={description} /> */}
        </Head>
    )
}
