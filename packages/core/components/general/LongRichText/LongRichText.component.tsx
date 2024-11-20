import { FC, ReactNode } from 'react'
import { RichText } from '../RichText/RichText.component'
import { LongRichTextStyles as s } from './LongRichText.styles'

export interface LongRichTextProps {
    text: ReactNode
}

export const LongRichText: FC<LongRichTextProps> = (props) => {
    return <RichText body={props.text} />
}
