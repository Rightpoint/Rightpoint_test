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
    ${cssVarsTypography.richTextColor}

    // do not use ems, as they require changing the font-size of the parent, which cascades down to all children
    --local-font-size: 2.4rem;

    a {
        ${cssVarsTypography.linkColor}
    }

    strong,
    b {
        font-weight: 500;
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
    h1 {
        font-size: calc(1.7 * var(--local-font-size));
    }
    h2 {
        font-size: calc(1.4 * var(--local-font-size));
    }
    h3 {
        font-size: calc(1.2 * var(--local-font-size));
    }
    h4 {
        font-size: calc(1.1 * var(--local-font-size));
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
    ul,
    ol {
        li {
            ${typography.utils.clearRichMargin}

            &:not(:last-child) {
                margin-bottom: 2em;
            }
        }
    }

    ul li {
        &::marker {
            font-size: calc(1.5 * var(--local-font-size));
        }
    }
    ol li {
        &::marker {
            font-size: calc(0.8 * var(--local-font-size));
        }
    }
    a {
        text-decoration: underline;
    }

    ${media('xs', 'md')} {
        word-break: break-word;
    }

    blockquote {
        font-style: italic;

        margin: 3em 0 3em 0;
        border-left: 1px solid #f5f5f5;
        padding-left: 10px;

        ${media('md')} {
            padding-left: 20px;
            margin: 3em 0 3em 3em;
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
