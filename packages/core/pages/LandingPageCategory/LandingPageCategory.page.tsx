import { NextPage } from 'next'
import { useRouter } from 'next/router'
import {
    CardProps,
    CardsList,
    CardsListLayouts,
    ContainerBox,
    FallbackLoading,
    Header,
    HeaderProps,
} from '@rightpoint/core/components'
import { LandingPageCategoryStyles as s } from './LandingPageCategory.styles'
import { Seo } from '../seo/Seo/Seo.component'
import type { AllPageProps } from '../../next-contentful/mappers/all-mappers/mapper.interface'

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

            <ContainerBox addTopMargin as={'section'}>
                <Header
                    {...{
                        ...headerProps,
                        isPageHeader: true,
                    }}
                />
            </ContainerBox>
            <ContainerBox addBottomMargin addTopMargin as={'section'}>
                <CardsList
                    layout={CardsListLayouts.FullWidth}
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
