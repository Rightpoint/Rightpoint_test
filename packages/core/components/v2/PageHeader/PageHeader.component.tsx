import { Document } from '@contentful/rich-text-types'
import { FC, ReactNode, useRef } from 'react'
import { ImageProps } from '../../general/Image/Image.component'
import { Link, LinkProps } from '../../links/Link/Link.component'
import {
    MultiMedia,
    MultiMediaProps,
} from '../../general/MultiMedia/MultiMedia.component'
import { contentfulRichTextToReact } from '../../general/RichText/contentful-rich-text-to-react'
import { PageHeaderStyles as s } from './PageHeader.styles'
import {
    BackgroundColors,
    ContentColors,
    getBackgroundColorAttributesAndStyles,
    getBackgroundColorHex,
} from '../../layout/RootComponent/background-color'
import { motion, useInView } from 'framer-motion'
import { LinksList } from '../../links/LinksList/LinksList.component'
import { OverlappedMedia } from './components/OverlappedMedia/OverlappedMedia'
import {
    ContainerBox,
    ContainerWidths,
} from '../../layout/RootComponent/container'
import { Header, HeaderProps } from '../Header/Header.component'
import { MainTitle } from './components/MainTitle'
import { MultiMediaContextProvider } from '../../general/MultiMedia/MultiMedia.context'

/**
 * Above Page Header area.
 *
 * Eyebrow on left, sometimes links on right.
 *
 * TODO: Render arbitrary components such as a MultiMedia, or DynamicComponent - Solutions Graphic
 * - Note that the main title has a lot of padding, which must be removed if adding custom content.
 */
interface AboveProps {
    eyebrow?: string
    renderAbove?: (...args: any[]) => ReactNode
    aboveTitleDocument?: Document
}
const Above: FC<AboveProps> = ({
    eyebrow,
    renderAbove,
    aboveTitleDocument,
}) => {
    return (
        <s.Above data-cursor-text="Scroll">
            <s.Eyebrow>{eyebrow}</s.Eyebrow>
            <s.AboveContent>{renderAbove && renderAbove()}</s.AboveContent>
        </s.Above>
    )
}

const Below = ({ children }) => {
    return <>{children}</>
}

export interface PageHeaderProps {
    eyebrow?: string
    imageProps?: ImageProps
    backgroundMultiMediaProps?: MultiMediaProps
    backgroundTreatment?: string

    // support old media not specifically designed for component (old work)
    legacyBackgroundFallback?: boolean

    aboveTitleDocument?: Document
    title: string
    subtitle?: string | Document
    introEyebrow?: string
    introductionDocument?: Document

    /**
     * @deprecated - maybe not needed.
     */
    ctaLinkProps?: LinkProps

    headerProps?: HeaderProps

    linksHeader?: string
    linksProps?: LinkProps[]

    // custom render function for outliers like Solutions which has larger text
    renderAbove?: () => ReactNode
    renderBelow?: () => ReactNode

    backgroundColor?: BackgroundColors
    contentColor?: ContentColors

    bottomMultiMediaProps?: MultiMediaProps

    styledProps?: {
        PageHeader?: Record<string, any>
    }

    /**
     * For exceptional scenarios like one offs on the Contact page.
     * Do not use this pattern lightly.
     */
    json?: {
        variant: ''
    }
}

export const PageHeader: FC<PageHeaderProps> = (props) => {
    const {
        eyebrow,
        renderAbove,
        aboveTitleDocument,

        title,
        introEyebrow,
        subtitle,
        backgroundMultiMediaProps,
        backgroundTreatment,

        headerProps,
        legacyBackgroundFallback,

        introductionDocument,
        ctaLinkProps,

        linksHeader,
        linksProps,
        renderBelow,

        backgroundColor,
        contentColor,

        bottomMultiMediaProps,

        styledProps,
    } = props

    const contentColorResult = contentColor || ContentColors.Dark
    const backgroundColorResult = backgroundColor || BackgroundColors.None

    const backgroundColorHex = getBackgroundColorHex({
        backgroundColor,
    })

    return (
        <>
            <s.PageHeader
                {...styledProps?.PageHeader}
                /**
                 * Manually mark this component as having a background color
                 */
                {...getBackgroundColorAttributesAndStyles({
                    backgroundColor: backgroundColorResult,
                    contentColor: contentColorResult,
                })}
            >
                {/* background media */}
                {backgroundMultiMediaProps && (
                    <BackgroundMedia
                        {...{
                            legacyBackgroundFallback,
                            contentColor,
                            backgroundColorHex,
                            backgroundMultiMediaProps,
                        }}
                    />
                )}

                {/* element places content above background */}
                <s.AboveBackground
                    key={title}
                    as={motion.div}
                    initial={{
                        opacity: 0,
                        y: 10,
                    }}
                    animate={{
                        opacity: 1,
                        y: 0,
                        transition: {
                            delay: 0.5,
                            ease: [0.07, 0.61, 0.44, 0.87],
                        },
                    }}
                >
                    <ContainerBox container={ContainerWidths.Default}>
                        {/* eyebrow and content at the very top of the page  */}
                        <Above
                            {...{ eyebrow, renderAbove, aboveTitleDocument }}
                        />

                        {/* title area */}
                        {headerProps ? (
                            <Header {...headerProps} />
                        ) : (
                            <MainTitle {...props} />
                        )}

                        {/* eyebrow to the intro section (subtitle, body) */}
                        {introEyebrow && (
                            <s.IntroEyebrow>{introEyebrow}</s.IntroEyebrow>
                        )}

                        {/* this is the serif style */}
                        {subtitle && (
                            <s.Subtitle>
                                {contentfulRichTextToReact(subtitle)}
                            </s.Subtitle>
                        )}

                        {/* body content on left, optional links on right */}
                        <s.BodyAndLinks>
                            <s.Introduction>
                                {contentfulRichTextToReact(
                                    introductionDocument
                                )}

                                {ctaLinkProps && (
                                    <s.Cta>
                                        <Link {...ctaLinkProps} asButton />
                                    </s.Cta>
                                )}
                            </s.Introduction>

                            {linksProps && linksProps.length > 0 && (
                                <LinksList
                                    title={linksHeader}
                                    linksProps={linksProps}
                                />
                            )}
                        </s.BodyAndLinks>

                        {renderBelow && <Below>{renderBelow()}</Below>}

                        {/* sometimes, page headers have an overflowed bottom edge */}
                    </ContainerBox>
                </s.AboveBackground>
            </s.PageHeader>

            {bottomMultiMediaProps && (
                <OverlappedMedia
                    multiMediaProps={bottomMultiMediaProps}
                    backgroundColor={backgroundColor}
                />
            )}
        </>
    )
}

interface BackgroundMediaProps {
    legacyBackgroundFallback: boolean
    contentColor: ContentColors
    backgroundColorHex: string
    backgroundMultiMediaProps: MultiMediaProps
}
const BackgroundMedia: FC<BackgroundMediaProps> = ({
    legacyBackgroundFallback,
    contentColor,
    backgroundColorHex,
    backgroundMultiMediaProps,
}) => {
    const ref = useRef()
    const isInView = useInView(ref, {
        once: false,
    })

    return (
        <s.Background
            ref={ref}
            $legacyBackgroundFallback={legacyBackgroundFallback}
            data-hint={legacyBackgroundFallback ? 'legacy' : undefined}
            // $treatmentLevel={backgroundTreatment} // this isn't working as well in this case;
            $isInView={isInView}
            $contentColor={contentColor ?? ContentColors.Dark}
            $backgroundColorHex={backgroundColorHex}
        >
            <MultiMediaContextProvider imagePriority>
                <MultiMedia {...backgroundMultiMediaProps} />
            </MultiMediaContextProvider>
        </s.Background>
    )
}
