import { FC } from 'react'
import { contentfulRichTextToReact } from '../../general/RichText/contentful-rich-text-to-react'
import { RichText } from '../../general/RichText/RichText.component'
import { SimpleContentStyles as s } from './SimpleContent.styles'
import type { Document } from '@contentful/rich-text-types'
import {
    MultiMedia,
    MultiMediaProps,
} from '../../general/MultiMedia/MultiMedia.component'
import { Header, HeaderProps } from '../Header/Header.component'

export interface SimpleContentProps {
    headerProps?: HeaderProps
    multiMediaProps?: MultiMediaProps
    content?: Document
    textAlign?: string
}

export const SimpleContent: FC<SimpleContentProps> = ({
    headerProps,
    multiMediaProps,
    content,
    textAlign,
}) => {
    return (
        <s.SimpleContent $textAlign={textAlign}>
            {headerProps && <Header {...headerProps} />}
            {multiMediaProps && (
                <s.Media>
                    <MultiMedia {...multiMediaProps} />
                </s.Media>
            )}
            {content && (
                <s.RichText>
                    <RichText>{contentfulRichTextToReact(content)}</RichText>
                </s.RichText>
            )}
        </s.SimpleContent>
    )
}
