import { CardBase, CardContentBox, CardMedia } from '../CardBase'
import { CardStyles as s } from '../../Card.styles'
import { useScrollAnimation } from '../../../Animation/Animation.component'
import type { FC } from 'react'
import type { CardProps } from '../../Card.component'

/**
 * CardFullWidth is a full-width representation of a page, used in list pages
 * like the Thought List, or Landing Page lists.
 */
export const CardFullWidth: FC<CardProps> = ({
    date,
    title,
    subtitle,
    body,
    multiMediaProps,
    tagsProps,
    linkProps,
}) => {
    const { Animation } = useScrollAnimation({
        lessMovement: true,
    })
    return (
        <CardBase title={title} linkProps={linkProps} as={s.CardFullWidth.Root}>
            <CardMedia
                multiMediaProps={multiMediaProps}
                tagsProps={tagsProps}
                naturalAspect={true} // aka auto
            />
            <Animation>
                <s.CardFullWidth.Content>
                    <s.CardFullWidth.TopContent>
                        {title && (
                            <s.CardFullWidth.Title as={'h3'}>
                                {title}
                            </s.CardFullWidth.Title>
                        )}
                        {subtitle && (
                            <s.CardFullWidth.Subtitle>
                                {subtitle}
                            </s.CardFullWidth.Subtitle>
                        )}

                        {/* This is not used currently; */}
                        {/* {(body || bodyRichTextDocument) && (
                        <s.CardFullWidth.Body>
                            {(bodyRichTextDocument &&
                                contentfulRichTextToReact(
                                    bodyRichTextDocument
                                )) ||
                                body}
                        </s.CardFullWidth.Body>
                    )} */}
                    </s.CardFullWidth.TopContent>
                    {date && (
                        <s.CardFullWidth.DateLine>
                            {date}
                        </s.CardFullWidth.DateLine>
                    )}
                </s.CardFullWidth.Content>
            </Animation>
        </CardBase>
    )
}
