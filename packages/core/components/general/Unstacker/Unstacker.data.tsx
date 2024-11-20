import { fakerWithSeed } from '@rightpoint/data-generators'
import { startCase, times } from 'lodash'
import styled, { css } from 'styled-components'
import { AspectWrapperRatios } from '../../utils/AspectWrapper/AspectWrapper.context'
import { multiMediaGenerators } from '../MultiMedia/MultiMedia.data'
import { UnstackerProps } from './Unstacker.component'

import { makeTypedGeneratorFn } from '@rightpoint/core/utils'

const generateItem = ({
    wordCount = 5,
    sentenceCount = 1,
    aspectRatio = AspectWrapperRatios.Default,
} = {}) => ({
    title: startCase(fakerWithSeed.lorem.words(wordCount)),
    body: fakerWithSeed.lorem.sentences(sentenceCount),
    multiMediaProps: {
        ...multiMediaGenerators.randomImage(),
        aspectRatio,
    },
    linkProps: {
        href: '/',
        text: 'Learn More',
    },
})

export const unstackerGenerators = makeTypedGeneratorFn<UnstackerProps>()({
    default: () => ({
        heroTitle: 'Stack',
        items: [
            generateItem({
                sentenceCount: 3,
                aspectRatio: 810 / 432,
            }),
            generateItem({
                aspectRatio: 350 / 500, // portraity
            }),
        ],
    }),
    realistic: () => ({
        items: titles.map((title, i) => ({
            ...generateItem({
                sentenceCount: 3,
                aspectRatio: 810 / 432,
            }),
            title,
        })),
    }),
})

const titles = [
    'Commerce',
    'Customer Experience',
    'Employee Experience',
    'Digital Product',
]
