import { NextPage } from 'next'
import { useRouter } from 'next/router'
import {
    CardProps,
    FallbackLoading,
    Header,
    ContainerBox,
    HeaderProps,
    LinkProps,
    Link,
    CardsList,
    CardsListLayouts,
    TabsNav,
} from '@rightpoint/core/components'
import { Seo } from '../seo/Seo/Seo.component'
import { GetThoughtCategoryStaticProps } from './ThoughtCategory.server'
import { ThoughtCategoryStyles as s } from './ThoughtCategory.styles'

export type ThoughtCategoryProps = {
    thoughtCards?: (CardProps | null)[]
    headerProps?: HeaderProps
    linksProps?: LinkProps[]
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
    const { headerProps, thoughtCards = [], linksProps = [] } = pageProps

    return (
        <>
            {seoProps && <Seo {...seoProps} />}

            <ContainerBox addBottomMargin addTopMargin>
                {/* 
                TODO:
                Headers should probably not rely on page css -- they should have their own way of rendering
                 consistently across pages via prop
                */}
                <Header variant="Header2" {...headerProps} as={s.Header} />

                <TabsNav
                    linksProps={linksProps.map((linkProps) => ({
                        ...linkProps,
                        noDecoration: true,
                    }))}
                />
            </ContainerBox>
            <ContainerBox>
                <CardsList
                    layout={CardsListLayouts.FullWidth}
                    cardsProps={thoughtCards}
                />
            </ContainerBox>
        </>
    )
}
