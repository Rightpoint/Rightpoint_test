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
import NextLink from 'next/link'
import {
    BackgroundColors,
    ContentColors,
    getBackgroundColorStyles,
    getContentColorStyles,
} from '../../layout/RootComponent/background-color'
import { useInView } from 'framer-motion'
import { LinksList } from '../../links/LinksList/LinksList.component'
/**
 * The big question is, should we separate this component?
 */
const Above = ({ eyebrow }) => {
    return (
        <s.Above>
            <s.Eyebrow>{eyebrow}</s.Eyebrow>
        </s.Above>
    )
}

const Main = ({ children }) => {
    return <s.Main>{children}</s.Main>
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
    subtitle?: string
    introEyebrow?: string
    introductionDocument?: Document

    linksHeader?: string
    linksProps?: LinkProps[]

    // custom render function for outliers like Solutions which has larger text
    renderAbove?: () => ReactNode
    renderBelow?: () => ReactNode

    backgroundColor?: BackgroundColors
    contentColor?: ContentColors
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
}) => {
    const hasLinks = linksProps && linksProps.length > 0

    const ref = useRef()
    const isInView = useInView(ref, {
        once: false,
    })

    return (
        <>
            <s.PageHeader
                ref={ref}
                data-background-vars
                style={{
                    ...getBackgroundColorStyles({
                        backgroundColor: backgroundMultiMediaProps
                            ? BackgroundColors.Black
                            : BackgroundColors.None,
                    }),
                    ...getContentColorStyles({
                        // if no background media found, use dark color text
                        contentColor: contentColor ?? ContentColors.Dark,
                    }),
                }}
            >
                {backgroundMultiMediaProps && (
                    <s.Background
                        $legacyBackgroundFallback={legacyBackgroundFallback}
                        // $treatmentLevel={backgroundTreatment} // this isn't working as well in this case;
                        $contentColor={contentColor ?? ContentColors.Dark}
                        $isInView={isInView}
                    >
                        <MultiMedia {...backgroundMultiMediaProps} />
                    </s.Background>
                )}

                <s.AboveBackground>
                    <Above {...{ eyebrow }} />
                    <Main>
                        <s.Title>{title}</s.Title>
                    </Main>
                    {introEyebrow && (
                        <s.IntroEyebrow>{introEyebrow}</s.IntroEyebrow>
                    )}
                    <s.Subtitle>{subtitle}</s.Subtitle>
                    <s.BodyAndLinks>
                        <s.Introduction>
                            {contentfulRichTextToReact(introductionDocument)}
                        </s.Introduction>
                        {hasLinks && (
                            <LinksList
                                title={linksHeader}
                                linksProps={linksProps}
                            />
                        )}
                    </s.BodyAndLinks>
                    {renderBelow && <Below>{renderBelow()}</Below>}
                </s.AboveBackground>
            </s.PageHeader>
        </>
    )
}
