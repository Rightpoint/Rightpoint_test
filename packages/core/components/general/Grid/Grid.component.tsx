import { Children, FC, ReactElement, ReactNode } from 'react'
import { GridStyles as s } from './Grid.styles'
import { chunk } from 'lodash'
import { GridLayouts, GridLayoutsKeys, GridRowComponent } from './Grid.types'
import { MultiMedia, MultiMediaProps } from '../MultiMedia/MultiMedia.component'
import { Hero, HeroContentWidths, HeroProps } from '../Hero/Hero.component'

import { GridRow1 } from './Rows/RowGrid1'
import { GridRow2 } from './Rows/RowGrid2'
import { GridRow3 } from './Rows/RowGrid3'
import { Card, CardProps, CardVariants } from '../Card/Card.component'
import { LinkProps } from '../../links/Link/Link.component'
import { Document } from '@contentful/rich-text-types'

/**
 * Grid Row components are defined in ./GridRow/
 * Are arbitrary row layout components.
 *
 * Note: they require an itemsPerRow property on the component to determine
 * how many items per row to chunk.
 */
type GridRowMap = {
    [k in GridLayoutsKeys]: GridRowComponent
}
const gridRowMap: GridRowMap = {
    [GridLayouts.Grid1]: GridRow1,
    [GridLayouts.Grid2]: GridRow2,
    [GridLayouts.Grid3]: GridRow3,
}

const getGridRowComponent = (layout: GridLayoutsKeys): GridRowComponent => {
    if (layout in gridRowMap) {
        return gridRowMap[layout]
    }
    return gridRowMap[GridLayouts.Grid1]
}

export interface GridLayoutProps {
    children?: ReactNode
    areasMd?: string
    gridLayout?: GridLayoutsKeys
}
/**
 * The grid layout component accepts arbitrary children to render in row components.
 *
 * This component is used to render all kinds of advanced grids.
 *
 * New variants should be created in ./GrowRow/
 *
 * @example
 * <Grid gridLayout={GridLayouts.X}>
 *     <ArbitraryChildren>
 *     <ArbitraryChildren>
 * </Grid>
 */
export const GridLayout: FC<GridLayoutProps> = ({ children, gridLayout }) => {
    const GridRowComponent = getGridRowComponent(gridLayout)
    const chunkedPerRow = chunk(
        Children.map(children, (x) => x),
        GridRowComponent.itemsPerRow
    )
    return (
        <s.Grid>
            {chunkedPerRow.map((mappedChildren, i) => {
                return (
                    <GridRowComponent
                        key={i}
                        isLastRow={i === chunkedPerRow.length}
                    >
                        {mappedChildren}
                    </GridRowComponent>
                )
            })}
        </s.Grid>
    )
}

export interface GridItemProps {
    title?: string
    body?: string
    date?: string
    bodyRichTextDocument?: Document
    multiMediaProps?: MultiMediaProps
    linkProps?: LinkProps
    cardVariant?: CardVariants
    // wrapper?: () => ReactElement
    Wrapper?: any

    as?: any
}
export const GridItem: FC<GridItemProps> = ({
    multiMediaProps,
    title,
    body,
    bodyRichTextDocument,
    linkProps,
    cardVariant,
    date,
}) => {
    return (
        <Card
            date={date}
            variant={cardVariant}
            title={title}
            body={body}
            bodyRichTextDocument={bodyRichTextDocument}
            multiMediaProps={multiMediaProps}
            linkProps={linkProps}
        />
    )
}

export interface GridProps extends GridLayoutProps {
    title?: string // deprecated

    items?: GridItemProps[] // items or children
    cardsProps?: CardProps[]

    cardVariant?: CardVariants

    heroProps?: Partial<HeroProps>

    Wrapper?: any
}
export const Grid: FC<GridProps> = ({
    title,
    items,
    cardsProps,
    cardVariant,
    heroProps,
    children,
    ...props
}) => {
    const renderGridItems = (items) => {
        return (
            items?.map((item, i) => (
                <GridItem
                    {...item}
                    key={i + 'item'}
                    cardVariant={cardVariant}
                />
            )) ?? []
        )
    }

    const renderCards = (cardsProps) => {
        return (
            cardsProps?.map((cardProps, i) => (
                <Card {...cardProps} variant={cardVariant} key={'card' + i} />
            )) ?? []
        )
    }

    const flatChildren = [
        ...Children.toArray(children),
        ...renderGridItems(items),
        ...renderCards(cardsProps),
    ]

    return (
        <>
            {/* <Hero
                title={title}
                {...heroProps}
                contentWidth={HeroContentWidths.FullWidth}
            ></Hero> */}
            <GridLayout {...props}>{flatChildren}</GridLayout>
        </>
    )
}
