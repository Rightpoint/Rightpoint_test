import { Document } from '@contentful/rich-text-types'
import { FC } from 'react'
import { contentfulRichTextToReact } from '../../general/RichText/contentful-rich-text-to-react'
import { RichText } from '../../general/RichText/RichText.component'
import { Link, LinkProps } from '../../links/Link/Link.component'
import { SimpleCtaStyles as s } from './SimpleCta.styles'

export interface SimpleCtaProps {
    title?: string
    content?: Document
    linkProps?: LinkProps
}

export const SimpleCta: FC<SimpleCtaProps> = ({
    title,
    content,
    linkProps,
}) => {
    return (
        <s.SimpleCta>
            <s.Title>{title}</s.Title>
            {content && (
                <s.Content>
                    <RichText>{contentfulRichTextToReact(content)}</RichText>
                </s.Content>
            )}
            {linkProps && (
                <s.Cta>
                    <Link {...linkProps} asButton />
                </s.Cta>
            )}
        </s.SimpleCta>
    )
}
