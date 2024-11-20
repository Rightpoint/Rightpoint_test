import styled, { css } from 'styled-components'
import { CardsListProps } from './CardsList.component'
import { makeTypedGeneratorFn } from '@rightpoint/core/utils'
import { cardGenerators } from '../Card/Card.data'

export const cardsListGenerators = makeTypedGeneratorFn<CardsListProps>()({
    default: () => ({
        title: 'Offset',
        layout: 'Offset' as const,
        cardsProps: [
            cardGenerators.default(),
            cardGenerators.default(),
            cardGenerators.default(),
        ],
    }),
    grid: () => ({
        title: 'Grid',
        layout: 'Grid' as const,
        cardsProps: [
            cardGenerators.default(),
            cardGenerators.default(),
            cardGenerators.default(),
        ],
    }),
    single: () => ({
        title: 'Single fallback',
        layout: 'Grid' as const,
        cardsProps: [cardGenerators.default()],
    }),
    offset: () => ({
        title: 'Offset',
        layout: 'Offset' as const,
        cardsProps: [
            cardGenerators.default(),
            cardGenerators.default(),
            cardGenerators.default(),
        ],
    }),
    offsetFewerCards: () => ({
        title: 'Offset Stress Test: fewer cards',
        layout: 'Offset' as const,
        cardsProps: [cardGenerators.default()],
    }),
    offsetMoreCards: () => ({
        title: 'Offset Stress Test: more cards',
        layout: 'Offset' as const,
        cardsProps: [
            cardGenerators.default(),
            cardGenerators.default(),
            cardGenerators.default(),
            cardGenerators.default(),
            cardGenerators.default(),
        ],
    }),
    cardsListFullWidthList: () => ({
        layout: 'FullWidth' as const,
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
})
