import { fakerWithSeed } from '@rightpoint/data-generators'
import { startCase } from 'lodash'
import { multiMediaGenerators } from '../MultiMedia/MultiMedia.data'
import { CardProps, CardVariants } from './Card.component'
import { CardTagProps } from './card-variants/CardTags'

import { makeTypedGeneratorFn } from '@rightpoint/core/utils'

/**
 * @deprecated unused for now due to new designs
 */
const generateTag = ({ text = '' }): CardTagProps => ({
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
        subtitle:
            'What are the Customer Experience priorities for the new normal? Read about our experts’ predictions in our latest report.',
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
        title: 'Total Experience',
        subtitle: '',
        body: 'The accelerated shift of commerce to digital gives greater opportunity — and more responsibility — to create lasting impressions with a customer in every context — B2B, B2C, or D2C.',
        linkProps: {
            href: '/',
            text: 'Learn More',
        },
        variant: CardVariants.Card2,
    }),
    cardFullWidth: () => ({
        multiMediaProps: multiMediaGenerators.randomImage(),
        title: 'The Future of Sitecore: Content is at the core of the DXP',
        subtitle: 'Sr. Director, Technology Mark Ursino',
        date: '09.23.22',
        linkProps: {
            href: '#thought-article',
        },
        variant: CardVariants.CardFullWidth,
    }),

    portrait: () => ({
        ...baseProps({
            tags: [],
        }),
        multiMediaProps: multiMediaGenerators.portrait(),
        title: 'Thought',
        subtitle: 'A new view on commerce',
        body: '',
        variant: CardVariants.Card1,
    }),

    landscape: () => ({
        ...baseProps({
            tags: [],
        }),
        multiMediaProps: multiMediaGenerators.default(),
        title: 'Thought',
        subtitle: 'A new view on commerce',
        body: '',
        variant: CardVariants.Card1,
    }),
})
