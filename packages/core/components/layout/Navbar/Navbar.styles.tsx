import {
    cssVarNames,
    icons,
    resets,
    typography,
    zIndexes,
} from '@rightpoint/core/styles'
import styled, { css } from 'styled-components'
import { media } from '@rightpoint/core/styles'

type NavbarProps = {
    $isSticky?: boolean
    $isPopupOpen?: boolean
    $isPreSticky?: boolean
    $belowFoldVariant?: boolean
}
const navbarHeightPx = '84px'
const navbarHeight = css<NavbarProps>`
    height: ${navbarHeightPx};
    padding-top: 20px;
    // ${media('xs', 'sm')} {
    //     padding-top: 50px;
    // }
    transition: height 1s ease 0s;
`

const navbarAbsolutePosition = css`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
`

const navbarFlex = css`
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
`

const navbarInnerPad = css`
    padding-left: var(${cssVarNames.innerPadding});
    padding-right: var(${cssVarNames.innerPadding});
`

const navbarStickyVariant = css`
    ${() => css`
        ${LogoWrapper} {
            margin-top: -3px;
            svg {
                transition: all 0.5s ease 0s;
                width: 110px !important;
                height: 20px;
            }
        }
    `}
`

const NavbarHeightRetainer = styled.div`
    height: ${navbarHeightPx};
`

const Navbar = styled.div<NavbarProps>`
    ${navbarHeight}
    ${navbarAbsolutePosition}
    ${navbarFlex}  
    ${navbarInnerPad}
    z-index: ${zIndexes.stickyNavbar};

    color: var(${cssVarNames.content.colorText}, black);

    ${() => css`
        ${LogoWrapper} {
            svg {
                width: 165px;
                height: 23px;

                path {
                    fill: var(${cssVarNames.content.colorText}, black);
                }
            }
            ${media('xs', 'sm')} {
                svg {
                    width: 40px;
                    height: 40px;
                }
            }
        }
    `}
    ${({ $belowFoldVariant }) =>
        $belowFoldVariant &&
        css`
            position: static;
            border-top: 1px solid var(${cssVarNames.colors.divider});
            background: white;
        `}
        

    ${({ $isPreSticky }) =>
        $isPreSticky &&
        css`
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            background: #fff;
            padding-top: 26px;
            border-bottom: 1px solid #f9f9f9;
            transform: translateY(-100%);
            opacity: 0;

            ${navbarStickyVariant}
        `}


    ${({ $isSticky }) =>
        $isSticky &&
        css`
            // ${media('xs', 'sm')} {
            //     display: none;
            // }
            position: fixed;
            transform: translateY(0%);
            opacity: 1;
            transition: transform 0.2s ease 0s;
        `}

    ${({ $isPopupOpen }) =>
        $isPopupOpen
            ? css`
                  //   transition: all 1s cubic-bezier(0.95, 0.23, 0.17, 1) 0s;
                  background: transparent;
                  backdrop-filter: blur(20px);
                  height: 100vh;
              `
            : css`
                  //   transition: all 1s cubic-bezier(0.95, 0.23, 0.17, 1) 1s;
              `}
`

const itemXPad = 10
const itemYPad = 5
const lineHeightFudge = 4
/**
 * Remove item padding on the left/right such that
 * top and edge aligns with content padding
 */
const Item = styled(typography.BodyL).attrs({
    $fontFamily: 'serif',
})`
    ${resets.button}

    &:focus {
        outline: 1px solid var(${cssVarNames.colors.coral});
    }
    cursor: pointer;

    padding: ${itemYPad}px ${itemXPad}px;

    &:first-of-type {
        margin-top: -${itemYPad + lineHeightFudge}px;
        margin-left: -${itemXPad}px;
    }
    &:last-child {
        margin-top: -${itemYPad + lineHeightFudge}px;
        margin-right: -${itemXPad}px;
    }
`

const ItemAnchor = styled(typography.Link).attrs({
    as: 'a',
})`
    && {
        font-size: 1.8rem;
        color: var(${cssVarNames.content.colorText}, black);
        text-decoration: none;
    }
`

const LogoWrapper = styled.div`
    a {
        &:focus {
            outline: 1px solid var(${cssVarNames.colors.coral});
        }
    }
`

const Logo = styled.div`
    > a {
        text-decoration: none;
        path:not(:nth-last-child(2)):not(:last-child) {
            fill: black;
        }
    }
`

export const NavbarStyles = {
    Navbar,
    NavbarHeightRetainer,
    Item,
    ItemAnchor,
    Logo,

    NavbarItems: styled(typography.FoundersB200)`
        display: flex;
    `,
    NavbarItems__Item: styled.div<{ $circled?: boolean }>`
        display: block;
        cursor: pointer;
        padding: 10px 20px;
        line-height: 1;
        &:hover {
            transition: all 0.2s ease 0s;
            opacity: 0.5;
        }
        ${({ $circled }) =>
            $circled &&
            css`
                border: 1px solid black;
                border-radius: 20px;
                &:hover {
                    transition: all 0.2s ease 0s;
                    background: black;
                    color: white;
                    border-color: white;
                }
            `}
    `,
}
