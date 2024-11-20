import { ComponentType, FC } from 'react'
import { MultiMediaProps } from '../MultiMedia/MultiMedia.component'
import { type CardTagProps } from './card-variants/CardTags'
import { Card1 } from './card-variants/Card1/Card1'
import { Card2 } from './card-variants/Card2/Card2'
import { CardFullWidth } from './card-variants/CardFulIWidth/CardFullWidth'
import { LinkProps } from '../../links/Link/Link.component'
import { Document } from '@contentful/rich-text-types'
import { CursorControlProps } from '../Cursor/Cursor.component'

/**
 * It is important to ensure this card component can be placed in many other
 * layouts/components, especially over time, with arbitrary differences between children.
 */
export enum CardVariants {
    Default = 'Default',
    Card1 = 'Card1',
    Card2 = 'Card2',
    CardFullWidth = 'CardFullWidth',
}

const CardVariantMap: Record<CardVariants, FC<CardProps>> = {
    [CardVariants.Default]: Card1,
    [CardVariants.Card1]: Card1,
    [CardVariants.Card2]: Card2,
    [CardVariants.CardFullWidth]: CardFullWidth,
}

export interface CardProps {
    variant?: CardVariants

    multiMediaProps?: MultiMediaProps

    title?: string

    /**
     * Used manually not via CMS
     */
    subtitle?: string

    body?: string
    bodyRichTextDocument?: Document

    linkProps?: LinkProps

    date?: string

    as?: string | ComponentType<any>

    tagsProps?: CardTagProps[]
}

const getComponent = ({ variant = '' }) => {
    switch (variant) {
        case CardVariants.Card1:
            return CardVariantMap[CardVariants.Card1]
        case CardVariants.Card2:
            return CardVariantMap[CardVariants.Card2]
        case CardVariants.CardFullWidth:
            return CardVariantMap[CardVariants.CardFullWidth]
        default:
            return CardVariantMap[CardVariants.Default]
    }
}

export const Card: FC<CardProps> = (props) => {
    const Component = getComponent(props)

    return <Component {...props} />
}
