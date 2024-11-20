import { NextPage } from 'next'
import { useRouter } from 'next/router'
import {
    Card,
    CardProps,
    CardsList,
    CardVariants,
    ContainerBox,
    FallbackLoading,
    GridLayout,
    Header,
    HeaderProps,
    QuoteProps,
} from '@rightpoint/core/components'

import { Box, useResponsiveQuery } from 'atomic-layout'
import { WorkCategoryStyles as s } from './WorkCategory.styles'
import { Seo } from '../seo/Seo/Seo.component'
import { ComponentPropsWithMeta } from '../../next-contentful'
import { Components } from '@rightpoint/core/next-contentful-renderer'
import { AllPageProps } from '../../next-contentful/mappers/all-mappers/mapper.interface'

export type WorkCategoryProps = {
    workCardsProps?: CardProps[]
    bottomComponents?: ComponentPropsWithMeta[]
    topComponents?: ComponentPropsWithMeta[]
    quoteProps?: QuoteProps
    title?: string
    headerProps?: HeaderProps
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
        title,
        workCardsProps,
        headerProps,
        bottomComponents,
        topComponents,
    } = pageProps

    return (
        <>
            {seoProps && <Seo {...seoProps} />}
            <ContainerBox addBottomMargin as={'section'}>
                <CardsList
                    headerProps={{
                        ...headerProps,
                        variant: 'Header2',
                    }}
                    layout="Grid"
                    cardsProps={workCardsProps}
                />
            </ContainerBox>

            <Components
                componentsProps={topComponents}
                removeFirstLastSpacing={false}
            />
            <Components
                componentsProps={bottomComponents}
                removeFirstLastSpacing={false}
            />
        </>
    )
}
