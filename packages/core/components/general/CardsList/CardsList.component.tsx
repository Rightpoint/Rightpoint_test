import { FC } from 'react'
import { Card, CardProps } from '../Card/Card.component'
import { Grid } from '../Grid/Grid.component'
import { Hero, HeroContentWidths } from '../Hero/Hero.component'
import { ScrollerFreeMode } from '../Scroller/ScrollerFreeMode/ScrollerFreeMode.component'
import { CardsListStyles as s } from './CardsList.styles'

const SingleCard = ({ children }) => {
    return <s.SingleCard>{children}</s.SingleCard>
}

export const CardsListLayouts = ['Default', 'Grid', 'Carousel'] as const
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
        /**
         * If there's only one item, use the single card version
         */
        if (cardsProps.length === 1) {
            return SingleCard
        }

        switch (layout) {
            case 'Grid':
                return Grid
            case 'Carousel':
                return ScrollerFreeMode
            case 'Default':
                return Grid
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
