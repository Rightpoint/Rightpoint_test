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
    MultiMedia,
    MultiMediaProps,
    PageHeader,
    RootComponent,
} from '@rightpoint/core/components'
import { Seo, SeoProps } from '../seo/Seo/Seo.component'
import { Components } from '@rightpoint/core/next-contentful-renderer'
import { ComponentPropsWithMeta } from '../../next-contentful/mappers/all-mappers/mapper.interface'
import { GetSolutionPageStaticProps } from './Solution.server'
import { SolutionPageStyles as s } from './Solution.styles'
import { colors } from '../../variables'

export type SolutionPageProps = {
    title: string

    introductionEyebrow?: string
    subtitle?: string
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
        relatedSolutionsCardsProps,
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
            />

            <ContainerBox container={ContainerWidths.Medium}>
                {multiMediaProps && (
                    <s.OverlappedMedia $color={colors.black}>
                        <MultiMedia
                            {...multiMediaProps}
                            aspectWrapperRatio={16 / 9}
                            aspectWrapperRatioDesktop={16 / 9}
                        />
                    </s.OverlappedMedia>
                )}

                <Components
                    componentsProps={pageProps.components}
                    removeFirstLastSpacing={true}
                    transformers={{
                        '*': {
                            transformRootProps: (rootProps) => ({
                                ...rootProps,
                                background: {
                                    backgroundColor: null, // TODO: with "None" type, it sets content colors and thus causes bg padding. Need to fix this and remove padding.
                                },
                                container: false,
                            }),
                        },
                    }}
                />
            </ContainerBox>

            <Components
                componentsProps={pageProps.bottomComponents}
                transformers={{
                    '*': {
                        transformRootProps: (rootProps) => ({
                            ...rootProps,
                            background: {
                                backgroundColor: BackgroundColors.None,
                            },
                            container: true,
                        }),
                    },
                }}
            />

            <RootComponent
                background={{
                    backgroundColor: BackgroundColors.Black,
                }}
                container={true}
            >
                <CardsList
                    cardsProps={relatedSolutionsCardsProps.map((card) => ({
                        ...card,
                        variant: CardVariants.Card2,
                    }))}
                    layout="Offset"
                    headerProps={{
                        eyebrow: 'Our Solutions',
                        title: (
                            <>
                                Explore Total
                                <br />
                                Experience Solutions
                            </>
                        ),
                        variant: 'Header3',
                    }}
                />
            </RootComponent>
        </>
    )
}
