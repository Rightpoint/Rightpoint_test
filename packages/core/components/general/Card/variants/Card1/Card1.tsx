import { FC } from 'react'
import { CardBase, CardContentBox, CardMedia } from '../CardBase'
import { CardStyles as s } from '../../Card.styles'
import type { CardProps } from '../../Card.component'
import { FontWeights } from '@rightpoint/core/styles'
import { typography } from '@rightpoint/core/styles'
import { Link } from '../../../Link/Link.component'
import { contentfulRichTextToReact } from '../../../RichText/contentful-rich-text-to-react'

export const Card1: FC<CardProps> = ({
    date,
    title,
    body,
    bodyRichTextDocument,
    multiMediaProps,
    tagsProps,
    linkProps,
    as,
}) => {
    return (
        <CardBase title={title} linkProps={linkProps} as={as}>
            <CardMedia
                multiMediaProps={multiMediaProps}
                tagsProps={tagsProps}
            />
            <CardContentBox>
                {(title || body || bodyRichTextDocument) && (
                    <s.Caption>
                        {`${title} \u2013 `}
                        {/* emdash */}
                        <span>
                            {(bodyRichTextDocument &&
                                contentfulRichTextToReact(
                                    bodyRichTextDocument
                                )) ||
                                body}
                        </span>
                    </s.Caption>
                )}
                {linkProps && <s.Link>{linkProps.text}</s.Link>}
            </CardContentBox>
        </CardBase>
    )
}
