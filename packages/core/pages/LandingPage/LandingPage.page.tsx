import { FC, useEffect, useRef, useState } from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import {
    Header,
    HeaderVariants,
    MultiMedia,
    MultiMediaProps,
    Share,
    MultiMediaContextProvider,
} from '@rightpoint/core/components'
import { useScroll, motion, AnimatePresence } from 'framer-motion'
import { Seo } from '../common/Seo/Seo.component'
import { Box, Composition } from 'atomic-layout'
import { LandingPageStyles as s } from './LandingPage.styles'
import { Components } from '@rightpoint/core/next-contentful-renderer'
import type { GetLandingPageStaticProps } from './LandingPage.server'
import type { ComponentPropsWithMeta } from '../../next-contentful'
import { PardotProps, PardotDynamic } from '@rightpoint/core/components'

export enum LandingPageTemplates {
    Default = 'Default',
}

export type LandingPageProps = {
    title: string
    multiMediaProps?: MultiMediaProps
    componentsProps?: ComponentPropsWithMeta[]
    bottomComponentsProps?: ComponentPropsWithMeta[]
    layoutTemplate: LandingPageTemplates | string
    pardotProps?: PardotProps
}

export const LandingPage: NextPage<GetLandingPageStaticProps> = ({
    seoProps,
    pageProps,
}) => {
    const router = useRouter()

    if (router.isFallback) {
        return <>Generating...</>
    }
    if (!pageProps) {
        console.error('No page props on thought')
        return <>no props</>
    }
    const {
        title,
        multiMediaProps,
        componentsProps = [],
        bottomComponentsProps = [],
        pardotProps,
    } = pageProps
    return (
        <>
            {seoProps && <Seo {...seoProps} />}
            <Header
                headerTextProps={{
                    title,
                    variant: HeaderVariants.Thought,
                }}
            />
            <Box
                maxWidth={1170 + 200}
                marginHorizontal={'auto'}
                paddingHorizontal={15}
                paddingHorizontalMd={50}
                paddingHorizontalLg={100}
                marginBottom={100}
            >
                <Composition
                    templateCols="minmax(30px, auto)  auto"
                    templateColsMd="minmax(30px, auto)  minmax(500px, 700px)"
                    gapRow={60}
                    gapRowLg={100}
                    gapColXs={30}
                    gapColLg={60}
                >
                    {multiMediaProps && (
                        <s.Image>
                            <MultiMedia
                                {...multiMediaProps}
                                aspectWrapperRatio={34 / 46}
                                aspectWrapperRatioDesktop={16 / 9}
                            />
                        </s.Image>
                    )}
                    <Sidebar
                        multiMediaProps={multiMediaProps}
                        title={title}
                        pardotProps={pardotProps}
                    />
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

                {/* pardot form default location */}
                {pardotProps && <PardotDynamic {...pardotProps} />}
            </Box>
            <Components
                componentsProps={bottomComponentsProps}
                removeFirstLastSpacing={false}
            />
        </>
    )
}

interface SidebarProps {
    multiMediaProps: MultiMediaProps
    title: string
    pardotProps?: PardotProps
}
const Sidebar: FC<SidebarProps> = ({ multiMediaProps, title, pardotProps }) => {
    const sidebarRef = useRef<HTMLDivElement>()
    const [isImageInSidebar, setIsImageInSidebar] = useState(false)
    const { scrollY } = useScroll()

    useEffect(
        () =>
            scrollY.onChange((v) => {
                const CSS_STICK_OFFSET = 100
                const absoluteTop =
                    sidebarRef.current?.getBoundingClientRect().top +
                    window.scrollY -
                    CSS_STICK_OFFSET

                setIsImageInSidebar(v >= absoluteTop)
            }),
        [scrollY, sidebarRef]
    )
    return (
        <s.Sidebar ref={sidebarRef}>
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
        </s.Sidebar>
    )
}
