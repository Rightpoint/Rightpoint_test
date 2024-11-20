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

import { Box, useResponsiveQuery } from 'atomic-layout'
import { WorkCategoryStyles as s } from './WorkCategory.styles'
import { isEmpty } from 'lodash'
import { Seo } from '../common/Seo/Seo.component'
import { ComponentPropsWithMeta } from '../../next-contentful'
import { Components } from '@rightpoint/core/next-contentful-renderer'
import { AllPageProps } from '../../next-contentful/mappers/all-mappers/mapper.interface'

export type WorkCategoryProps = {
    workCardsProps?: CardProps[]
    bottomComponents?: ComponentPropsWithMeta[]
    topComponents?: ComponentPropsWithMeta[]
    quoteProps?: QuoteProps
    title?: string
}

export const WorkCategory: NextPage<AllPageProps<WorkCategoryProps>> = ({
    pageProps,
    seoProps,
}) => {
    const router = useRouter()
    const isMobile = useResponsiveQuery({ from: 'xs', to: 'sm' })

    if (router.isFallback) {
        return <FallbackLoading />
    }

    if (!pageProps) {
        console.error('No page props on landing page')
        return <></>
    }
    const {
        workCardsProps,
        bottomComponents,
        topComponents,
        quoteProps,
        title,
    } = pageProps

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
            <Box
                marginTop={250}
                as="section"
                aria-label={`List of work ${
                    title === 'Work' ? '' : `in ${title}`
                }`}
            >
                {/* Inject quote if it exists and desktop */}
                {workCardsProps && (
                    <>
                        {isMobile || isEmpty(quoteProps) ? (
                            <GridLayout>
                                {workCardsProps.map((workCard, index) => (
                                    <Card
                                        key={index}
                                        variant={CardVariants.Card2}
                                        {...workCard}
                                    />
                                ))}
                            </GridLayout>
                        ) : (
                            <>
                                <GridLayout>
                                    {workCardsProps
                                        .slice(0, 4)
                                        .map((workCard, index) => (
                                            <Card
                                                key={index}
                                                variant={CardVariants.Card2}
                                                {...workCard}
                                            />
                                        ))}
                                </GridLayout>

                                <RootComponent container={true} tag="div">
                                    <Quote {...quoteProps} variant="large" />
                                </RootComponent>

                                <GridLayout gridLayout="Grid2">
                                    {workCardsProps
                                        .slice(4)
                                        .map((workCard, index) => (
                                            <Card
                                                key={index}
                                                variant={CardVariants.Card2}
                                                {...workCard}
                                            />
                                        ))}
                                </GridLayout>
                            </>
                        )}
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
