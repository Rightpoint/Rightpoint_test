import {
    cssVarNames,
    cssVarsTypography,
    FontWeights,
    media,
    typography,
} from '@rightpoint/core/styles'
import styled, { css } from 'styled-components'
import { LinkStyles } from '../Link/Link.styles'

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
 * This is a css var because its padded on mobile but not on desktop in grid layouts
 * On mobile:
 * Image: full width
 * Content: padded
 * On desktop:
 * Content: unpadded
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

    ${LinkStyles.Anchor} {
        font-family: ${typography.utils.getFontFamily('serif')};
        ${cssVarsTypography.linkColor}
        text-decoration: underline;
    }
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
        margin-top: 0.5em;
        ${cssVarsTypography.textColor};
        span {
            ${cssVarsTypography.textColor};

            &:nth-child(2) {
                color: var(--bg-color-text-alt, inherit);
            }
        }
    `,
}
