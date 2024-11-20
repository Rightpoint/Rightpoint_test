import styled, { css } from 'styled-components'
import { CardsListProps } from './CardsList.component'
import { makeTypedGeneratorFn } from '@rightpoint/core/utils'
import { cardGenerators } from '../Card/Card.data'

export const cardsListGenerators = makeTypedGeneratorFn<CardsListProps>()({
    default: () => ({
        title: 'Carousel',
        layout: 'Carousel',
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
})
