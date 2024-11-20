import { css } from 'styled-components'

const link = css`
    text-decoration: none;
    color: inherit;
`

export const resets = {
    button: css`
        /** 
        * Outline is commented as it removes the focus outline, 
        * which we want to preserve
        +*/
        // outline: none;
        border: none;
        -webkit-appearance: none;
        background: none;
        color: inherit;
        font-size: inherit;
        padding: 0;
    `,
    link,
    anchor: link,
    heading: css`
        margin: 0;
        font-weight: inherit;
    `,
    paragraph: css`
        margin: 0;
    `,
    list: css`
        list-style-type: none;
        padding: 0;
        margin: 0;
        > * {
            margin: 0;
            padding: 0;
            text-indent: 0;
            list-style-type: 0;
        }
    `,
}

export const resetByTag = {
    h1: resets.heading,
    h2: resets.heading,
    h3: resets.heading,
    h4: resets.heading,
    h5: resets.heading,
    h6: resets.heading,
    p: resets.paragraph,
    a: resets.link,
    ul: resets.list,
    ol: resets.list,
    button: resets.button,
}

export type ResetByTagTags = keyof typeof resetByTag
