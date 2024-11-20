import { ComponentType, FC } from 'react'
import { MultiMediaProps } from '../MultiMedia/MultiMedia.component'
import { CardTagProps } from './variants/CardTags'
import { Card1 } from './variants/Card1/Card1'
import { Card2 } from './variants/Card2/Card2'
import { Card3 } from './variants/Card3/Card3'
import { LinkProps } from '../Link/Link.component'
import { Document } from '@contentful/rich-text-types'

/**
 * It is important to ensure this card component can be placed in many other
 * layouts/components, especially over time, with arbitrary differences between children.
 */
export enum CardVariants {
    Default = 'Default',
    Card1 = 'Card1',
    Card2 = 'Card2',
    Card3 = 'Card3',
}

const CardVariantMap: Record<CardVariants, FC<CardProps>> = {
    [CardVariants.Default]: Card1,
    [CardVariants.Card1]: Card1,
    [CardVariants.Card2]: Card2,
    [CardVariants.Card3]: Card3,
}

export interface CardProps {
    variant?: CardVariants

    // card props
    multiMediaProps?: MultiMediaProps
    title?: string
    body?: string
    bodyRichTextDocument?: Document
    date?: string
    linkProps?: LinkProps
    tagsProps?: CardTagProps[]

    as?: string | ComponentType<any>
}

const getComponent = ({ variant = '' }) => {
    switch (variant) {
        case CardVariants.Card1:
            return CardVariantMap[CardVariants.Card1]
        case CardVariants.Card2:
            return CardVariantMap[CardVariants.Card2]
        case CardVariants.Card3:
            return CardVariantMap[CardVariants.Card3]
        default:
            // console.warn('No card variant found', variant)
            return CardVariantMap[CardVariants.Default]
    }
}

export const Card: FC<CardProps> = (props) => {
    const Component = getComponent(props)
    return <Component {...props} />
}
