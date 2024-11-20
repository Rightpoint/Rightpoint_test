import { Document } from '@contentful/rich-text-types'
import { FC, ReactNode } from 'react'
import { Image, ImageProps } from '../../general/Image/Image.component'
import { LinkProps } from '../../general/Link/Link.component'
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
    return (
        <>
            <s.PageHeader
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
                            <s.Links>
                                <s.LinksHeader>{linksHeader}</s.LinksHeader>
                                {linksProps?.map((linkProps) => (
                                    <s.Link>
                                        <NextLink href={linkProps.href}>
                                            {linkProps.text}
                                        </NextLink>
                                    </s.Link>
                                ))}
                            </s.Links>
                        )}
                    </s.BodyAndLinks>
                    {renderBelow && <Below>{renderBelow()}</Below>}
                </s.AboveBackground>
            </s.PageHeader>
        </>
    )
}
