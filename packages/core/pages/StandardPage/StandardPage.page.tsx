import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { FallbackLoading } from '@rightpoint/core/components'
import { Seo, SeoProps } from '../common/Seo/Seo.component'
import { Components } from '@rightpoint/core/next-contentful-renderer'
import { ComponentPropsWithMeta } from '../../next-contentful/mappers/all-mappers/mapper.interface'
import { GetStandardPageStaticProps } from './StandardPage.server'

export type StandardPageProps = {
    title: string
    seoProps?: SeoProps
    components: ComponentPropsWithMeta[]
}
export const StandardPage: NextPage<GetStandardPageStaticProps> = ({
    pageProps,
    seoProps,
}) => {
    const router = useRouter()
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
    return (
        <>
            {seoProps && <Seo {...seoProps} />}
            <Components componentsProps={pageProps.components} />
        </>
    )
}
