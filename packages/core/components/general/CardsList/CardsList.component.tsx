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
import { Link, LinkProps } from '../../links/Link/Link.component'
import {
    Header,
    HeaderProps,
    HeaderVariants,
} from '../../v2/Header/Header.component'
import { Card, CardProps, CardVariants } from '../Card/Card.component'
import { Grid } from '../Grid/Grid.component'
import { ScrollerAutoScroll } from '../Scroller/ScrollerAutoScroll/ScrollerAutoScroll.component'
import { ScrollerFreeMode } from '../Scroller/ScrollerFreeMode/ScrollerFreeMode.component'
import { CardsListStyles as s } from './CardsList.styles'
import { CardsListFullWidthList } from './layouts/CardsListFullWidth/CardsListFullWidth'
import { CardsListOffset } from './layouts/CardsListOffset/CardsListOffset'
import { StandardGrid } from './layouts/StandardGrid/StandardGrid'

// import { SingleCard } from './layouts/SingleCard/SingleCard'

export enum CardsListLayouts {
    Default = 'Default',
    Grid = 'Grid',
    Carousel = 'Carousel',
    CarouselAutoScroll = 'CarouselAutoScroll',
    Offset = 'Offset',
    FullWidth = 'FullWidth',
    StandardGrid = 'StandardGrid',
    StandardGridPeople = 'StandardGridPeople',
}
export interface CardsListProps {
    layout?: CardsListLayouts
    cardsProps: CardProps[]
    cardVariant?: CardVariants
    // layoutProps?: any
    headerProps?: HeaderProps
    linkProps?: LinkProps
}

/**
 * Get layout component and optional card override props.
 *
 * For example, FullWidth cards list only works with CardFullWidth cards.
 */
const getLayoutComponent = (
    layout: CardsListLayouts
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
        case CardsListLayouts.Default:
            return [Grid]
        case CardsListLayouts.Grid:
            return [Grid]
        case CardsListLayouts.Offset:
            return [CardsListOffset]
        case CardsListLayouts.StandardGrid:
            return [StandardGrid]
        case CardsListLayouts.Carousel:
            return [ScrollerFreeMode]
        case CardsListLayouts.CarouselAutoScroll:
            return [ScrollerAutoScroll]
        case CardsListLayouts.StandardGridPeople:
            return [
                StandardGrid,
                (cardProps) => ({
                    ...cardProps,
                    multiMediaProps: {
                        ...cardProps.multiMediaProps,
                        aspectWrapperRatio: 1,
                        aspectWrapperRatioDesktop: 1,
                    },
                }),
            ]
        case CardsListLayouts.FullWidth:
            return [
                CardsListFullWidthList,
                /**
                 * If a full width list is requested, do not allow inner card variant overrides
                 */
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
    headerProps,

    layout,
    linkProps,
}) => {
    const [LayoutComponent, processCardProps = (x) => x] =
        getLayoutComponent(layout)

    const titlesAdded = []
    return (
        <s.CardsList>
            {headerProps && <Header {...(headerProps || {})} />}
            <LayoutComponent>
                {cardsProps?.map((cardProps, index) => {
                    const titleExists = titlesAdded.includes(cardProps.title)
                    titlesAdded.push(cardProps.title)
                    /**
                     * Cards lists tend to persist and have their data changed, making legitimate keys useful.
                     */
                    return (
                        <Card
                            {...processCardProps(cardProps)}
                            key={titleExists ? index : cardProps.title}
                        />
                    )
                })}
            </LayoutComponent>

            {linkProps && (
                <s.Link>
                    <Link {...linkProps} asStyledLink />
                </s.Link>
            )}
        </s.CardsList>
    )
}
