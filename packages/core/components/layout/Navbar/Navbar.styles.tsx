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
import { Link } from '../../general/Link/Link.component'

type NavbarProps = {
    $isSticky?: boolean
    $isPopupOpen?: boolean
    $isPreSticky?: boolean
    $belowFoldVariant?: boolean
}
const navbarHeightPx = '84px'
const navbarHeightMobilePx = '65px'
const navbarHeight = css<NavbarProps>`
    height: ${navbarHeightMobilePx};
    padding-top: 20px;
    // ${media('xs', 'sm')} {
    //     padding-top: 50px;
    // }
    transition: height 1s ease 0s;

    ${media('md')} {
        height: ${navbarHeightPx};
    }
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

    ${media('xs', 'sm')} {
        padding-left: 20px;
        padding-right: 20px;
    }
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
            background: transparent;
            border-bottom: transparent;
        `}
`

const itemXPad = 10
const itemYPad = 5
const lineHeightFudge = 4

const MenuItem = styled(typography.BodyL).attrs({
    $fontFamily: 'serif',
})<{ $visible?: boolean }>`
    display: none;

    ${resets.button}

    cursor: pointer;

    padding: ${itemYPad}px ${itemXPad}px;

    ${({ $visible }) =>
        $visible &&
        css`
            display: flex;

            ${media('md')} {
                align-items: center;
                justify-content: center;

                span {
                    position: relative;
                    top: 3px;
                }
            }
        `}

    margin-left: 23px;
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

    ${({ $textVisible = true }) =>
        !$textVisible &&
        css`
            g.logo-text-group {
                display: none;
            }
        `}

    ${media('xs', 'sm')} {
        svg {
            max-width: 50vw;
            height: auto;
        }
    }

    ${media('xs', 'lg')} {
        svg {
            g.logo-text-group {
                transform: translateX(-16px);
            }
        }
    }
`

export const NavbarStyles = {
    Navbar,
    NavbarHeightRetainer,
    MenuItemAnchor,
    MenuItem,
    Logo,

    NavbarItems: styled(typography.FoundersB200)`
        display: flex;
    `,
    NavbarItems__Item: styled(Link)<{
        $active?: boolean
        $circled?: boolean
        $visible?: boolean
    }>`
        display: block;
        cursor: pointer;
        padding: 10px 20px;
        line-height: 1;
        text-decoration: none;

        ${media('xs', 'lg')} {
            padding: 10px calc(20 / ${breakpoints.lg} * 100vw);
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
                      text-underline-offset: 8px;
                  `
                : css`
                      &:hover {
                          opacity: 0.7;
                      }
                  `}

                   ${({ $visible = true }) =>
            $visible
                ? css``
                : css`
                      opacity: 0;
                      pointer-events: none;
                  `}
    `,
}
