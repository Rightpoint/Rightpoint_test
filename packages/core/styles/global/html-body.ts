import { css } from 'styled-components'
import { cssVarNames } from '../css-vars/var-names'
import { typography } from '../typography/typography'

export const htmlBodyCss = css`
    html {
        // 1rem == 10px
        font-size: 62.5%;
    }

    body {
        ${typography.fonts.sans}

        // set default font size, before browser override
        font-size: 16px;

        margin: 0;
    }

    html,
    body {
        // DO NOT REMOVE: this causes scroll-zoom scale to fail
        // overflow-x: hidden;

        // font smoothing make text match the designs, especially against dark backgrounds. disable as needed.
        -webkit-font-smoothing: antialiased;
    }

    :where(a) {
        color: inherit;
        transition: 0.15s ease;
        &:hover {
            opacity: 0.8;
        }
    }
`
