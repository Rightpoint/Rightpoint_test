import styled, { css } from 'styled-components'
import { HorizontalCardsProps } from './HorizontalCards.component'
import { makeTypedGeneratorFn } from '@rightpoint/core/utils'
import { cardGenerators } from '../../general/Card/Card.data'
import { times } from 'lodash'

export const horizontalCardsGenerators =
    makeTypedGeneratorFn<HorizontalCardsProps>()({
        default: () => ({
            title: 'Customer Experience',
            content:
                'The accelerated shift of commerce to digital gives greater opportunity — and more responsibility — to create lasting impressions with a customer in every context — B2B, B2C, or D2C.',

            cardsProps: [cardGenerators.default(), cardGenerators.default()],
            linkProps: {
                href: '#',
                text: 'Learn More',
            },
        }),
    })
