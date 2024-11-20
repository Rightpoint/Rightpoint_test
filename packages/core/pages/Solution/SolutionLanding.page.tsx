import { NextPage } from 'next'
import { useRouter } from 'next/router'
import {
    BackgroundColors,
    CardsList,
    CardVariants,
    ContainerBox,
    ContainerWidths,
    FallbackLoading,
    Header,
    MultiMedia,
    PageHeader,
    RootComponent,
    ScrollingText,
} from '@rightpoint/core/components'
import { Seo, SeoProps } from '../seo/Seo/Seo.component'
import { Components } from '@rightpoint/core/next-contentful-renderer'
import { GetSolutionPageStaticProps } from './Solution.server'
import { SolutionPageStyles as s } from './Solution.styles'
import { colors } from '../../variables'

export const SolutionLandingPage: NextPage<GetSolutionPageStaticProps> = ({
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
                renderBelow={() => (
                    <>
                        <s.LandingRelatedSolutions>
                            <CardsList
                                cardsProps={relatedSolutionsCardsProps.map(
                                    (card) => ({
                                        ...card,
                                        variant: CardVariants.Card2,
                                    })
                                )}
                                layout="Offset"
                            />
                        </s.LandingRelatedSolutions>
                    </>
                )}
                contentColor={headerContentColor}
            />

            <ContainerBox container={ContainerWidths.Medium}>
                <s.OverlappedMedia $color={colors.black}>
                    <MultiMedia
                        {...multiMediaProps}
                        aspectWrapperRatio={16 / 9}
                        aspectWrapperRatioDesktop={16 / 9}
                    />
                </s.OverlappedMedia>

                <Components
                    componentsProps={pageProps.components}
                    transformers={{
                        '*': {
                            transformRootProps: (rootProps) => ({
                                ...rootProps,
                                background: {
                                    backgroundColor: null,
                                },
                                container: false,
                            }),
                        },
                    }}
                    removeFirstLastSpacing
                />
            </ContainerBox>
            <ScrollingText text="Total Experience" />
            {/* 
                On the Solution landing page, 
                the bottom components have a specific background color.
            */}
            <Components
                componentsProps={pageProps.bottomComponents}
                transformers={{
                    '*': {
                        transformRootProps: (rootProps) => ({
                            ...rootProps,
                            background: {
                                backgroundColor: BackgroundColors.Neutral2,
                            },
                        }),
                    },
                }}
            />
        </>
    )
}
