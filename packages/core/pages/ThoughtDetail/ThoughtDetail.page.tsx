import { Box, Composition } from 'atomic-layout'
import { Components } from '@rightpoint/core/next-contentful-renderer'
import { AnimatePresence, motion, useScroll } from 'framer-motion'
import { type NextPage } from 'next'
import { useRouter } from 'next/router'
import { FC, useEffect, useRef, useState } from 'react'
import { ThoughtDetailStyles as s } from './ThoughtDetail.styles'
import { ThoughtDetailHeader } from './components/ThoughtDetailHeader'
import { Seo, type SeoProps } from '../common/Seo/Seo.component'
import {
    Card,
    CardProps,
    CardVariants,
    FallbackLoading,
    Hero,
    MultiMedia,
    MultiMediaContextProvider,
    type MultiMediaProps,
    ScrollerFreeMode,
    Share,
    type PersonProps,
} from '@rightpoint/core/components'
import type {
    AllPageProps,
    ComponentPropsWithMeta,
} from '../../next-contentful/mappers/all-mappers/mapper.interface'

export interface ThoughtDetailProps {
    title: string
    multiMediaProps: MultiMediaProps
    seoProps?: SeoProps
    componentsProps: ComponentPropsWithMeta[]
    relatedCardsProps: CardProps[]
    authorsProps?: PersonProps[]
    cardProps?: CardProps
}
export const ThoughtDetail: NextPage<AllPageProps<ThoughtDetailProps>> = ({
    seoProps,
    pageProps,
}) => {
    const router = useRouter()

    const sidebarRef = useRef<HTMLDivElement>()
    const [isImageInSidebar, setIsImageInSidebar] = useState(false)
    const { scrollY } = useScroll()

    useEffect(
        () =>
            scrollY.onChange((v) => {
                const CSS_STICK_OFFSET = 100
                const absoluteTop =
                    sidebarRef.current.getBoundingClientRect().top +
                    window.scrollY -
                    CSS_STICK_OFFSET

                setIsImageInSidebar(v >= absoluteTop)
            }),
        [scrollY]
    )

    if (router.isFallback) {
        return <FallbackLoading />
    }

    if (!pageProps) {
        console.error('No page props on thought detail')
        return <>no props</>
    }

    const {
        title,
        multiMediaProps,
        componentsProps,
        relatedCardsProps = [],
        authorsProps,
        cardProps,
    } = pageProps

    return (
        <>
            {seoProps && <Seo {...seoProps} />}
            <ThoughtDetailHeader
                title={title}
                authorsProps={authorsProps}
                cardProps={cardProps}
            />
            <Box
                maxWidth={1170 + 200}
                marginHorizontal={'auto'}
                paddingHorizontal={15}
                paddingHorizontalMd={50}
                paddingHorizontalLg={100}
                marginBottom={100}
                as={s.Box}
            >
                <Composition
                    templateCols="minmax(30px, auto)  auto"
                    templateColsMd="minmax(30px, auto)  minmax(500px, 700px)"
                    gapRow={60}
                    gapRowLg={100}
                    gapColXs={30}
                    gapColLg={60}
                >
                    <s.Sidebar ref={sidebarRef}>
                        <Sidebar
                            isImageInSidebar={isImageInSidebar}
                            multiMediaProps={multiMediaProps}
                            title={title}
                        />
                    </s.Sidebar>
                    <Components
                        componentsProps={componentsProps}
                        removeFirstLastSpacing={true}
                        transformers={{
                            // Rich text is on the sidebar
                            longRichText: {
                                transformRootProps: (rootProps) => ({
                                    ...rootProps,
                                    styles: {
                                        gridColumn: 2,
                                    },
                                }),
                            },
                            // Everything else spans full width
                            '*': {
                                transformRootProps: (rootProps) => ({
                                    ...rootProps,
                                    styles: {
                                        gridColumn: '1 / -1',
                                    },
                                }),
                            },
                        }}
                    />
                </Composition>
            </Box>
            <RelatedThoughtScroller relatedCardsProps={relatedCardsProps} />
        </>
    )
}

const RelatedThoughtScroller: FC<{ relatedCardsProps: CardProps[] }> = ({
    relatedCardsProps,
}) => {
    const isEmpty = !(relatedCardsProps && relatedCardsProps.length > 0)
    if (isEmpty) {
        return null
    }
    return (
        <Box marginTop={250} marginBottom={100}>
            <Hero contentWidth={'FullWidth'} title="Thoughts">
                <ScrollerFreeMode>
                    {relatedCardsProps.map((card, index) => {
                        return (
                            <MultiMediaContextProvider
                                key={index}
                                aspectWrapperProps={{
                                    aspectWrapperRatio: 16 / 9,

                                    // very temporary. we need a solution for this.
                                    aspectWrapperRatioDesktop:
                                        [9 / 10, 11 / 10, 9 / 10, 12 / 11][
                                            index
                                        ] || 16 / 9,
                                }}
                            >
                                <Card
                                    key={index}
                                    variant={CardVariants.Card3}
                                    title={card.title}
                                    date={card.date}
                                    body={card.body}
                                    multiMediaProps={card.multiMediaProps}
                                    linkProps={card.linkProps}
                                />
                            </MultiMediaContextProvider>
                        )
                    })}
                </ScrollerFreeMode>
            </Hero>
        </Box>
    )
}

interface SidebarProps {
    isImageInSidebar: boolean
    multiMediaProps: MultiMediaProps
    title: string
}
const Sidebar: FC<SidebarProps> = ({
    isImageInSidebar,
    multiMediaProps,
    title,
}) => {
    return (
        <s.StickySidebar>
            <AnimatePresence>
                {isImageInSidebar && (
                    <s.StickySidebarImage
                        initial={{
                            opacity: 0,
                            maxHeight: 0,
                            overflow: 'hidden',
                            translateY: -50,
                        }}
                        animate={{
                            opacity: 1,
                            maxHeight: 1000,
                            translateY: -20,
                        }}
                        transition={{
                            duration: 1.5,
                            easings: 'easeIn',
                        }}
                        exit={{
                            maxHeight: 0,
                            opacity: 0,
                            translateY: -50,
                        }}
                        as={motion.div}
                    >
                        <MultiMediaContextProvider
                            aspectWrapperProps={{
                                aspectWrapperRatio: 9 / 12,
                                aspectWrapperRatioDesktop: 9 / 12,
                            }}
                        >
                            <MultiMedia {...multiMediaProps} />
                        </MultiMediaContextProvider>
                    </s.StickySidebarImage>
                )}
            </AnimatePresence>
            <Share pageTitle={title} />
        </s.StickySidebar>
    )
}
