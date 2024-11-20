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
import { colors } from '@rightpoint/core/variables'

type NavbarProps = {
    $isSticky?: boolean
    $isPopupOpen?: boolean
    $isLoaded?: boolean
}

const mediaMobileNav = media('xs', 'sm')
const mediaDesktopNav = media('md')

const navbarFragments = {
    height: css`
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

        ${media('xs', 'md')} {
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

        pointer-events: none;

        z-index: ${zIndexes.stickyNavbar};
        color: var(${cssVarNames.content.colorText}, black);

        opacity: 0;
        transition: opacity 0.5s ease 0.2s;
        ${({ $isLoaded }) =>
            $isLoaded &&
            css`
                opacity: 1;
            `}

        ${({ $isSticky, $isPopupOpen }) =>
            ($isSticky || $isPopupOpen) &&
            css`
                // hide navbar items
                ${NavbarStyles.NavbarItems__Item}:not([data-circled]) {
                    opacity: 0;
                    pointer-events: none;
                    ${$isSticky && `transform: translateX(20%);`}
                }
                ${NavbarStyles.NavbarItems__Item}[data-circled] {
                }
                // hide logo text
                g.logo-text-group {
                    transform: translateX(${$isPopupOpen ? '0%' : '-5%'});
                    opacity: 0;
                    pointer-events: none;
                }
            `}

        ${({ $isSticky }) =>
            $isSticky
                ? css`
                      ${NavbarStyles.NavbarItem__Item} {
                          transition-delay: 0s;
                      }
                      ${media('xs', 'md')} {
                          ${NavbarStyles.Logo} {
                              svg {
                                  transform: translateX(-28px) translateY(-5px);
                                  .logo-mark {
                                      transition-delay: 0.5s;
                                      transform: translateX(2px)
                                          translateY(-50px) scale(1.25);
                                  }
                              }
                          }
                      }
                  `
                : css`
                      ${media('xs', 'md')} {
                          ${NavbarStyles.Logo} {
                              svg {
                                  transition: transform 0.1s ease 0.5s;
                              }
                          }
                      }
                  `}

        ${({ $isPopupOpen }) =>
            // if the popup is open, show the navbar logo, hide the contact button, and show the menu (hamburger)
            $isPopupOpen &&
            css`
                && {
                    ${NavbarStyles.NavbarItems__Item}:not([data-circled]) {
                        transition-delay: 0s;
                    }
                    ${cssVarNames.content
                        .colorText}: ${colors.white} !important;
                    ${mediaDesktopNav} {
                        // show logo text
                        g.logo-text-group {
                            opacity: 1;
                            transition-delay: 0.3s;
                        }
                    }
                    // hide contact
                    ${NavbarStyles.NavbarItems__Item}[data-circled] {
                        opacity: 1;
                    }
                    ${NavbarStyles.Hamburger.Line} {
                        transition: 0.3s ease 0s;
                        &:nth-child(1) {
                            transform: rotate(-45deg);
                        }
                        &:nth-child(2) {
                            opacity: 0;
                            pointer-events: none;
                        }
                        &:nth-child(3) {
                            transform: rotate(45deg);
                        }
                    }
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

        pointer-events: all;
        opacity: 1;
    `,

    Logo: styled.div`
        // align logo bottom to text
        transform: translateY(4px);

        > a {
            text-decoration: none;
            display: block;
            pointer-events: all;
        }
        svg {
            g.logo-text-group {
                transition: opacity 0.3s ease 0s, transform 0.5s ease 0s;
            }
        }
        ${media('xs', 'sm')} {
            // prevent invisible logo content from pushing menu off screen
            width: 48px;

            svg {
                display: block;
                height: 29px;
                transform: translateX(-24px) translateY(0);
                transition: transform 0.3s ease 0.5s;
                g.logo-text-group {
                    transition-delay: 0.5s;
                }
                .logo-mark {
                    transition: all 1s ease 0.5s;
                }
            }
        }
    `,

    NavbarItems: styled(typography.FoundersB200)`
        display: flex;
    `,

    NavbarItemsHoverable: styled(typography.FoundersB200)`
        display: flex;
        position: relative;
    `,

    NavbarItems__Item: styled.div<{
        $active?: boolean
        $isContact?: boolean
    }>`
        ${typography.FoundersB200Css}
        display: block;
        cursor: pointer;
        line-height: 1;
        text-decoration: none;
        border-radius: 2px;

        padding-top: 10px;
        padding-bottom: 10px;
        pointer-events: all;

        // prevent highlighting
        user-select: none;

        // shrink padding to fit more items
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

        transition: all 0.3s ease 0s;

        ${({ $isContact }) =>
            $isContact &&
            css`
                transition: all 0.3s ease;

                margin-left: 13px;

                // border: 1px solid var(${cssVarNames.content.colorText});
                background: var(${cssVarNames.colors.accent});
                color: var(${cssVarNames.content.colorText});
                border-radius: 20px;
                display: inline-flex;
                justify-content: center;
                padding: 5px 13px 5px 13px;
                align-items: center;
                align-self: center; // don't fill height of parent
                // white-space: nowrap;

                &:after {
                    content: 'Us';
                    margin-left: 0.3em;
                }
                &:hover {
                    filter: brightness(1.1);
                }
                ${NavbarStyles.Item__Active} {
                    opacity: 0 !important;
                }

                ${
                    media('mobileSm', 'sm')
                    // contact button displays on 360px+ mobile screens
                } {
                    display: block;
                    margin-right: -15px;
                    padding-left: 7px;
                    padding-right: 7px;
                    &:after {
                        content: none;
                    }
                }
            `}
    `,

    // position the active underline under text.
    Item__Positioner: styled.div`
        position: relative;
    `,

    Item__Active: styled.div`
        position: absolute;
        bottom: -5px;
        left: 0;
        right: 0;
        height: 1px;
        background: var(
            ${typography.utils.cssVarNames.content.colorText},
            black
        );
    `,

    /**
     * Use padding to maintain cursor priority
     */
    Item__Dropdown: styled.div`
        position: absolute;

        top: 0;
        left: 0;

        padding-top: 70px;
    `,
    Item__Dropdown__Item: styled(typography.FoundersB200)`
        white-space: nowrap;
        a {
            display: block;
        }
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
            transition: all 0.3s ease 0s;

            &:nth-child(1) {
                transform-origin: right;
            }
            &:nth-child(2) {
            }
            &:nth-child(3) {
                transform-origin: right;
            }
        `,
    },
}
