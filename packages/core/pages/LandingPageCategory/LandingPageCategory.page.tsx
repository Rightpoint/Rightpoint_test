import { NextPage } from 'next'
import { useRouter } from 'next/router'
import {
    Card,
    CardProps,
    CardVariants,
    FallbackLoading,
    GridItem,
    GridLayout,
    Hero,
    Quote,
    QuoteProps,
    RootComponent,
} from '@rightpoint/core/components'
import { Box } from 'atomic-layout'
import { LandingPageCategoryStyles as s } from './LandingPageCategory.styles'
import { Seo } from '../common/Seo/Seo.component'
import { Components } from '@rightpoint/core/next-contentful-renderer'
import type { ComponentPropsWithMeta } from '../../next-contentful'
import type { AllPageProps } from '../../next-contentful/mappers/all-mappers/mapper.interface'

export type LandingPageCategoryProps = {
    title?: string
    landingPageCardsProps?: CardProps[]
    bottomComponents?: ComponentPropsWithMeta[]
    topComponents?: ComponentPropsWithMeta[]
}

export const LandingPageCategory: NextPage<
    AllPageProps<LandingPageCategoryProps>
> = ({ pageProps, seoProps }) => {
    const router = useRouter()

    if (router.isFallback) {
        return <FallbackLoading />
    }

    if (!pageProps) {
        console.error('No page props on landing page')
        return <></>
    }

    const { landingPageCardsProps, bottomComponents, topComponents, title } =
        pageProps

    return (
        <>
            {seoProps && <Seo {...seoProps} />}
            {!topComponents ? (
                <RootComponent>
                    <Hero title={title} />
                </RootComponent>
            ) : (
                <Components
                    componentsProps={topComponents}
                    removeFirstLastSpacing={false}
                />
            )}
            <Box marginTop={250} as="section" aria-label={`List of ${title}`}>
                {landingPageCardsProps && (
                    <>
                        <GridLayout>
                            {landingPageCardsProps.map((workCard, index) => (
                                <GridItem
                                    key={index}
                                    cardVariant={CardVariants.Card2}
                                    title={workCard.title}
                                    body={workCard.body}
                                    multiMediaProps={workCard.multiMediaProps}
                                    linkProps={workCard.linkProps}
                                />
                            ))}
                        </GridLayout>
                    </>
                )}
            </Box>

            <Components
                componentsProps={bottomComponents}
                removeFirstLastSpacing={false}
            />
        </>
    )
}
