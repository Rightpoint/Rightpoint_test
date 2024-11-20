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
import { ComponentPropsWithMeta } from '../../next-contentful/mappers/all-mappers/mapper.interface'
import { GetIndustryPageStaticProps } from './Industry.server'
import { IndustryPageStyles as s } from './Industry.styles'
import { Document } from '@contentful/rich-text-types'
import { colors } from '@rightpoint/core/variables'

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
                linksHeader="Offerings"
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
