import { Box, Composition } from 'atomic-layout'
import { Components } from '@rightpoint/core/next-contentful-renderer'
import { AnimatePresence, motion, useScroll } from 'framer-motion'
import { type NextPage } from 'next'
import { useRouter } from 'next/router'
import { FC, ReactNode, useEffect, useRef, useState } from 'react'
import { ThoughtDetailStyles as s } from './ThoughtDetail.styles'
import { Seo, type SeoProps } from '../seo/Seo/Seo.component'
import {
    CardProps,
    FallbackLoading,
    MultiMedia,
    MultiMediaContextProvider,
    type MultiMediaProps,
    Share,
    type PersonProps,
    CardsList,
    RootComponent,
    BackgroundColors,
    ContentColors,
    contentfulRichTextToReact,
    RichText,
    ThoughtHeader,
    personsPropsToCreditString,
} from '@rightpoint/core/components'
import type {
    AllPageProps,
    ComponentPropsWithMeta,
} from '../../next-contentful/mappers/all-mappers/mapper.interface'
import { Document } from '@contentful/rich-text-types'

export interface ThoughtDetailProps {
    title: string
    introductionDocument?: Document
    bodyDocument?: Document
    multiMediaProps: MultiMediaProps
    backgroundMultiMediaProps?: MultiMediaProps
    seoProps?: SeoProps
    componentsProps: ComponentPropsWithMeta[]
    relatedCardsProps: CardProps[]
    authorsProps?: PersonProps[]
    cardProps?: CardProps
    headerContentColor?: ContentColors
    headerBackgroundTreatment?: string
}
export const ThoughtDetail: NextPage<AllPageProps<ThoughtDetailProps>> = ({
    seoProps,
    pageProps,
}) => {
    const router = useRouter()

    if (router.isFallback) {
        return <FallbackLoading />
    }

    if (!pageProps) {
        console.error('No page props on thought detail')
        return <>no props</>
    }

    const {
        title,
        introductionDocument,
        bodyDocument,
        componentsProps,
        multiMediaProps,
        relatedCardsProps = [],
        authorsProps,
        cardProps,
        headerContentColor,
        headerBackgroundTreatment,
        backgroundMultiMediaProps,
    } = pageProps

    const Body = contentfulRichTextToReact(bodyDocument)

    return (
        <>
            {seoProps && <Seo {...seoProps} />}

            <ThoughtHeader
                title={title}
                bodyDocument={introductionDocument}
                authors={personsPropsToCreditString({
                    personsProps: authorsProps,
                })}
                cardProps={cardProps}
                contentColor={headerContentColor}
                backgroundMultiMediaProps={backgroundMultiMediaProps}
                backgroundTreatment={headerBackgroundTreatment}
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
                    templateColsMd="minmax(30px, auto)  minmax(500px, 700px)"
                    templateColsLgOnly="minmax(30px, auto)  auto"
                    gapRow={60}
                    gapRowLg={100}
                    gapColXs={30}
                    gapColLg={60}
                >
                    <Sidebar multiMediaProps={multiMediaProps} title={title} />

                    {Body && (
                        <RootComponent noMargins>
                            <RichText>{Body}</RichText>
                        </RootComponent>
                    )}

                    <Components
                        componentsProps={componentsProps}
                        removeFirstLastSpacing={
                            Body
                                ? // if there's a post body mixed with components, add spacing;
                                  false
                                : // otherwise, remove
                                  true
                        }
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

            {relatedCardsProps && (
                <RootComponent
                    container={true}
                    background={{
                        backgroundColor: BackgroundColors.Neutral2,
                    }}
                >
                    <CardsList
                        cardsProps={relatedCardsProps.slice(0, 3)}
                        headerProps={{
                            variant: 'Header3',
                            title: 'Related Articles',
                        }}
                        layout="Offset"
                    />
                </RootComponent>
            )}
        </>
    )
}

interface SidebarProps {
    multiMediaProps: MultiMediaProps
    title: string
}
const Sidebar: FC<SidebarProps> = ({ multiMediaProps, title }) => {
    const sidebarRef = useRef<HTMLDivElement>()

    const [isImageInSidebar, setIsImageInSidebar] = useState(false)
    const { scrollY } = useScroll()

    useEffect(
        () =>
            scrollY.on('change', (v) => {
                const CSS_STICK_OFFSET = 100
                const absoluteTop =
                    sidebarRef.current.getBoundingClientRect().top +
                    window.scrollY -
                    CSS_STICK_OFFSET

                setIsImageInSidebar(v >= absoluteTop)
            }),
        [scrollY]
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
                                aspectWrapperProps={
                                    {
                                        // aspectWrapperRatio: 9 / 12,
                                        // aspectWrapperRatioDesktop: 9 / 12,
                                    }
                                }
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
