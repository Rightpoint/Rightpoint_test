import { Document } from '@contentful/rich-text-types'
import { FC } from 'react'
import { Card, CardProps } from '../../general/Card/Card.component'
import { contentfulRichTextToReact } from '../../general/RichText/contentful-rich-text-to-react'
import { Link, LinkProps } from '../../links/Link/Link.component'
import { HorizontalCardsStyles as s } from './HorizontalCards.styles'

export interface HorizontalCardsProps {
    title: string
    content?: string | Document
    cardsProps: CardProps[]
    linkProps?: LinkProps
}

export const HorizontalCards: FC<HorizontalCardsProps> = ({
    title,
    content,
    cardsProps,
    linkProps,
}) => {
    /**
     * If the passed body is a document, convert it to React
     */
    const renderStringOrDocument = (content) => {
        const isRichDocument = (doc: any): doc is Document => {
            return doc?.nodeType === 'document'
        }
        if (isRichDocument(content)) {
            return contentfulRichTextToReact(content)
        }
        return content
    }

    return (
        <s.HorizontalCards>
            <s.content.Root>
                <s.content.Title>{title}</s.content.Title>
                <s.content.Body>
                    {renderStringOrDocument(content)}
                </s.content.Body>
                {linkProps && (
                    <s.content.Cta>
                        <Link {...linkProps} asButton />
                    </s.content.Cta>
                )}
            </s.content.Root>
            <s.Cards>
                {cardsProps?.map((cardProps, index) => (
                    <s.Card key={index}>
                        <Card {...cardProps} key={index} />
                    </s.Card>
                ))}
            </s.Cards>
        </s.HorizontalCards>
    )
}
