import { FC, ReactNode } from 'react'
import { RichTextStyles as s } from './RichText.styles'
import { CSSProperties } from 'styled-components'

export interface RichTextProps {
    body?: ReactNode
    className?: string
    style?: CSSProperties
    children?: ReactNode
}

export const RichText: FC<RichTextProps> = ({
    body,
    children,
    className,
    style,
}) => {
    return (
        <s.RichText className={className} style={style}>
            {body || children}
        </s.RichText>
    )
}
