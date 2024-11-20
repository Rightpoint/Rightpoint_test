import styled, { css } from 'styled-components'
import {
    cssVarsTypography,
    cssVarsTypographyValues,
    media,
    typography,
} from '@rightpoint/core/styles'
import { contentful } from '@rightpoint/core/variables'
import { LinkStyles } from '../../links/Link/Link.styles'

/**
 * Style rich text.
 *
 * IMPORTANT: Be wary of cascading styles.
 *
 * As we move to embedded components within Rich Text, we must not target elements
 * that are not explicitly contentful elements.
 *
 * For now, the only conflicts we have are the <a> tag, so we have labelled them with a class of "contentful-link" or the Link component.
 * In the future, we will need to intercept all contentful nodes and add a class name.
 *
 * e.g. instead of <ul> we need <ul class="contentful-ul"> such that no styles cascade to child embedded components.
 *
 */
const richTextBaseCss = css`
    /**
     * Remove margin from first/last rich text children so that
     * tops and bottoms align.
     */
    ${cssVarsTypography.richTextColor}

    // do not use ems, as they require changing the font-size of the parent, which cascades down to all children
    --local-font-size: 2.4rem;

    .${contentful.richText.linkClassName},
        ${LinkStyles.NextLinkStyled}:not(${LinkStyles.NextLinkButtonStyled}) {
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
        margin-bottom: 0.8em;

        &:not(:first-child) {
            margin-top: 2em;
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
                margin-bottom: 0.5em;
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

    ${media('xs', 'md')} {
        word-break: break-word;
    }

    blockquote {
        font-style: italic;

        margin: 3em 0 3em 0;
        // todo: make this compatible with other bg colors
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
