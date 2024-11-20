import styled, { css } from 'styled-components'
import { LinkProps } from './Link.component'
import { makeTypedGeneratorFn } from '@rightpoint/core/utils'
import { fakerWithSeed } from '@rightpoint/data-generators'
import { pardotGenerators } from '../../general/Pardot/Pardot.data'

export const linkGenerators = makeTypedGeneratorFn<LinkProps>()({
    default: () => ({
        href: '#some-link',
        text: 'Learn More',
        meta: {
            noFollow: false,
            opensInNewTab: false,
        },
    }),

    randomText: () => ({
        href: '#some-link',
        text: fakerWithSeed.random.words(3),
    }),

    button: () => ({
        href: '#button',
        text: 'Learn More',
        asButton: true,
    }),

    styledLink: () => ({
        href: '#styled-link',
        text: 'Styled Link (Larger, Specific Size, Color, Hover)',
        asStyledLink: true,
    }),

    scrollToText: () => ({
        href: '#',
        text: 'Click to scroll',
        scrollTo: {
            text: 'Match me',
        },
    }),

    pardot: () => ({
        href: '#',
        text: 'Pardot Link',
        cursor: {
            text: 'Click to open Pardot form',
        },
        pardotProps: pardotGenerators.default(),
    }),
})
