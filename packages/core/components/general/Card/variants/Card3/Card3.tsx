import { Box } from 'atomic-layout'
import { CardBase, CardContentBox, CardMedia } from '../CardBase'
import { Card3Styles as s } from './Card3.styles'
import { CardStyles } from '../../Card.styles'
import type { CardProps } from '../../Card.component'
import { FC } from 'react'
import { Link } from '../../../Link/Link.component'
import { typography } from '@rightpoint/core/styles'
import { contentfulRichTextToReact } from '../../../RichText/contentful-rich-text-to-react'

export const Card3: FC<CardProps> = ({
    date,
    title,
    body,
    bodyRichTextDocument,
    multiMediaProps,
    tagsProps,
    linkProps,
}) => {
    return (
        <CardBase title={title} linkProps={linkProps} as={s.Card3}>
            <CardMedia
                multiMediaProps={multiMediaProps}
                tagsProps={tagsProps}
            />
            <CardContentBox>
                {date && <CardStyles.DateLine>{date}</CardStyles.DateLine>}
                {title && (
                    <CardStyles.Title $fontFamily="serif">
                        {title}
                    </CardStyles.Title>
                )}
                {(body || bodyRichTextDocument) && (
                    <CardStyles.Body>
                        {(bodyRichTextDocument &&
                            contentfulRichTextToReact(bodyRichTextDocument)) ||
                            body}
                    </CardStyles.Body>
                )}
                {linkProps && (
                    <CardStyles.Link>
                        {linkProps.text}
                        {/* <Link {...linkProps} /> */}
                    </CardStyles.Link>
                )}
            </CardContentBox>
        </CardBase>
    )
}
