import { NextPage } from 'next'
import { useRouter } from 'next/router'
import {
    BackgroundColors,
    CardsList,
    CardVariants,
    ContainerBox,
    ContainerWidths,
    FallbackLoading,
    PageHeader,
    ScrollingText,
    SolutionsAnimationDynamic,
} from '@rightpoint/core/components'
import { Seo, SeoProps } from '../seo/Seo/Seo.component'
import { Components } from '@rightpoint/core/next-contentful-renderer'
import { GetSolutionPageStaticProps } from './Solution.server'
import { SolutionPageStyles as s } from './Solution.styles'
import { CardsListLayouts } from '@rightpoint/core/components'

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
        headerBackgroundColor,
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
                renderAbove={() => (
                    <s.LandingAnimation>
                        <SolutionsAnimationDynamic
                            cursorText={''}
                            linkProps={null}
                        />
                    </s.LandingAnimation>
                )}
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
                                layout={CardsListLayouts.Offset}
                            />
                        </s.LandingRelatedSolutions>
                    </>
                )}
                backgroundColor={headerBackgroundColor}
                contentColor={headerContentColor}
                bottomMultiMediaProps={multiMediaProps}
                styledProps={{
                    PageHeader: {
                        $noMainPadding: true,
                    },
                }}
            />

            <ContainerBox container={ContainerWidths.Medium}>
                <Components
                    componentsProps={pageProps.components}
                    transformers={{
                        '*': {
                            transformRootProps: (rootProps) => ({
                                ...rootProps,
                                background: {
                                    ...rootProps.background,
                                    backgroundColor: null,
                                },
                                container: false,
                            }),
                        },
                    }}
                    removeFirstLastSpacing
                />
            </ContainerBox>

            {/* TODO: Move it to Dynamic component */}
            <ScrollingText text="Total Experience" />

            {/* 
                On the Solution landing page, 
                the bottom components have a specific background color.

                Moving forward, we can use the new "Component Groups"
                which allow multiple components to have different backgrounds/containers
                depending on context.
                
                @deprecated
            */}
            <Components
                componentsProps={pageProps.bottomComponents}
                transformers={{
                    '*': {
                        transformRootProps: (rootProps) => ({
                            ...rootProps,
                            background: {
                                ...rootProps.background,
                                backgroundColor: BackgroundColors.Sand,
                            },
                        }),
                    },
                }}
            />
        </>
    )
}
