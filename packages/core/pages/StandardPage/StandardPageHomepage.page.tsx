import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { FallbackLoading, Navbar } from '@rightpoint/core/components'
import { Seo, SeoProps } from '../common/Seo/Seo.component'
import { Components } from '@rightpoint/core/next-contentful-renderer'
import { ComponentPropsWithMeta } from '../../next-contentful/mappers/all-mappers/mapper.interface'
import { GetStandardPageStaticProps } from './StandardPage.server'
import { useEffect, useRef } from 'react'

/**
 * This is a candidate for deletion.
 * Used formerly for unique homepage navbar below video fold
 */
export type StandardPageProps = {
    title: string
    seoProps?: SeoProps
    components: ComponentPropsWithMeta[]
}
export const StandardPageHomepage: NextPage<GetStandardPageStaticProps> = ({
    pageProps,
    seoProps,
}) => {
    const router = useRouter()
    const ref = useRef<HTMLDivElement>()

    if (router.isFallback) {
        return <FallbackLoading />
    }
    if (!pageProps) {
        return <></>
    }
    if (!pageProps.components) {
        console.warn('No page props on standard page')
        return null
    }

    const { components, ...rest } = pageProps

    return (
        <>
            {seoProps && <Seo {...seoProps} />}
            <Components componentsProps={pageProps.components} />
        </>
    )
}
