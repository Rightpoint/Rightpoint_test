import Head from 'next/head'
import { FC } from 'react'
import { getAbsoluteDomainUrl } from '@rightpoint/core/utils'
import { OpenGraph, OpenGraphProps } from '../OpenGraph/OpenGraph'

interface RobotsProps {
    noIndex?: boolean
    noFollow?: boolean
}
const Robots: FC<RobotsProps> = ({ noIndex, noFollow }) => {
    /**
     * Never allow robots to index the site if NEXT_PUBLIC_ALLOW_ROBOTS_INDEXING is not set
     */
    if (!process.env.NEXT_PUBLIC_ALLOW_ROBOTS_INDEXING) {
        return <meta name="robots" content="noindex,nofollow" />
    }

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
    openGraphImage?: string

    canonicalUrl?: string
}
/**
 * The SEO component is usually initialized at the top of every Next.js Page, and
 * passed `seoProps` from the main page props.
 *
 * Pages may provide sensible defaults for SEO props via <PageType>.contentful.tsx in the `entryToSeoProps` function
 * but the CMS author can override any of these props via the "SEO" reference field.
 */
export const Seo: FC<Partial<SeoProps>> = ({
    title,
    addTitleSuffix = true,
    description,
    keywords,

    noIndex,
    noFollow,
    openGraphImage,
    canonicalUrl,
}) => {
    // pages can provide seo images by default, but can _always_ be overridden by the SEO contentful entry.
    const openGraphProps: OpenGraphProps = {
        title: title,
        description: description,
        image: openGraphImage,
    }
    return (
        <Head>
            {/* do not enter multiple lines in <title> -- it must be _one_ child or will cause SSR issues and <!-- --> in initial render */}
            <title>{`${title}${addTitleSuffix ? ' | Rightpoint' : ''}`}</title>
            <Robots noIndex={noIndex} noFollow={noFollow} />
            {keywords && <meta name="keywords" content={keywords} />}
            {description && <meta name="description" content={description} />}
            {/* 
                note: sitemap.xml implies canonical URL.
             */}
            {canonicalUrl && (
                <link
                    rel="canonical"
                    href={getAbsoluteDomainUrl() + canonicalUrl}
                />
            )}
            <OpenGraph {...openGraphProps} />
        </Head>
    )
}
