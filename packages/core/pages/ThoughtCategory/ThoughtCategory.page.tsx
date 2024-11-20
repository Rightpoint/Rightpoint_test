import { NextPage } from 'next'
import { useRouter } from 'next/router'
import {
    CardProps,
    CardVariants,
    GridItem,
    GridLayout,
    GridLayouts,
    Header,
    HeaderVariants,
    Hero,
    HeroContentWidths,
    Navigation,
    FallbackLoading,
    Link,
    HeaderMediaWithAspect,
} from '@rightpoint/core/components'
import { Box } from 'atomic-layout'
import { FC } from 'react'
import { Seo } from '../seo/Seo/Seo.component'
import { NavigationProps } from '@rightpoint/core/components'
import { GetThoughtCategoryStaticProps } from './ThoughtCategory.server'

export type ThoughtCategoryProps = {
    featuredThoughtCardProps?: CardProps | null
    featuredThoughtsCardProps?: CardProps[]
    thoughtCards?: (CardProps | null)[]
    navigationProps?: NavigationProps
}

export const ThoughtCategory: NextPage<GetThoughtCategoryStaticProps> = ({
    pageProps,
    seoProps,
}) => {
    const router = useRouter()

    if (router.isFallback) {
        return <FallbackLoading />
    }
    if (!pageProps) {
        console.error('No page props on thought category')
        return <></>
    }
    const {
        thoughtCards = [],
        featuredThoughtCardProps,
        featuredThoughtsCardProps = [],
        navigationProps,
    } = pageProps

    return (
        <>
            {seoProps && <Seo {...seoProps} />}

            {featuredThoughtCardProps && (
                <FeaturedThoughtCard {...featuredThoughtCardProps} />
            )}

            {/* Featured section */}
            {!!featuredThoughtsCardProps.length && (
                <FeaturedThoughtsCards
                    featuredThoughtsCardProps={featuredThoughtsCardProps}
                />
            )}

            {/* Thought category card section */}
            <ThoughtGrid
                noMarginTop={
                    !featuredThoughtsCardProps.length &&
                    !featuredThoughtCardProps
                }
                navigationProps={navigationProps}
                thoughtCards={thoughtCards}
            />
        </>
    )
}

const FeaturedThoughtCard: FC<CardProps> = (cardProps) => {
    const { linkProps, title, multiMediaProps } = cardProps
    return (
        <Header
            headerTextProps={{
                title,
                variant: HeaderVariants.Thought,
                ctaProps: {
                    href: linkProps.href,
                    text: linkProps.text,
                },
            }}
            renderMedia={() => (
                <Link {...linkProps}>
                    <HeaderMediaWithAspect multiMediaProps={multiMediaProps} />
                </Link>
            )}
            multiMediaProps={multiMediaProps}
            a11y={{
                label: `Featured thought: ${title}`,
            }}
        />
    )
}

const FeaturedThoughtsCards: FC<{ featuredThoughtsCardProps: CardProps[] }> = ({
    featuredThoughtsCardProps,
}) => {
    return (
        <Box marginTop={250} aria-label="Featured thoughts" as="section">
            <Hero
                title="Featured"
                contentWidth={HeroContentWidths.FullWidth}
                titleSticky={true}
            >
                <GridLayout gridLayout={GridLayouts.Grid3}>
                    {featuredThoughtsCardProps
                        .filter(Boolean)
                        .map((card, index) => {
                            return (
                                <GridItem
                                    key={index}
                                    date={card.date}
                                    cardVariant={CardVariants.Card3}
                                    title={card.title}
                                    body={card.body}
                                    multiMediaProps={card.multiMediaProps}
                                    linkProps={card.linkProps}
                                />
                            )
                        })}
                </GridLayout>
            </Hero>
        </Box>
    )
}

const ThoughtGrid: FC<{
    navigationProps: NavigationProps
    thoughtCards: CardProps[]

    noMarginTop?: boolean
}> = ({ navigationProps, thoughtCards, noMarginTop }) => {
    return (
        <Box
            marginTop={noMarginTop ? 0 : 250}
            as="section"
            aria-label="Thought article list"
        >
            {navigationProps && (
                <Box
                    marginBottom={130}
                    aria-label="Thought category navigation"
                >
                    <Navigation {...navigationProps} />
                </Box>
            )}
            <GridLayout>
                {thoughtCards &&
                    thoughtCards.map((card, index) => {
                        return (
                            <GridItem
                                key={index}
                                date={card.date}
                                cardVariant={CardVariants.Card3}
                                title={card.title}
                                body={card.body}
                                multiMediaProps={card.multiMediaProps}
                                linkProps={card.linkProps}
                            />
                        )
                    })}
            </GridLayout>
        </Box>
    )
}
