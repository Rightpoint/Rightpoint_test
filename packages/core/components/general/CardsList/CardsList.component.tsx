/**
 * This component is used to render an arbitrary list of cards
 * in various different layouts without changing the CMS.
 *
 * For example
 * - If there were large amounts of items, it could render as a Carousel
 * - If there were too few, it could render as a larger more prominent output (v1 requirement)
 */
import { noop } from 'lodash'
import { ComponentType, FC } from 'react'
import {
    Header,
    HeaderProps,
    HeaderVariants,
} from '../../v2/Header/Header.component'
import { Card, CardProps, CardVariants } from '../Card/Card.component'
import { Grid } from '../Grid/Grid.component'
import { Hero, HeroContentWidths } from '../Hero/Hero.component'
import { CardsListStyles as s } from './CardsList.styles'
import { CardsListFullWidthList } from './layouts/CardsListFullWidthList/CardsListFullWidth'
import { CardsListOffset } from './layouts/CardsListOffset/CardsListOffset'
// import { SingleCard } from './layouts/SingleCard/SingleCard'

export const CardsListLayouts = [
    'Default',
    'Grid',
    'Carousel',
    'Offset',
    'FullWidth',
] as const
export type CardsListLayoutTypes = (typeof CardsListLayouts)[number]
export interface CardsListProps {
    title?: string
    cardsProps: CardProps[]
    layout?: CardsListLayoutTypes
    layoutProps?: any
    headerProps?: HeaderProps
}

/**
 * Get layout component and optional card override props.
 *
 * For example, FullWidth cards list only works with CardFullWidth cards.
 */
const getLayoutComponent = (
    layout: CardsListLayoutTypes
): [
    component: ComponentType<any>,
    processCardProps?: (props: CardProps) => CardProps
] => {
    // comment out for V2 (unknown if still relevant)
    // /**
    //  * If there's only one item, use the single card version
    //  */
    // if (cardsProps.length === 1) {
    //     return SingleCard
    // }
    switch (layout) {
        case 'Default':
            return [Grid]
        case 'Grid':
            return [Grid]
        case 'Offset':
            return [CardsListOffset]
        case 'FullWidth':
            return [
                CardsListFullWidthList,
                (cardProps) => ({
                    ...cardProps,
                    variant: CardVariants.CardFullWidth,
                }),
            ]
        default:
            return [Grid]
    }
}

export const CardsList: FC<CardsListProps> = ({
    cardsProps,
    layout,
    title,
    headerProps,
}) => {
    const [LayoutComponent, processCardProps = (x) => x] =
        getLayoutComponent(layout)
    return (
        <s.CardsList>
            {(headerProps || title) && (
                <Header title={title} {...(headerProps || {})} />
            )}
            <LayoutComponent>
                {cardsProps?.map((cardProps, index) => (
                    <Card {...processCardProps(cardProps)} key={index} />
                ))}
            </LayoutComponent>
        </s.CardsList>
    )
}
