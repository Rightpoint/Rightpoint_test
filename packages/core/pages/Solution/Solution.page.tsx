import { NextPage } from 'next'
import { useRouter } from 'next/router'
import {
    BackgroundColors,
    CardProps,
    ContentColors,
    FallbackLoading,
    MultiMediaProps,
    PageHeader,
} from '@rightpoint/core/components'
import { Seo, SeoProps } from '../seo/Seo/Seo.component'
import { Components } from '@rightpoint/core/next-contentful-renderer'
import { SolutionPageStyles as s } from './Solution.styles'
import type { Document } from '@contentful/rich-text-types'
import type { ComponentPropsWithMeta } from '../../next-contentful/mappers/all-mappers/mapper.interface'
import type { GetSolutionPageStaticProps } from './Solution.server'

export type SolutionPageProps = {
    title: string

    introductionEyebrow?: string
    subtitle?: string | Document
    relatedSolutionsCardsProps?: CardProps[]
    backgroundMultiMediaProps?: MultiMediaProps

    components: ComponentPropsWithMeta[]
    bottomComponents?: ComponentPropsWithMeta[]

    seoProps?: SeoProps

    headerContentColor?: ContentColors
    headerBackgroundColor?: BackgroundColors

    multiMediaProps?: MultiMediaProps
}
export const SolutionPage: NextPage<GetSolutionPageStaticProps> = ({
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
        subtitle,
        backgroundMultiMediaProps,
        headerContentColor,
        headerBackgroundColor,
        multiMediaProps,
    } = pageProps

    return (
        <>
            {seoProps && <Seo {...seoProps} />}

            <PageHeader
                title={title}
                introEyebrow={introductionEyebrow}
                subtitle={subtitle}
                backgroundMultiMediaProps={backgroundMultiMediaProps}
                contentColor={headerContentColor}
                bottomMultiMediaProps={multiMediaProps}
                backgroundColor={headerBackgroundColor}
            />

            <Components
                componentsProps={pageProps.components}
                // removeFirstLastSpacing={true}
                // transformers={{
                //     '*': {
                //         transformRootProps: (rootProps) => ({
                //             ...rootProps,
                //             background: {
                //                 ...rootProps?.background,
                //                 backgroundColor: BackgroundColors.None,
                //             },
                //             container: false,
                //         }),
                //     },
                // }}
            />
            {/* 
            <Components
                componentsProps={pageProps.bottomComponents}
                transformers={{
                    '*': {
                        transformRootProps: (rootProps) => ({
                            ...rootProps,
                            container: true,
                        }),
                    },
                }}
            /> */}
        </>
    )
}
