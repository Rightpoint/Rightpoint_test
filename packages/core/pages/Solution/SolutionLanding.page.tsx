import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { FallbackLoading, Navbar } from '@rightpoint/core/components'
import { Seo, SeoProps } from '../seo/Seo/Seo.component'
import { Components } from '@rightpoint/core/next-contentful-renderer'
import { ComponentPropsWithMeta } from '../../next-contentful/mappers/all-mappers/mapper.interface'
import { GetSolutionPageStaticProps } from './Solution.server'
import { useEffect, useRef } from 'react'

export type SolutionPageProps = {
    title: string
    seoProps?: SeoProps
    components: ComponentPropsWithMeta[]
}
export const SolutionPageHomepage: NextPage<GetSolutionPageStaticProps> = ({
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
