import styled, { css } from 'styled-components'
import {
    cssVarsTypography,
    cssVarsTypographyValues,
    FontWeights,
    media,
    typography,
} from '@rightpoint/core/styles'

/**
 * Style rich text.
 *
 * - Try not to cascade too many styles, i.e. make sure we target nodes primarily.
 */
const richTextBaseCss = css`
    /**
     * Remove margin from first/last rich text children so that
     * tops and bottoms align.
     */
    font-size: 1.7rem;
    ${media('lg')} {
        font-size: 2.4rem;
    }
    ${cssVarsTypography.richTextColor}
    a {
        ${cssVarsTypography.linkColor}
    }
    > *:first-child {
        margin-top: 0;
    }
    > *:last-child {
        margin-bottom: 0;
    }
    p {
        font-size: 1em;
        line-height: 1.4;
    }
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
        ${typography.utils.getFontFamily('sans')}
        font-weight: ${FontWeights.Medium};
        line-height: 1.3;
        &:not(:first-child) {
            margin-top: 3em;
        }
    }
    h2 {
        font-size: 1.3em;
    }
    h3 {
        font-size: 1.2em;
    }
    h4 {
        font-size: 1.1em;
    }
    h5 {
        font-size: 1em;
    }
    h6 {
        font-size: 1em;
    }
    blockquote {
        font-style: italic;
    }
    hr {
        margin: 120px 0;
        border: none;
        border-bottom: 1px solid ${cssVarsTypographyValues.getDividerColor()};
    }
    ul,
    ol {
        padding-left: 2em;
    }
    ul > li {
        margin-bottom: 1em;
        &::marker {
            // make bullets bigger
            font-size: 1.4em;
        }
    }
    ol > li {
        &::marker {
        }
    }
`

const RichText = styled.div`
    ${richTextBaseCss}
`

export const RichTextStyles = {
    RichText,
    richTextBaseCss,
}
