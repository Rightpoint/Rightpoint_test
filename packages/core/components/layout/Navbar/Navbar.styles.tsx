import {
    cssVarNames,
    icons,
    resets,
    typography,
    zIndexes,
} from '@rightpoint/core/styles'
import styled, { css } from 'styled-components'
import { media } from '@rightpoint/core/styles'
import { breakpoints } from '@rightpoint/core/styles'
import NextLink from 'next/link'

type NavbarProps = {
    $isSticky?: boolean
    $isPopupOpen?: boolean
}
const navbarHeightPx = '84px'
const navbarHeightMobilePx = '65px'
const navbarHeight = css<NavbarProps>`
    height: ${navbarHeightMobilePx};
    padding-top: 20px;
    transition: height 1s ease 0s;

    ${media('md')} {
        height: ${navbarHeightPx};
    }
`

const mediaMobileNav = media('xs', 'md')

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

    ${media('xs', 'sm')} {
        padding-left: 20px;
        padding-right: 20px;
    }
`

const Navbar = styled.div<NavbarProps>`
    ${navbarHeight}
    ${navbarAbsolutePosition}
    ${navbarFlex}  
    ${navbarInnerPad}
    z-index: ${zIndexes.stickyNavbar};
    color: var(${cssVarNames.content.colorText}, black);

    position: fixed;

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

    ${({ $isSticky }) =>
        $isSticky &&
        css`
            ${NavbarStyles.NavbarItems__Item}:not([data-circled]) {
                opacity: 0;
            }
            ${MenuItem} {
                opacity: 1;
            }
            g.logo-text-group {
                opacity: 0;
            }
        `}
`

const itemXPad = 10
const itemYPad = 5

const MenuItem = styled(typography.BodyL).attrs({
    $fontFamily: 'serif',
})<{ $visible?: boolean }>`
    ${resets.button}

    transition: opacity 0.3s ease 0s;
    opacity: 0;
    ${mediaMobileNav} {
        opacity: 1;
    }

    padding: ${itemYPad}px ${itemXPad}px;

    margin-left: 23px;

    cursor: pointer;
`

const MenuItemAnchor = styled(typography.FoundersMB300).attrs({
    as: 'a',
})`
    & {
        color: var(${cssVarNames.content.colorText}, black);
        text-decoration: none;
    }

    display: flex;
    align-items: baseline;
    justify-content: flex-end;
    height: 100%;

    ${media('md')} {
        align-items: center;
    }
`

const LogoWrapper = styled.div`
    a {
        &:focus {
            outline: 1px solid var(${cssVarNames.colors.coral});
        }
    }
`

const Logo = styled.div<{ $textVisible?: boolean }>`
    > a {
        text-decoration: none;
    }
    svg {
        g.logo-text-group {
            transition: opacity 0.3s ease 0s;
            ${mediaMobileNav} {
                opacity: 0;
            }
        }
    }
    ${media('xs', 'sm')} {
        svg {
            max-width: 50vw;
            height: auto;
        }
    }
`

export const NavbarStyles = {
    Navbar,
    MenuItemAnchor,
    MenuItem,
    Logo,

    NavbarItems: styled(typography.FoundersB200)`
        display: flex;
        overflow: hidden;
    `,
    NavbarItems__Item: styled(NextLink)<{
        $active?: boolean
        $circled?: boolean
    }>`
        display: block;
        cursor: pointer;
        padding: 10px 20px;
        line-height: 1;
        text-decoration: none;

        ${media('xs', 'lg')} {
            padding: 10px calc(20 / ${breakpoints.lg} * 100vw);
        }

        ${mediaMobileNav} {
            display: none;
        }

        transition: all 0.2s ease 0s;

        ${({ $circled }) =>
            $circled &&
            css`
                border: 1px solid var(${cssVarNames.content.colorText});
                border-radius: 20px;

                &:hover {
                    background: 
                    border-color: var(${cssVarNames.content.colorTextHover});
                }
            `}

        ${({ $active }) =>
            $active
                ? css`
                      text-decoration: underline;
                  `
                : css`
                      &:hover {
                          opacity: 0.7;
                      }
                  `}
    `,
}
