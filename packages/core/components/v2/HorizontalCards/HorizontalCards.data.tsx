import styled, { css } from 'styled-components'
import { HorizontalCardsProps } from './HorizontalCards.component'
import { makeTypedGeneratorFn } from '@rightpoint/core/utils'
import { cardGenerators } from '../../general/Card/Card.data'
import { times } from 'lodash'
import { fakerWithSeed } from '@rightpoint/data-generators'

export const horizontalCardsGenerators =
    makeTypedGeneratorFn<HorizontalCardsProps>()({
        default: () => ({
            title: fakerWithSeed.lorem.sentence(),
            content: fakerWithSeed.lorem.paragraph(
                fakerWithSeed.datatype.number({
                    min: 1,
                    max: 5,
                })
            ),

            cardsProps: [cardGenerators.default(), cardGenerators.default()],
            linkProps: {
                href: '#',
                text: 'Learn More',
            },
        }),
    })
