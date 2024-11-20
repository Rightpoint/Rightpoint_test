import styled, { css } from 'styled-components'
import {
    cssVarsTypography,
    cssVarsTypographyValues,
    media,
    resets,
    typography,
    zIndexes,
    icons,
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
const Tier2Items = styled.div`
    margin-bottom: 6px;
    border-left: 1px solid var(--local-tier2-border-color); /* Add a light border by default */
    margin-top: 5px;
`
const Tier1Item = styled(typography.FoundersH400Static)<{ $active?: boolean }>`
    line-height: 80%;
    letter-spacing: -0.02em;
    margin-bottom: 0.08em;

    a {
        text-decoration: none;
        display: block;
        color: var(--local-light-color); /* Default light color */
    }

    transition: color 0.3s ease, opacity 0.3s ease;

    &:hover {
        color: ${colors.white}; /* Hover color change */
    }

    ${({ $active }) =>
        $active &&
        css`
            color: ${colors.white}; /* Active state color */
        `}

    ${Tier2Items} + & {
        padding-top: 2.3rem;
    }

    @media screen and (max-height: 1000px) {
        // Additional mobile styles
    }
`

const Tier1ItemWithChildren = styled(Tier1Item)`
    padding-bottom: 10px;
`

const Tier2ItemArrow = styled(icons.SmallArrow)`
    pointer-events: none;
    position: absolute;
    top: 50%;
    right: 1.6rem;
    transform: translateY(-50%) rotate(-90deg);

    color: #68686d; /* Light color by default */
    transition: color 0.3s ease; /* Smooth color transition on hover */
`

const Tier2Item = styled.div<{ $active?: boolean }>`
    color: var(--local-tier2-text-color, #9a9a9a); /* Light color by default */
    position: relative;

    font-size: 2.4rem;
    line-height: 100%;
    padding: 0.8rem 0;

    a {
        text-decoration: none;
        display: block;
        color: var(--local-tier2-text-color, #9a9a9a); /* Text in light color */
    }

    @media (min-width: 768px) {
        width: 500px; /* Apply width for desktop */
    }
    border-top: 1px solid var(--local-tier2-border-color, #68686d); /* Visible border by default */
    border-bottom: 1px solid var(--local-tier2-border-color, #68686d); /* Visible border by default */
    transition: color 0.3s ease, border-color 0.3s ease;

    ${Tier2ItemArrow} {
        color: #68686d; /* Light color for arrow by default */
    }

    &:hover {
        --local-tier2-text-color: ${colors.white}; /* On hover, change to white */
        z-index: 1;
        color: ${colors.white}; /* Hover text color */

        border-color: ${colors.white}; /* Border color change on hover */

        ${Tier2ItemArrow} {
            color: ${colors.white}; /* Arrow color change on hover */
        }
    }

    ${({ $active }) =>
        $active &&
        css`
            --local-tier2-text-color: ${colors.white}; /* Active state color */
            z-index: 1;
        `}
`

const NavbarPopupContent = styled.div`
    position: relative;
    height: 100%;
    width: 100%;
    color: var(--local-text-color);
    padding: 20px;

    ${media('xs', 'md')} {
        padding-top: 140px;
    }

    ${media('md')} {
        padding: 120px 25px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        min-height: 100vh;
    }
`

const NavbarPopupContentInner = styled.div`
    ${media('md')} {
        --local-outer-gutter: 54px;
        padding: 0 var(--local-outer-gutter);
        max-width: calc(794px + var(--local-outer-gutter) * 2);
    }
`

export const FooterStyles = {
    NavbarPopupContent,
    NavbarPopupContentInner,
    Tier1Item,
    Tier1ItemWithChildren,
    Tier2Items,
    Tier2Item,
    Tier2ItemArrow,
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
