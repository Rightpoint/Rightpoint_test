import styled, { css } from 'styled-components'
import { ScrollZoomProps } from './ScrollZoom.component'
import { makeTypedGeneratorFn } from '@rightpoint/core/utils'
import { multiMediaGenerators } from '../../../../general/MultiMedia/MultiMedia.data'

type Generators = {
    [key: string]: (args?: any) => ScrollZoomProps
}

export const scrollZoomGenerators = makeTypedGeneratorFn<ScrollZoomProps>()({
    default: () => ({
        multiMediaProps: multiMediaGenerators.video(),
        showLogo: true,
        textProps: {
            typewriterTexts: [
                'We help our clients unlock potential through the convergence of employee and customer experience.',
                // 'See how we do it.', // delay too slow to delete
            ],
        },
    }),
    noTypewriter: () => ({
        multiMediaProps: multiMediaGenerators.image(),
        showLogo: false,
        textProps: {
            title: 'The future of experience.',
        },
    }),
})
