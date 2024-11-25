import {
    icons,
    media,
    resets,
    typography,
    zIndexes,
} from '@rightpoint/core/styles'
import styled, { css } from 'styled-components'
import { colors } from '@rightpoint/core/variables'

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

const Tier2Items = styled.div`
    margin-bottom: 30px;
`

const Tier1Item = styled(typography.FoundersH400Static)<{ $active?: boolean }>`
    line-height: 80%;
    letter-spacing: -0.02em;
    margin-bottom: 0.08em;

    a {
        text-decoration: none;
        display: block;
    }

    transition: color 0.3s ease, opacity 0.3s ease;

    &:hover {
        color: ${colors.white};
    }

    ${({ $active }) =>
        $active &&
        css`
            color: ${colors.white};
        `}

    ${Tier2Items} + & {
        padding-top: 2.3rem;
    }

    @media screen and (max-height: 1000px) {
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

    color: #68686d;
`

const Tier2Item = styled.div<{ $active?: boolean }>`
    color: var(--local-tier2-text-color);
    position: relative;

    font-size: 2.4rem;
    line-height: 100%;
    padding: 0.8rem 0;

    a {
        text-decoration: none;
        display: block;
    }

    border-top: 1px solid var(--local-tier2-text-color);
    border-bottom: 1px solid var(--local-tier2-text-color);
    transition: color 0.3s ease, border-color 0.3s ease;

    ${Tier2ItemArrow} {
        transition: color 0.3s ease;
    }

    &:hover {
        --local-tier2-text-color: ${colors.white};
        z-index: 1;
        color: ${colors.white};

        ${Tier2ItemArrow} {
            color: ${colors.white};
        }
    }

    ${({ $active }) =>
        $active &&
        css`
            --local-tier2-text-color: ${colors.white};
            z-index: 1;
        `}
`

const SocialLinks = styled.div<{
    $mobileOnly?: boolean
    $desktopOnly?: boolean
}>`
    color: ${colors.white};

    display: none;

    ${media('xs', 'md')} {
        ${({ $desktopOnly }) => $desktopOnly && 'display: none;'}
    }

    ${media('md')} {
        display: block;
        position: fixed;
        bottom: calc(52px - 6px);
        right: calc(51px - 6px);

        ${({ $mobileOnly }) => $mobileOnly && 'display: none;'}

        z-index: ${zIndexes.navbarPopup};
    }
`

const MediaWrapper = styled.figure`
    display: flex;
    flex-direction: column;
    gap: 7px;
    margin: 0;
    iframe {
        pointer-events: none;
    }
    * {
        color: ${colors.neutral3};
    }

    strong,
    span:first-child {
        color: ${colors.white};
    }
`

export const NavbarPopupContentStyles = {
    NavbarPopupContent,
    NavbarPopupContentInner,
    Tier1Item,
    Tier1ItemWithChildren,
    Tier2Items,
    Tier2Item,
    Tier2ItemArrow,
    SocialLinks,
    MediaWrapper,
    CloseProxy: styled.div`
        ${resets.button}
        position: fixed;
        width: 80px;
        height: 40px;
        top: 20px;
        right: 20px;
        ${media('lg')} {
            top: 40px;
            right: 20px;
        }
    `,
}
