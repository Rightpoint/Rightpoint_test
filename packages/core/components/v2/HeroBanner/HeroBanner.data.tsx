import styled, { css } from 'styled-components'
import { HeroBannerProps } from './HeroBanner.component'
import { makeTypedGeneratorFn } from '@rightpoint/core/utils'
import { linkGenerators } from '../../links/Link/Link.data'
import { cardGenerators } from '../../general/Card/Card.data'

export const heroBannerGenerators = makeTypedGeneratorFn<HeroBannerProps>()({
    default: () => ({
        eyebrow: 'Industry leading thinking',
        title: 'Leading Thoughts',
        subtitle:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, do eiusmod tempor.',
        ctaProps: linkGenerators.default(),
        cardProps: cardGenerators.portrait(),
    }),
    landscape: () => ({
        eyebrow: 'Landscape',
        title: 'Landscape Stress',
        subtitle:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, do eiusmod tempor.',
        ctaProps: linkGenerators.default(),
        cardProps: cardGenerators.landscape(),
    }),
})
