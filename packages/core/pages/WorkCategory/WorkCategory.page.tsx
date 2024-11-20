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
    Link,
    LinkProps,
    QuoteProps,
    TabsNav,
} from '@rightpoint/core/components'

import { WorkCategoryStyles as s } from './WorkCategory.styles'
import { Seo } from '../seo/Seo/Seo.component'
import { ComponentPropsWithMeta } from '../../next-contentful'
import { Components } from '@rightpoint/core/next-contentful-renderer'
import { AllPageProps } from '../../next-contentful/mappers/all-mappers/mapper.interface'

export type WorkCategoryProps = {
    // workCardsProps?: CardProps[]
    topComponents?: ComponentPropsWithMeta[]
    bottomComponents?: ComponentPropsWithMeta[]
    quoteProps?: QuoteProps
    title?: string
    headerProps?: HeaderProps

    tabsProps: {
        items: LinkProps[]
    }
}

export const WorkCategory: NextPage<AllPageProps<WorkCategoryProps>> = ({
    pageProps,
    seoProps,
}) => {
    const router = useRouter()

    if (router.isFallback) {
        return <FallbackLoading />
    }

    if (!pageProps) {
        console.error('No page props on landing page')
        return <></>
    }
    const { title, headerProps, bottomComponents, topComponents, tabsProps } =
        pageProps

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

            <ContainerBox as={s.Tabs}>
                <TabsNav
                    linksProps={tabsProps.items.map((linkProps) => ({
                        ...linkProps,
                        noDecoration: true,
                        nextProps: {
                            // don't scroll to top of page
                            scroll: false,
                        },
                    }))}
                />
            </ContainerBox>

            <Components
                componentsProps={bottomComponents}
                removeFirstLastSpacing={false}
            />
        </>
    )
}
