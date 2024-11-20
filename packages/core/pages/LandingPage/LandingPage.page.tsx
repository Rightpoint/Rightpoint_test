import { FC, useEffect, useRef, useState } from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import {
    MultiMedia,
    MultiMediaProps,
    Share,
    MultiMediaContextProvider,
    CardProps,
    ThoughtHeader,
    contentfulRichTextToReact,
    RichText,
    ContentColors,
    LinkProps,
    RootComponent,
    BackgroundColors,
    CardsList,
    CardsListLayouts,
    Button,
} from '@rightpoint/core/components'
import { useScroll, motion, AnimatePresence } from 'framer-motion'
import { Seo } from '../seo/Seo/Seo.component'
import { Box, Composition } from 'atomic-layout'
import { LandingPageStyles as s } from './LandingPage.styles'
import { Components } from '@rightpoint/core/next-contentful-renderer'
import {
    useClientSafePreviewData,
    type ComponentPropsWithMeta,
} from '../../next-contentful'
import { PardotProps, PardotDynamic } from '@rightpoint/core/components'
import Link from 'next/link'
import type { Document } from '@contentful/rich-text-types'
import type { GetLandingPageStaticProps } from './LandingPage.server'
import { PardotFormPage } from '../../components/general/Pardotform/Pardotform.component'

export enum LandingPageTemplates {
    Default = 'Default',
}

export type LandingPageProps = {
    title: string
    headerContentColor?: ContentColors
    headerBackgroundTreatment?: string
    headerHideCta?: boolean
    multiMediaProps?: MultiMediaProps
    componentsProps?: ComponentPropsWithMeta[]
    bottomComponentsProps?: ComponentPropsWithMeta[]
    layoutTemplate: LandingPageTemplates | string
    pardotProps?: PardotProps
    cardProps?: CardProps
    bodyDocument?: Document
    eyebrow?: string
    eyebrowLinkProps?: LinkProps
    ctaTitle?: string
    introductionDocument?: Document
    relatedCardsProps?: CardProps[]
    __tempPardotThankYouUrl?: string
    pardotForm: PardotFormEntryProp
}

export type PardotFormEntryProp = {
    description: Document
    fields: PardotFormProps[]
    formHandler: string
}

export type PardotFormProps = {
    label: string
    value: Record<string, { states?: string[] }>
    internalName: string
    required: boolean
}

export const LandingPage: NextPage<GetLandingPageStaticProps> = ({
    seoProps,
    pageProps,
}) => {
    const router = useRouter()

    const targetDivRef = useRef<HTMLDivElement>(null)

    // Function to handle scrolling
    const handleScrollToDiv = () => {
        if (targetDivRef.current) {
            targetDivRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            })
        }
    }

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
        pardotProps,
        cardProps,
        ctaTitle,
        bodyDocument,
        eyebrow,
        eyebrowLinkProps,
        introductionDocument,
        headerContentColor,
        headerBackgroundTreatment,
        headerHideCta,
        bottomComponentsProps,
        relatedCardsProps,
        __tempPardotThankYouUrl,
        pardotForm,
    } = pageProps

    const ctaText = ctaTitle || pardotProps?.cta || 'Get in Touch'

    return (
        <>
            {seoProps && <Seo {...seoProps} />}
            <ThoughtHeader
                contentColor={headerContentColor}
                title={title}
                eyebrow={eyebrow}
                eyebrowLinkProps={eyebrowLinkProps}
                bodyDocument={introductionDocument}
                cardProps={cardProps}
                renderBelow={() => (
                    <>
                        {/* 
                            - User has not explicitly removed header CTA from page
                            - Pardot props exist;
                        */}
                        {!headerHideCta &&
                            pardotProps &&
                            !(pardotForm && pardotForm.formHandler) && (
                                <PardotDynamic
                                    {...pardotProps}
                                    displayStyle="button"
                                    cta={ctaText}
                                />
                            )}

                        {!headerHideCta &&
                            pardotForm &&
                            pardotForm.formHandler && (
                                <Button onClick={handleScrollToDiv}>
                                    {ctaText}
                                </Button>
                            )}
                    </>
                )}
                backgroundTreatment={headerBackgroundTreatment}
                // authorsProps={authorsProps}
                // cardProps={cardProps}
                // contentColor={headerContentColor}
                // backgroundMultiMediaProps={backgroundMultiMediaProps}
            />
            {pardotForm.formHandler && (
                <div ref={targetDivRef}>
                    <PardotFormPage
                        {...pardotForm}
                        formHandler={pardotForm.formHandler}
                        fields={pardotForm.fields}
                        description={pardotForm.description}
                    />
                </div>
            )}
            <Box
                maxWidth={1170 + 200}
                marginHorizontal={'auto'}
                paddingHorizontal={15}
                paddingHorizontalMd={50}
                paddingHorizontalLg={100}
                marginBottom={100}
            >
                <Composition
                    templateColsLgOnly="minmax(30px, auto)  auto"
                    templateColsMd="minmax(30px, auto)  minmax(500px, 700px)"
                    gapRow={60}
                    gapRowLg={100}
                    gapColXs={30}
                    gapColLg={60}
                >
                    <Sidebar
                        multiMediaProps={multiMediaProps}
                        title={title}
                        pardotProps={pardotProps}
                        ctaText={ctaText}
                    />
                    <RichText>
                        {contentfulRichTextToReact(bodyDocument)}
                    </RichText>
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

                    {pardotProps && (
                        <s.MobileBottomPardot>
                            <PardotDynamic
                                {...pardotProps}
                                displayStyle="button"
                            />
                        </s.MobileBottomPardot>
                    )}

                    {__tempPardotThankYouUrl && (
                        <PreviewOnly>
                            <>
                                <Link href={__tempPardotThankYouUrl}>
                                    Preview only: Link to Thank You Page
                                </Link>
                            </>
                        </PreviewOnly>
                    )}
                </Composition>
            </Box>

            {/* Bottom components */}
            {bottomComponentsProps && (
                <Components
                    componentsProps={bottomComponentsProps}
                    removeFirstLastSpacing={true}
                />
            )}

            {/* Related cards */}
            {relatedCardsProps && (
                <RootComponent
                    container={true}
                    background={{
                        backgroundColor: BackgroundColors.Sand,
                    }}
                >
                    <CardsList
                        cardsProps={relatedCardsProps}
                        layout={CardsListLayouts.Offset}
                        headerProps={{
                            variant: 'Header3',
                            title: 'Related ',
                        }}
                    />
                </RootComponent>
            )}
        </>
    )
}

const PreviewOnly = ({ children }) => {
    const previewData = useClientSafePreviewData()
    if (previewData.__isPreview) {
        return <>{children}</>
    }
    return null
}

interface SidebarProps {
    multiMediaProps: MultiMediaProps
    title: string
    pardotProps?: PardotProps
    ctaText?: string
}
const Sidebar: FC<SidebarProps> = ({
    multiMediaProps,
    title,
    pardotProps,
    ctaText,
}) => {
    const sidebarRef = useRef<HTMLDivElement>()
    const [isImageInSidebar, setIsImageInSidebar] = useState(false)
    const { scrollY } = useScroll()

    useEffect(
        () =>
            scrollY.on('change', (v) => {
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

                {pardotProps && (
                    <s.SidebarPardot>
                        <PardotDynamic
                            {...pardotProps}
                            displayStyle="button"
                            cta={ctaText}
                        />
                    </s.SidebarPardot>
                )}
            </s.StickySidebar>
        </s.Sidebar>
    )
}
