import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { FallbackLoading } from '@rightpoint/core/components'
import { Seo, SeoProps } from '../seo/Seo/Seo.component'
import { Components } from '@rightpoint/core/next-contentful-renderer'

import type { ComponentPropsWithMeta } from '../../next-contentful/mappers/all-mappers/mapper.interface'
import type { GetStandardPageStaticProps } from './StandardPage.server'

export type StandardPageProps = {
    seoProps?: SeoProps
    components: ComponentPropsWithMeta[]
}
export const StandardPage: NextPage<GetStandardPageStaticProps> = ({
    pageProps,
    seoProps,
    mapperProps,
}) => {
    const router = useRouter()
    if (router.isFallback) {
        return <FallbackLoading />
    }
    if (!pageProps) {
        return null
    }
    return (
        <>
            {seoProps && <Seo {...seoProps} />}
            <Components componentsProps={pageProps.components} />
        </>
    )
}
