import { Document } from '@contentful/rich-text-types'
import { motion, useInView } from 'framer-motion'
import { FC, ReactNode, useRef } from 'react'
import { Card, CardProps } from '../../general/Card/Card.component'
import { Link, LinkProps } from '../../links/Link/Link.component'
import {
    MultiMedia,
    MultiMediaProps,
} from '../../general/MultiMedia/MultiMedia.component'
import { contentfulRichTextToReact } from '../../general/RichText/contentful-rich-text-to-react'
import {
    ContentColors,
    getBackgroundColorAttributesAndStyles,
    getContentColorStyles,
} from '../../layout/RootComponent/background-color'
import { ThoughtHeaderStyles as s } from './ThoughtHeader.styles'
import { dataAttributes } from '@rightpoint/core/variables'

export interface ThoughtHeaderProps {
    eyebrow?: string
    eyebrowLinkProps?: LinkProps
    title: string

    bodyNode?: ReactNode
    bodyDocument?: Document
    cardProps?: CardProps
    authors?: string
    contentColor?: ContentColors
    backgroundMultiMediaProps?: MultiMediaProps
    backgroundTreatment?: string
    renderBelow?: () => ReactNode
}

export const ThoughtHeader: FC<ThoughtHeaderProps> = ({
    eyebrow,
    eyebrowLinkProps,
    title,
    bodyNode,
    bodyDocument,
    cardProps,
    authors,
    contentColor,
    backgroundMultiMediaProps,
    backgroundTreatment,
    renderBelow,
}) => {
    /**
     * Use background multi media if provided, otherwise use card multi media as BG.
     */

    const backgroundMediaProps = backgroundMultiMediaProps
        ? backgroundMultiMediaProps
        : cardProps?.multiMediaProps

    const ref = useRef()
    const isInView = useInView(ref, {
        once: false,
    })

    const getContentColor = (contentColor) => {
        if (!backgroundMediaProps) {
            // if no background media or fallback media, set dark color text (because background is white)
            return ContentColors.Dark
        }
        return contentColor || ContentColors.Light
    }

    const contentColorResult = getContentColor(contentColor)
    return (
        <s.ThoughtHeader
            ref={ref}
            {...getBackgroundColorAttributesAndStyles({
                contentColor: contentColorResult,
            })}
            as={motion.section}
        >
            <s.MaxWidth>
                <s.Content>
                    <s.EyeBrow>
                        {eyebrowLinkProps?.href ? (
                            <Link href={eyebrowLinkProps.href} noDecoration>
                                {eyebrowLinkProps.text}
                            </Link>
                        ) : (
                            eyebrow || cardProps?.date
                        )}
                    </s.EyeBrow>
                    <s.Title>{title}</s.Title>
                    {authors && <s.Authors>{authors}</s.Authors>}
                    <s.Body>
                        {bodyNode || contentfulRichTextToReact(bodyDocument)}
                    </s.Body>
                    {renderBelow && renderBelow()}
                </s.Content>
                <s.Card>
                    <Card {...{ ...cardProps, linkProps: null }} />
                </s.Card>
                <s.Background
                    $isInView={isInView}
                    $treatmentLevel={backgroundTreatment}
                    $contentColor={contentColor || ContentColors.Light}
                    $shouldBlurBackground={Boolean(cardProps?.multiMediaProps)} // blur if using default card background and not a specifically provided one.
                >
                    {backgroundMediaProps && (
                        <MultiMedia {...backgroundMediaProps} />
                    )}
                </s.Background>
            </s.MaxWidth>
        </s.ThoughtHeader>
    )
}
