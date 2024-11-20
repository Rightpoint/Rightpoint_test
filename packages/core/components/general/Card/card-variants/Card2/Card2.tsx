import { CardBase, CardContentBox, CardMedia } from '../CardBase'
import { CardStyles as s } from '../../Card.styles'
import { FC } from 'react'
import type { CardProps } from '../../Card.component'
import { contentfulRichTextToReact } from '../../../RichText/contentful-rich-text-to-react'

/**
 * Card2 is used in the Solutions pages and highlights the Title more
 * conspicuously from the body.
 */
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
                {title && <s.Card2.Title as={'h3'}>{title}</s.Card2.Title>}
                {(body || bodyRichTextDocument) && (
                    <s.Card2.Body>
                        {(bodyRichTextDocument &&
                            contentfulRichTextToReact(bodyRichTextDocument)) ||
                            body}
                    </s.Card2.Body>
                )}
                {linkProps && (
                    <s.Card2.Link>
                        {linkProps.text}
                        {/* <Link {...linkProps} /> */}
                    </s.Card2.Link>
                )}
            </CardContentBox>
        </CardBase>
    )
}
