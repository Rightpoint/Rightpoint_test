import { NextPage } from 'next'
import { useRouter } from 'next/router'
import {
    BackgroundColors,
    CardProps,
    CardsList,
    CardVariants,
    ContainerBox,
    ContainerWidths,
    ContentColors,
    FallbackLoading,
    Header,
    LinkProps,
    MultiMedia,
    MultiMediaProps,
    PageHeader,
    RootComponent,
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
    relatedIndustrysCardsProps?: CardProps[]

    components: ComponentPropsWithMeta[]
    bottomComponents?: ComponentPropsWithMeta[]

    seoProps?: SeoProps

    headerContentColor?: ContentColors
    headerLinksProps?: LinkProps[]

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
        backgroundMultiMediaProps,
        headerContentColor,
        // multiMediaProps,
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
                contentColor={headerContentColor}
                linksHeader="Offerings"
                linksProps={headerLinksProps}
            />

            <Components
                componentsProps={pageProps.components}
                transformers={{
                    '*': {
                        transformRootProps: (rootProps) => ({
                            ...rootProps,
                            background: {
                                backgroundColor: BackgroundColors.None,
                            },
                        }),
                    },
                }}
            />
            <Components componentsProps={pageProps.bottomComponents} />

            {/* <RootComponent
                background={{
                    backgroundColor: BackgroundColors.Black,
                }}
                container={true}
            >
                <CardsList
                    cardsProps={relatedIndustrysCardsProps.map((card) => ({
                        ...card,
                        variant: CardVariants.Card2,
                    }))}
                    layout="Offset"
                    headerProps={{
                        eyebrow: 'Our Industrys',
                        title: (
                            <>
                                Explore Total
                                <br />
                                Experience Industrys
                            </>
                        ),
                        variant: 'Header3',
                    }}
                />
            </RootComponent> */}
        </>
    )
}
