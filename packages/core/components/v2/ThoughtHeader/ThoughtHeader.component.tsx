import { Document } from '@contentful/rich-text-types'
import { motion, useInView } from 'framer-motion'
import { FC, ReactNode, useRef } from 'react'
import { Card, CardProps } from '../../general/Card/Card.component'
import {
    MultiMedia,
    MultiMediaProps,
} from '../../general/MultiMedia/MultiMedia.component'
import { contentfulRichTextToReact } from '../../general/RichText/contentful-rich-text-to-react'
import {
    ContentColors,
    getContentColorStyles,
} from '../../layout/RootComponent/background-color'
import { ThoughtHeaderStyles as s } from './ThoughtHeader.styles'

export interface ThoughtHeaderProps {
    eyebrow?: string
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

    return (
        <s.ThoughtHeader
            ref={ref}
            style={{
                ...getContentColorStyles({
                    // if no background media found, use dark color text
                    contentColor: backgroundMediaProps
                        ? contentColor
                        : ContentColors.Dark,
                }),
            }}
            // default color is white
            data-background-vars={contentColor || ContentColors.Light}
            as={motion.div}
        >
            <s.MaxWidth>
                <s.Content>
                    <s.EyeBrow>{eyebrow || cardProps?.date}</s.EyeBrow>
                    <s.Title>{title}</s.Title>
                    {authors && <s.Authors>{authors}</s.Authors>}
                    <s.Body>
                        {bodyNode || contentfulRichTextToReact(bodyDocument)}
                    </s.Body>
                    {renderBelow && renderBelow()}
                </s.Content>
                <s.Card>
                    <Card {...cardProps} />
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
