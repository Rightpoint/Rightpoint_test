import {
    cssVarNames,
    cssVarsTypography,
    media,
    typography,
} from '@rightpoint/core/styles'
import styled, { css } from 'styled-components'
import { LinkStyles } from '../../links/Link/Link.styles'

const Title = styled(typography.H4).attrs({
    $fontFamily: 'sans',
    as: 'h2',
})`
    margin-top: 0.4em;

    ${media('xs', 'md')} {
        margin-top: 0em;
    }
    margin-bottom: 0.1em;
`

/**
 * @deprecated no longer used in v2, but a good reference for how to use css vars
 *
 * This is a css var because its padded on mobile but not on desktop in grid layouts
 * On mobile:
 *  Image: full width
 *  Content: padded
 * On desktop:
 *  Content: unpadded
 *  */
const CardContent = styled.div`
    && {
        padding: var(${cssVarNames.components.card.contentPadding});
    }
`

const DateLine = styled(typography.BodyS)`
    margin-top: 1em;
`

const Body = styled.div`
    line-height: 1.2;
    & > *:first-child {
        margin-top: 0;
    }
    & > *:last-child {
        margin-bottom: 0;
    }
`

const Card = styled.div`
    position: relative; // children contain absolute tags
`

const CardMedia = styled.div`
    position: relative;
`

const CardTags = styled.div`
    position: absolute;
    top: 20px;
    left: 20px;
    z-index: 1;
`

const CardTag = styled.div`
    ${typography.utils.getFontFamily('sans')};
    color: black;
    padding: 7px 15px;
    display: inline-block;
    background: var(--card-tag-bg, var(${cssVarNames.colors.accent}));
    color: white;
    border-radius: 50px;
    font-size: 1rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    font-weight: 700;
`

const Image = styled.div``

const Link = styled.div`
    margin-top: 20px;
`

export const CardStyles = {
    Card,
    CardMedia,
    CardContent,
    Image,
    Title,
    Body,
    DateLine,
    CardTags,
    CardTag,
    Link,
    Caption: styled(typography.FoundersB200)`
        margin-top: 0.6em;
        ${cssVarsTypography.textColor};
        span {
            ${cssVarsTypography.textColor};

            &:nth-child(2) {
                color: var(--bg-color-text-alt, inherit);
            }
        }
    `,

    Card2: {
        Title: styled(typography.FoundersH600)`
            margin-top: 20px;
            margin-bottom: 20px;
            ${cssVarsTypography.textColor};
        `,
        Body: styled(typography.FoundersB200)`
            ${cssVarsTypography.textColor};
        `,
        Link: styled(typography.FoundersB200)`
            ${cssVarsTypography.textColor};
            margin-top: 20px;
            text-underline-offset: 0.5em;
            text-decoration: underline;
            transition: all 0.3s ease 0s;
            &:hover {
                text-underline-offset: 0.25em;
            }
        `,
    },

    CardFullWidth: {
        Root: styled.article`
            ${cssVarsTypography.textColor};

            ${media('lg')} {
                display: flex;
                gap: 20px;

                & > * {
                    flex-basis: 0;
                    flex-grow: 1;
                }
            }
        `,
        TopContent: styled.div``,
        Content: styled.div`
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            height: 100%;
        `,
        Title: styled(typography.FoundersH600)`
            margin-bottom: 0;
            margin-top: 0.6em;
            ${media('lg')} {
                margin-top: 0;
            }
            ${media('xl')} {
                padding-right: 10%;
            }
        `,
        Subtitle: styled(typography.FoundersB200)`
            margin-top: 0.75em;
            ${media('lg')} {
                margin-top: 2em;
            }
        `,
        Body: styled(typography.FoundersB200)``,
        DateLine: styled.div`
            margin-top: 2em;
            transform: translateY(5%);
            ${media('xs', 'lg')} {
                margin-top: 4em;
            }
        `,
    },
}
