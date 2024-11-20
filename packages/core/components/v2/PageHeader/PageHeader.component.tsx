import { Document } from '@contentful/rich-text-types'
import { FC, ReactNode, useMemo, useRef } from 'react'
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
import { ScrollAnimation } from '../../animation/ScrollAnimation'
import { Surface } from '../../animation/Surface/Surface'
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

    const aboveElement = useMemo(
        () => <Above {...{ eyebrow }}>{renderAbove && renderAbove()}</Above>,
        [renderAbove]
    )
    const belowElement = useMemo(
        () => renderBelow && <Below>{renderBelow()}</Below>,
        [renderBelow]
    )

    const introductionElement = useMemo(
        () => contentfulRichTextToReact(introductionDocument),
        [introductionDocument]
    )

    return (
        <>
            <ScrollAnimation
                scrollHeight={'150vh'}
                style={{ overflow: 'hidden' }}
            >
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
                        <Surface
                            style={{
                                position: 'absolute',
                                left: 0,
                                right: 0,
                                top: 0,
                                bottom: '-100%',
                            }}
                            animation={{
                                scrollOffset: ['start start', 'end start'],
                                initial: {
                                    translateY: '0%',
                                },
                                final: {
                                    translateY: '50%',
                                },
                            }}
                        >
                            <s.Background
                                $legacyBackgroundFallback={
                                    legacyBackgroundFallback
                                }
                                // $treatmentLevel={backgroundTreatment} // this isn't working as well in this case;
                                $contentColor={
                                    contentColor ?? ContentColors.Dark
                                }
                                $isInView={isInView}
                            >
                                <MultiMedia {...backgroundMultiMediaProps} />
                            </s.Background>
                        </Surface>
                    )}

                    <s.AboveBackground>
                        <Surface
                            animation={{
                                scrollOffset: ['start start', 'end start'],

                                initial: {
                                    translateY: '10%',
                                    scrollProgress: 0,
                                },
                                final: {
                                    translateY: '-10%',
                                    scrollProgress: 0.25,
                                },
                            }}
                        >
                            {aboveElement}
                            <Main>
                                <s.Title>{title}</s.Title>
                            </Main>
                            {introEyebrow && (
                                <s.IntroEyebrow>{introEyebrow}</s.IntroEyebrow>
                            )}
                            <s.Subtitle>{subtitle}</s.Subtitle>
                            <s.BodyAndLinks>
                                <s.Introduction>
                                    {introductionElement}
                                </s.Introduction>
                                {hasLinks && (
                                    <LinksList
                                        title={linksHeader}
                                        linksProps={linksProps}
                                    />
                                )}
                            </s.BodyAndLinks>
                            {belowElement}
                        </Surface>
                    </s.AboveBackground>
                </s.PageHeader>
            </ScrollAnimation>
        </>
    )
}
