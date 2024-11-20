import { Document } from '@contentful/rich-text-types'
import { FC, ReactNode, useRef } from 'react'
import { Image, ImageProps } from '../../general/Image/Image.component'
import { LinkProps } from '../../links/Link/Link.component'
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
import { useInView } from 'framer-motion'
import { LinksList } from '../../links/LinksList/LinksList.component'
import { OverlappedMedia } from './components/OverlappedMedia/OverlappedMedia'
import {
    ContainerBox,
    Containers,
    ContainerWidths,
} from '../../layout/RootComponent/container'
import { dataAttributes } from '@rightpoint/core/variables'

/**
 * Above Page Header area.
 *
 * Eyebrow on left, sometimes links on right.
 */
const Above = ({ eyebrow, renderAbove }) => {
    return (
        <s.Above>
            <s.Eyebrow>{eyebrow}</s.Eyebrow>
            <s.AboveContent>{renderAbove && renderAbove()}</s.AboveContent>
        </s.Above>
    )
}

const Below = ({ children }) => {
    return <div>{children}</div>
}

export interface PageHeaderProps {
    eyebrow?: string
    imageProps?: ImageProps
    backgroundMultiMediaProps?: MultiMediaProps
    backgroundTreatment?: string

    // support old media not specifically designed for component (old work)
    legacyBackgroundFallback?: boolean

    title: string
    subtitle?: string | Document
    introEyebrow?: string
    introductionDocument?: Document

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
}

export const PageHeader: FC<PageHeaderProps> = ({
    eyebrow,
    renderAbove,
    title,
    introEyebrow,
    subtitle,
    backgroundMultiMediaProps,
    backgroundTreatment,

    legacyBackgroundFallback,

    introductionDocument,

    linksHeader,
    linksProps,
    renderBelow,

    backgroundColor,
    contentColor,

    bottomMultiMediaProps,

    styledProps,
}) => {
    const ref = useRef()
    const isInView = useInView(ref, {
        once: false,
    })

    const contentColorResult = contentColor || ContentColors.Dark
    const backgroundColorResult = backgroundColor || BackgroundColors.None

    const backgroundColorHex = getBackgroundColorHex({
        backgroundColor,
    })

    return (
        <>
            <s.PageHeader
                {...{ [dataAttributes.cursorText.attribute]: 'Scroll' }}
                ref={ref}
                {...styledProps?.PageHeader}
                /**
                 * Manually mark this component as having a background color
                 */
                {...getBackgroundColorAttributesAndStyles({
                    backgroundColor: backgroundColorResult,
                    contentColor: contentColorResult,
                })}
            >
                {backgroundMultiMediaProps && (
                    <s.Background
                        $legacyBackgroundFallback={legacyBackgroundFallback}
                        data-hint={
                            legacyBackgroundFallback ? 'legacy' : undefined
                        }
                        // $treatmentLevel={backgroundTreatment} // this isn't working as well in this case;
                        $isInView={isInView}
                        $contentColor={contentColor ?? ContentColors.Dark}
                        $backgroundColorHex={backgroundColorHex}
                    >
                        <MultiMedia {...backgroundMultiMediaProps} />
                    </s.Background>
                )}

                <s.AboveBackground>
                    <ContainerBox container={ContainerWidths.Default}>
                        {/* eyebrow at the very top of the page  */}
                        <Above {...{ eyebrow, renderAbove }} />

                        <s.Main>
                            <s.Title>{title}</s.Title>
                        </s.Main>

                        {/* eyebrow to the intro section (subtitle, body) */}
                        {introEyebrow && (
                            <s.IntroEyebrow>{introEyebrow}</s.IntroEyebrow>
                        )}
                        {/* this is the serif style */}
                        <s.Subtitle>
                            {contentfulRichTextToReact(subtitle)}
                        </s.Subtitle>

                        {/* body content on left, optional links on right */}
                        <s.BodyAndLinks>
                            <s.Introduction>
                                {contentfulRichTextToReact(
                                    introductionDocument
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
