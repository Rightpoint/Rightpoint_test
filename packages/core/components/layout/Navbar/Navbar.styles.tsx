import {
    cssVarNames,
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

const mediaMobileNav = media('xs', 'md')

const navbarFragments = {
    height: css<NavbarProps>`
        padding-top: 38px;
        transition: height 1s ease 0s;

        ${mediaMobileNav} {
            padding-top: 20px;
        }
    `,
    absolute: css`
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
    `,
    flex: css`
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
    `,
    innerPad: css`
        padding-left: 40px;
        padding-right: 30px;

        ${media('xs', 'sm')} {
            padding-left: 20px;
            padding-right: 20px;
        }
    `,
}

export const NavbarStyles = {
    Navbar: styled.div<NavbarProps>`
        ${navbarFragments.height}
        ${navbarFragments.absolute}
        ${navbarFragments.flex}  
        ${navbarFragments.innerPad}

        z-index: ${zIndexes.stickyNavbar};
        color: var(${cssVarNames.content.colorText}, black);

        ${({ $isSticky }) =>
            $isSticky &&
            css`
                ${NavbarStyles.NavbarItems__Item}:not([data-circled]) {
                    opacity: 0;
                }
                ${NavbarStyles.MenuItem} {
                    opacity: 1;
                }
                g.logo-text-group {
                    opacity: 0;
                }
            `}
    `,

    MenuItem: styled(typography.FoundersB200)`
        ${resets.button}
        padding: 5px 10px;
        &:last-child {
            padding-right: 0;
        }
        cursor: pointer;

        transition: opacity 0.3s ease 0s;
        opacity: 0;
        ${mediaMobileNav} {
            opacity: 1;
        }
    `,

    Logo: styled.div`
        // align logo bottom to text
        transform: translateY(4px);

        > a {
            text-decoration: none;
            display: block;
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
            // prevent invisible logo content from pushing menu off screen
            width: 50px;

            svg {
                height: 31px;
                // visual align
                transform: translateX(-15px) translateY(-9px);
            }
        }
    `,

    NavbarItems: styled(typography.FoundersB200)`
        display: flex;
    `,
    NavbarItems__Item: styled(NextLink)<{
        $active?: boolean
        $circled?: boolean
    }>`
        ${typography.FoundersB200Css}
        display: block;
        cursor: pointer;
        line-height: 1;
        text-decoration: none;
        border-radius: 2px;

        padding: 10px 0px;

        // shrink padding to fit more
        ${media('xs', 'lg')} {
            padding-left: calc(10 / ${breakpoints.lg} * 100vw);
            padding-right: calc(10 / ${breakpoints.lg} * 100vw);
        }

        ${media('lg')} {
            padding-left: 15px;
            padding-right: 15px;
        }

        ${mediaMobileNav} {
            display: none;
        }

        transition: all 0.2s ease 0s;

        ${({ $circled }) =>
            $circled &&
            css`
                margin-left: 13px;
                border: 1px solid var(${cssVarNames.content.colorText});
                border-radius: 20px;
                display: inline-flex;
                justify-content: center;
                padding: 5px 13px 5px 13px;
                align-items: center;
                align-self: center; // don't fill height of parent
                &:hover {
                    border-color: var(${cssVarNames.content.colorText});
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
    `,

    MenuItemAnchor: styled(typography.FoundersMB300).attrs({
        as: 'a',
    })`
        & {
            color: var(${cssVarNames.content.colorText}, black);
            text-decoration: none;
        }
        margin-left: 15px;

        display: flex;
        align-items: baseline;
        justify-content: flex-end;
        height: 100%;

        align-items: center;
    `,

    MenuLabel: styled(typography.TextLink)`
        color: var(${cssVarNames.content.colorText}, black);
        margin-right: 10px;
    `,
    Hamburger: {
        Root: styled.div`
            width: 20px;
            height: 16px;
            display: flex;
            justify-content: space-between;
            flex-direction: column;
            transform: translateY(-1px);
        `,
        Line: styled.div`
            height: 2px;
            background: var(${cssVarNames.content.colorText}, black);
        `,
    },
}
