import { fakerWithSeed } from '@rightpoint/data-generators'
import { startCase } from 'lodash'
import { multiMediaGenerators } from '../MultiMedia/MultiMedia.data'
import { CardProps, CardVariants } from './Card.component'
import { CardTagProps } from './variants/CardTags'

import { makeTypedGeneratorFn } from '@rightpoint/core/utils'

const titles = [
    'Genpact Oasis',
    'Garden of Life',
    'SeaWorld',
    'Nima',
    'Pelatonia',
    'Animal Pak',
]

const generateTag = ({ text = '' }): CardTagProps => ({
    // TODO: this should be a link
    //
    text: text || startCase(fakerWithSeed.lorem.word()),
})

const baseProps = ({ tags = [] } = {}) => ({
    multiMediaProps: multiMediaGenerators.image(),
    tagsProps: tags.map(generateTag),
})

export const cardGenerators = makeTypedGeneratorFn<CardProps>()({
    default: () => cardGenerators.card1(),

    card1: () => ({
        ...baseProps({
            tags: ['Thought'],
        }),
        title: 'Reimagining Luxury',
        body: 'What are the Customer Experience priorities for the new normal? Read about our experts’ predictions in our latest report.',
        linkProps: {
            href: '/',
            text: 'Read More',
        },

        variant: CardVariants.Card1,
    }),
    card2: () => ({
        ...baseProps({
            tags: ['Work'],
        }),
        title: 'Genpact Oasis',
        body: 'Modernizing Digital Commerce Strategy to Create Stronger Customer Relationships',
        linkProps: {
            href: '/',
            text: 'Read More',
        },
        variant: CardVariants.Card2,
    }),
    card3: () => ({
        ...baseProps(),
        title: 'How I Cured My Workplace Martyr Syndrome',
        date: 'Technology Nov 6th, 2021',
        linkProps: {
            href: '/',
            text: 'Watch Now',
        },
        variant: CardVariants.Card3,
    }),

    portrait: () => ({
        ...baseProps({
            tags: [],
        }),
        multiMediaProps: multiMediaGenerators.portrait(),
        title: 'Thought',
        body: 'A new view on commerce',
        variant: CardVariants.Card1,
    }),

    landscape: () => ({
        ...baseProps({
            tags: [],
        }),
        multiMediaProps: multiMediaGenerators.default(),
        title: 'Thought',
        body: 'A new view on commerce',
        variant: CardVariants.Card1,
    }),
})
