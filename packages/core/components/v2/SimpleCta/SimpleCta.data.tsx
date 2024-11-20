import styled, { css } from 'styled-components'
import { SimpleCtaProps } from './SimpleCta.component'
import { makeTypedGeneratorFn } from '@rightpoint/core/utils'
import { BackgroundColors } from '../../layout/RootComponent/background-color'

export const simpleCtaGenerators = makeTypedGeneratorFn<SimpleCtaProps>()({
    default: () => ({
        title: "Don't see what you're looking for?",
        linkProps: {
            href: '#',
            text: 'Send us a message',
        },
    }),
    background: ({
        backgroundColor,
    }: {
        backgroundColor?: BackgroundColors
    } = {}) => ({
        title: "Don't see what you're looking for?",
        linkProps: {
            href: '#',
            text: 'Send us a message',
        },
        rootProps: {
            container: true,
            background: {
                backgroundColor: backgroundColor || BackgroundColors.Black,
            },
        },
    }),
})
