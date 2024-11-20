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
    titleSegments,
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
                {(title ||
                    body ||
                    bodyRichTextDocument ||
                    !isEmpty(titleSegments)) && (
                    <s.Caption>
                        {/* 
                            This card is a short form version that displays with unique text and colors.
                            If provided, it is used in place of the title/body fallback.

                            If there is a need to add links to the title (Work - <Case Study Title>), then
                            an object may be provided in place of text and checked for here.
                        */}
                        {titleSegments &&
                            titleSegments.map((segment, index) => {
                                return (
                                    <span key={index}>
                                        {index !== 0 && ' \u2013 '}
                                        {segment}
                                    </span>
                                )
                            })}

                        {!titleSegments &&
                            [title, body].filter(Boolean).join(' \u2013 ')}
                    </s.Caption>
                )}
                {/* {linkProps && <s.Link>{linkProps.text}</s.Link>} */}
            </CardContentBox>
        </CardBase>
    )
}
