import { FC } from 'react'
import { CardBase, CardContentBox, CardMedia } from '../CardBase'
import { CardStyles as s } from '../../Card.styles'
import type { CardProps } from '../../Card.component'
import { FontWeights } from '@rightpoint/core/styles'
import { typography } from '@rightpoint/core/styles'
import { Link } from '../../../Link/Link.component'
import { contentfulRichTextToReact } from '../../../RichText/contentful-rich-text-to-react'
import { isEmpty } from 'lodash'

export const Card1: FC<CardProps> = ({
    date,
    title,
    subtitle,
    body,
    bodyRichTextDocument,
    multiMediaProps,
    tagsProps,
    linkProps,
    as,
}) => {
    return (
        <CardBase {...{ title, linkProps, as }}>
            <CardMedia
                multiMediaProps={multiMediaProps}
                tagsProps={tagsProps}
            />
            <CardContentBox>
                {(title || body || bodyRichTextDocument || subtitle) && (
                    <s.Caption>
                        {/* 
                            This card is a short form version that displays with unique text and colors.
                        */}
                        {title && <span>{title}</span>}

                        {/* span is used to color the 2nd segment separately */}
                        {subtitle && (
                            <span>
                                {' \u2013 '}
                                {subtitle}
                            </span>
                        )}
                    </s.Caption>
                )}
                {/* {linkProps && <s.Link>{linkProps.text}</s.Link>} */}
            </CardContentBox>
        </CardBase>
    )
}
