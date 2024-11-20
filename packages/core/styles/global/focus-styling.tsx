import { css } from 'styled-components'

export const focusCss = css`
    /* suppress focus ring on form controls for mouse users */
    [data-whatintent='mouse'] *:focus {
        outline: none;
    }
`
