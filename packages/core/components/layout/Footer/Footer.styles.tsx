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

const Text = styled(typography.FoundersB200)`
    font-size: 1.7rem;
    color: ${cssVarsTypographyValues.getTextAltColor()};
`

export const FooterStyles = {
    Footer,
    Logo,
    Office: styled.div`
        ${typography.BodyMCss}
        a {
            ${resets.anchor}
            text-decoration :none;

            color: ${cssVarsTypographyValues.getTextAltColor()};
        }
    `,
    OfficeTitle: styled(typography.FoundersB100)`
        ${media('xs', 'md')} {
            ${typography.FoundersMH700Css};
        }
    `,
    Text,
    Copyright: styled(typography.FoundersB300)`
        color: ${cssVarsTypographyValues.getTextAltColor()};
    `,

    MainLinks: styled(typography.FoundersH400Static)`
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
        ${media('xs', 'md')} {
            margin-bottom: 0.5em;
        }
    `,
    MainLink: styled.div``,
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
