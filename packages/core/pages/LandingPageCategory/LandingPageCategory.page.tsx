import { NextPage } from 'next'
import { useRouter } from 'next/router'
import {
    CardProps,
    CardsList,
    ContainerBox,
    FallbackLoading,
    HeaderProps,
} from '@rightpoint/core/components'
import { LandingPageCategoryStyles as s } from './LandingPageCategory.styles'
import { Seo } from '../seo/Seo/Seo.component'
import { Components } from '@rightpoint/core/next-contentful-renderer'
import type { ComponentPropsWithMeta } from '../../next-contentful'
import type { AllPageProps } from '../../next-contentful/mappers/all-mappers/mapper.interface'
import { Document } from '@contentful/rich-text-types'

export type LandingPageCategoryProps = {
    headerProps: HeaderProps
    landingPageCardsProps?: CardProps[]
    // bottomComponents?: ComponentPropsWithMeta[]
    // topComponents?: ComponentPropsWithMeta[]
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

    const { headerProps, landingPageCardsProps } = pageProps

    return (
        <>
            {seoProps && <Seo {...seoProps} />}

            <ContainerBox addBottomMargin as={'section'}>
                <CardsList
                    headerProps={{
                        ...headerProps,
                    }}
                    layout="FullWidth"
                    cardsProps={landingPageCardsProps}
                />
            </ContainerBox>

            {/* <Components
                componentsProps={bottomComponents}
                removeFirstLastSpacing={false}
            /> */}
        </>
    )
}
