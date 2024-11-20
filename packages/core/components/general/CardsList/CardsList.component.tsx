/**
 * This component is used to render an arbitrary list of cards
 * in various different layouts without changing the CMS.
 *
 * For example
 * - If there were large amounts of items, it could render as a Carousel
 * - If there were too few, it could render as a larger more prominent output (v1 requirement)
 */
import { FC } from 'react'
import { Card, CardProps } from '../Card/Card.component'
import { Grid } from '../Grid/Grid.component'
import { Hero, HeroContentWidths } from '../Hero/Hero.component'
import { CardsListStyles as s } from './CardsList.styles'
import { CardsListOffset } from './layouts/CardsListOffset/CardsListOffset'
// import { SingleCard } from './layouts/SingleCard/SingleCard'

export const CardsListLayouts = [
    'Default',
    'Grid',
    'Carousel',
    'Offset',
] as const
export type CardsListLayoutTypes = (typeof CardsListLayouts)[number]
export interface CardsListProps {
    title?: string
    cardsProps: CardProps[]
    layout?: CardsListLayoutTypes
}

export const CardsList: FC<CardsListProps> = ({
    cardsProps,
    layout,
    title,
}) => {
    const getLayoutComponent = () => {
        // comment out for V2 (unknown if still relevant)
        // /**
        //  * If there's only one item, use the single card version
        //  */
        // if (cardsProps.length === 1) {
        //     return SingleCard
        // }

        switch (layout) {
            case 'Default':
                return Grid
            case 'Grid':
                return Grid
            case 'Offset':
                return CardsListOffset
            default:
                return Grid
        }
    }
    const LayoutComponent = getLayoutComponent()
    return (
        <s.CardsList>
            {title && (
                <Hero
                    title={title}
                    contentWidth={HeroContentWidths.FullWidth}
                />
            )}
            <LayoutComponent>
                {cardsProps.map((cardProps, index) => (
                    <Card {...cardProps} key={index} />
                ))}
            </LayoutComponent>
        </s.CardsList>
    )
}
