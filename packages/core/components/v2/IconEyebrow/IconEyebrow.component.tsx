import { FC } from 'react'
import { IconEyebrowStyles as s } from './IconEyebrow.styles'
import { icons } from '@rightpoint/core/styles'

export interface IconEyebrowProps {
    text: string
}

export const IconEyebrow: FC<IconEyebrowProps> = ({ text }) => {
    return (
        text && (
            <s.IconEyebrow>
                <icons.BrandIcon />
                {text}
            </s.IconEyebrow>
        )
    )
}
