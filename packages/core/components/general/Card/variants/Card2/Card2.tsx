import { CardBase, CardContentBox, CardMedia } from '../CardBase'
import { CardStyles as s } from '../../Card.styles'

import { FontWeights, typography } from '@rightpoint/core/styles'
import { FC } from 'react'
import type { CardProps } from '../../Card.component'
import { Link } from '../../../Link/Link.component'
import { contentfulRichTextToReact } from '../../../RichText/contentful-rich-text-to-react'

export const Card2: FC<CardProps> = ({
    date,
    title,
    body,
    bodyRichTextDocument,
    multiMediaProps,
    tagsProps,
    linkProps,
}) => {
    return (
        <CardBase title={title} linkProps={linkProps}>
            <CardMedia
                multiMediaProps={multiMediaProps}
                tagsProps={tagsProps}
            />
            <CardContentBox>
                {date && <s.DateLine>{date}</s.DateLine>}
                {title && (
                    <s.Title $fontWeight={FontWeights.Normal}>{title}</s.Title>
                )}
                {(body || bodyRichTextDocument) && (
                    <s.Body as={typography.H4} $fontFamily="serif">
                        {(bodyRichTextDocument &&
                            contentfulRichTextToReact(bodyRichTextDocument)) ||
                            body}
                    </s.Body>
                )}
                {linkProps && (
                    <s.Link>
                        {linkProps.text}
                        {/* <Link {...linkProps} /> */}
                    </s.Link>
                )}
            </CardContentBox>
        </CardBase>
    )
}
