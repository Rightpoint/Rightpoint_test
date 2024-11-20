import styled, { css } from 'styled-components'
import {
    cssVarsTypography,
    cssVarsTypographyValues,
    FontWeights,
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
    ${cssVarsTypography.richTextColor}

    a {
        ${cssVarsTypography.linkColor}
    }
    > *:first-child,
    > *:first-child * {
        margin-top: 0;
    }
    > *:last-child {
        margin-bottom: 0;
    }
    p {
        ${typography.FoundersB100StaticCss}
        // rich text taller body height
        line-height: 1.4;
    }
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
        line-height: 1.5;
        font-weight: 500;
        &:not(:first-child) {
            margin-top: 3em;
        }
    }
    hr {
        margin: 120px 0;
        border: none;
        border-bottom: 1px solid ${cssVarsTypographyValues.getDividerColor()};
    }
    ul,
    ol {
        padding-left: 1em;
    }
    ul > li {
        margin-bottom: 2em;
        &::marker {
            // make bullets bigger
            font-size: 1.7em;
        }
    }
    ol > li {
        &::marker {
        }
    }
    a {
        text-decoration: underline;
    }
`

const RichText = styled.div`
    ${richTextBaseCss}
`

export const RichTextStyles = {
    RichText,
    richTextBaseCss,
}
