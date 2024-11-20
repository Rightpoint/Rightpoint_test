import { NextPage } from 'next'
import { useRouter } from 'next/router'
import {
    BackgroundColors,
    CardProps,
    ContentColors,
    FallbackLoading,
    LinkProps,
    MultiMediaProps,
    PageHeader,
} from '@rightpoint/core/components'
import { Seo, SeoProps } from '../seo/Seo/Seo.component'
import { Components } from '@rightpoint/core/next-contentful-renderer'
import { IndustryPageStyles as s } from './Industry.styles'

import type { ComponentPropsWithMeta } from '../../next-contentful/mappers/all-mappers/mapper.interface'
import type { GetIndustryPageStaticProps } from './Industry.server'
import type { Document } from '@contentful/rich-text-types'

export type IndustryPageProps = {
    title: string

    introductionEyebrow?: string
    introduction?: Document
    subtitle?: string
    relatedIndustriesCardsProps?: CardProps[]

    components: ComponentPropsWithMeta[]
    bottomComponents?: ComponentPropsWithMeta[]

    seoProps?: SeoProps

    headerContentColor?: ContentColors
    headerLinksHeader?: string
    headerLinksProps?: LinkProps[]
    headerBackgroundColor?: BackgroundColors

    backgroundMultiMediaProps?: MultiMediaProps
    multiMediaProps?: MultiMediaProps
}
export const IndustryPage: NextPage<GetIndustryPageStaticProps> = ({
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

    const {
        title,
        introductionEyebrow,
        headerBackgroundColor,
        backgroundMultiMediaProps,
        headerContentColor,
        introduction,
        headerLinksHeader,
        headerLinksProps,
    } = pageProps

    return (
        <>
            {seoProps && <Seo {...seoProps} />}

            <PageHeader
                title={title}
                eyebrow={introductionEyebrow}
                introductionDocument={introduction}
                backgroundMultiMediaProps={backgroundMultiMediaProps}
                backgroundColor={headerBackgroundColor}
                contentColor={headerContentColor}
                linksHeader={headerLinksHeader || 'Offerings'}
                linksProps={headerLinksProps}
            />

            <Components
                componentsProps={pageProps.components}
                // transformers={{
                //     '*': {
                //         transformRootProps: (rootProps) => ({
                //             ...rootProps,
                //             background: {
                //                 ...rootProps.background,
                //                 backgroundColor: BackgroundColors.None,
                //             },
                //         }),
                //     },
                // }}
            />
            {/* <Components componentsProps={pageProps.bottomComponents} /> */}
        </>
    )
}
