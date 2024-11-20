import { NextPage } from 'next'
import { useRouter } from 'next/router'
import {
    CardProps,
    CardsList,
    ContainerBox,
    ContentColors,
    FallbackLoading,
    MultiMediaProps,
    PageHeader,
} from '@rightpoint/core/components'
import { Seo, SeoProps } from '../seo/Seo/Seo.component'
import { Components } from '@rightpoint/core/next-contentful-renderer'
import { ComponentPropsWithMeta } from '../../next-contentful/mappers/all-mappers/mapper.interface'
import { GetSolutionPageStaticProps } from './Solution.server'
import { Document } from '@contentful/rich-text-types'
import { SolutionPageStyles as s } from './Solution.styles'

export type SolutionPageProps = {
    title: string

    introductionEyebrow?: string
    subtitle?: string
    // introductionDocument?: Document
    relatedSolutionsCardsProps?: CardProps[]
    backgroundMultiMediaProps?: MultiMediaProps
    components: ComponentPropsWithMeta[]
    seoProps?: SeoProps

    headerContentColor?: ContentColors
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
        relatedSolutionsCardsProps,
        backgroundMultiMediaProps,
        headerContentColor,
    } = pageProps
    return (
        <>
            {seoProps && <Seo {...seoProps} />}

            <PageHeader
                title={title}
                introEyebrow={introductionEyebrow}
                subtitle={subtitle}
                backgroundMultiMediaProps={backgroundMultiMediaProps}
                renderBelow={() => (
                    <s.LandingRelatedSolutions>
                        <CardsList
                            cardsProps={relatedSolutionsCardsProps}
                            layout="Offset"
                        />
                    </s.LandingRelatedSolutions>
                )}
                contentColor={headerContentColor}
            />

            <ContainerBox>
                <h1>{title}</h1>
            </ContainerBox>

            <Components componentsProps={pageProps.components} />
        </>
    )
}
