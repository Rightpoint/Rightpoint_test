import styled, { css } from 'styled-components'
import {
    cssVarsTypography,
    cssVarsTypographyValues,
    media,
    resets,
    typography,
    zIndexes,
} from '@rightpoint/core/styles'
import { Link } from '../../links/Link/Link.component'
import { colors } from '@rightpoint/core/variables'

const Footer = styled.div`
    ${cssVarsTypography.backgroundColor};
    ${cssVarsTypography.textColor};

    text-align: left;
    position: relative;
    z-index: ${zIndexes.footer};
`

const Logo = styled.div`
    svg {
        width: 100%;
        height: auto;
        display: block;
        margin-bottom: 0.05em;
        path {
            fill: white;
        }
    }
`

const Item = styled.div`
    ${typography.BodyMCss}
    a {
        ${resets.anchor}
        text-decoration :none;

        color: ${cssVarsTypographyValues.getTextAltColor()};
    }
`

const ItemTitle = styled(typography.FoundersB100)`
    font-size: 2rem;

    ${media('sm')} {
        font-size: 2.4rem;
    }

    ${media('xs', 'md')} {
        margin-bottom: 0.9rem;
    }
`

const Text = styled(typography.FoundersB200)`
    font-size: 1.7rem;
    color: ${cssVarsTypographyValues.getTextAltColor()};
`

export const FooterStyles = {
    Footer,
    Logo,
    Item,
    ItemTitle,
    Text,
    Copyright: styled(typography.FoundersB300)`
        color: ${cssVarsTypographyValues.getTextAltColor()};
    `,

    MainLinks: styled(typography.FoundersH400)`
        margin-bottom: 5rem;

        ${media('lg')} {
            margin-bottom: 8.3rem;
        }
    `,

    Policies: styled(typography.FoundersB300)`
        color: ${cssVarsTypographyValues.getTextAltColor()};
        display: flex;
        line-height: 120%;

        flex-direction: column;
        ${media('md')} {
            flex-direction: row;
            flex-wrap: wrap;
        }
    `,
    Policy: styled.div`
        &:not(:last-child) {
            margin-right: 20px;
        }
    `,
    MainLink: styled(Link)`
        display: block;
        text-decoration: none;
    `,
    SocialLinks: styled.div`
        a {
            color: ${colors.white};
        }
        margin-top: 3rem;

        ${media('xs', 'md')} {
            margin-top: 6rem;
        }
    `,
}
