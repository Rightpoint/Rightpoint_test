import styled, { css } from 'styled-components'
import { CardsListLayouts, CardsListProps } from './CardsList.component'
import { makeTypedGeneratorFn } from '@rightpoint/core/utils'
import { cardGenerators } from '../Card/Card.data'
import { times } from 'lodash'

const makeCards = (count: number = 1) => {
    return times(count, () => cardGenerators.default())
}

export const cardsListGenerators = makeTypedGeneratorFn<CardsListProps>()({
    default: () => ({
        headerProps: { title: 'Offset' },
        layout: CardsListLayouts.Offset,
        cardsProps: makeCards(3),
    }),
    grid: () => ({
        headerProps: { title: 'Grid' },
        layout: CardsListLayouts.Grid,
        cardsProps: makeCards(3),
    }),
    single: () => ({
        headerProps: { title: 'Single fallback' },
        layout: CardsListLayouts.Grid,
        cardsProps: [cardGenerators.default()],
    }),
    offset: () => ({
        headerProps: { title: 'Offset' },
        layout: CardsListLayouts.Offset,
        cardsProps: [
            cardGenerators.default(),
            cardGenerators.default(),
            cardGenerators.default(),
        ],
    }),
    offsetFewerCards: () => ({
        headerProps: { title: 'Offset Stress Test: fewer cards' },
        layout: CardsListLayouts.Offset,
        cardsProps: [cardGenerators.default(), cardGenerators.default()],
    }),
    offsetMoreCards: () => ({
        headerProps: { title: 'Offset Stress Test: more cards' },
        layout: CardsListLayouts.Offset,
        cardsProps: [
            ,
            cardGenerators.default(),
            cardGenerators.default(),
            cardGenerators.default(),
            cardGenerators.default(),
        ],
    }),
    fullWidthList: () => ({
        layout: CardsListLayouts.FullWidth,
        headerProps: {
            title: 'Full width list',
            body: "This is used on various list pages, such as the blog, events, and news pages. It's a full width list of cards, with a title and body.",
        },
        cardsProps: [
            cardGenerators.cardFullWidth(),
            cardGenerators.cardFullWidth(),
            cardGenerators.cardFullWidth(),
            cardGenerators.cardFullWidth(),
            cardGenerators.cardFullWidth(),
        ],
    }),
    standardGrid: () => ({
        layout: CardsListLayouts.StandardGrid,
        headerProps: {
            title: 'Standard grid',
        },
        cardsProps: makeCards(9),
    }),
    standardGridPeople: () => ({
        layout: CardsListLayouts.StandardGridPeople,
        headerProps: {
            title: 'Standard grid people',
        },
        cardsProps: makeCards(9),
    }),
})
