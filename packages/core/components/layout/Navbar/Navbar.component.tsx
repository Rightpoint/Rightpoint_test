import { FC, useEffect, useState } from 'react'

import { NavbarStyles as s } from './Navbar.styles'
import { NavbarItemData } from '@rightpoint/core/types'
import { colors, TestIds } from '@rightpoint/core/variables'
import { cssVarNames, icons } from '@rightpoint/core/styles'
import { useNavbarPopupToggleDispatch } from '../NavbarPopup/NavbarPopup.hooks'
import { useScroll } from 'framer-motion'
import { useAppSelector, navbarSelectors } from '@rightpoint/core/redux'
import { NavbarPopup } from '../NavbarPopup/NavbarPopup.component'
import { isSameBasePath } from '../../utils/url'
import { Link } from '../../links/Link/Link.component'
import { useRouter } from 'next/router'
import { contentColorDefinitions } from '../RootComponent/background-color'

const Logo = ({ textVisible }) => {
    return (
        <s.Logo $textVisible={textVisible}>
            <Link href="/" aria-label="Rightpoint home" tabIndex={40}>
                <icons.LogoRightpointGenpact aria-label="Rightpoint logo" />
            </Link>
        </s.Logo>
    )
}

const Menu = () => {
    const dispatchToggle = useNavbarPopupToggleDispatch()
    return (
        <s.MenuItem
            as="button"
            type="button"
            onClick={dispatchToggle}
            data-testid={TestIds.NavbarToggle}
        >
            <s.MenuItemAnchor>
                <span>Menu</span>
                <icons.Menu style={{ marginLeft: '1rem' }} />
            </s.MenuItemAnchor>
        </s.MenuItem>
    )
}

const NavbarItems = ({ isNavbarSticky }) => {
    const items = [
        {
            href: '/industries/mobility',
            label: 'Industries',
        },
        {
            href: '/solutions',
            label: 'Solutions',
        },
        {
            href: '/work/all',
            label: 'Work',
        },
        {
            href: '/thought',
            label: 'Thinking',
        },
        {
            href: '/inside-rightpoint',
            label: 'About',
        },
    ]

    const router = useRouter()

    const isActiveLink = (href: string) => {
        return isSameBasePath(href, router.asPath)
    }

    return (
        <s.NavbarItems>
            {items.map((linkProps, index) => (
                <s.NavbarItems__Item
                    key={index}
                    $active={isActiveLink(linkProps.href)}
                    href={linkProps.href}
                >
                    {linkProps.label}
                </s.NavbarItems__Item>
            ))}

            <s.NavbarItems__Item $circled={true} data-circled href={'/contact'}>
                Contact
            </s.NavbarItems__Item>

            <Menu />
        </s.NavbarItems>
    )
}
export interface NavbarProps {
    items?: NavbarItemData[]
    sticky?: boolean

    // a version of the navbar on the homepage sticks after you scroll past an intro
    belowFoldVariant?: boolean
}
export const Navbar: FC<NavbarProps> = ({ sticky = false }) => {
    const [isSticky, setIsSticky] = useState(sticky)
    const { scrollY } = useScroll()
    const STICK_THRESHOLD = 1

    useEffect(() => {
        return scrollY.on('change', (y) => {
            if (!isSticky && y > STICK_THRESHOLD) {
                setIsSticky(true)
            }
            if (isSticky && y < STICK_THRESHOLD) {
                setIsSticky(false)
            }
        })
    }, [isSticky, scrollY, STICK_THRESHOLD])
    const isOpen = useAppSelector(navbarSelectors.isOpen)

    const [colorHex, setColorHex] = useState(null)

    const checkItemBelowColor = () => {
        const getColorTextShouldBe = () => {
            /**
             * Check if element behind navbar has background colors
             * that require the navbar to change color
             */
            const firstBgElement = document.querySelector(
                '[data-background-vars]'
            )
            const NAV_HEIGHT = 50
            /**
             * Elements that set BG color vars have a `data-background-vars` data attribute.
             *
             * Find the first one, and see if at the top of the page.
             */
            const exists = (el: Element): el is HTMLElement => {
                return !!el
            }
            // TODO: on scroll
            if (exists(firstBgElement)) {
                const isAtTopOfPage = firstBgElement.offsetTop <= NAV_HEIGHT
                if (isAtTopOfPage) {
                    console.log('Is at top of page')
                    // try a content color lookup if it contains a value
                    // like data-*"Light"
                    const contentColorValue =
                        firstBgElement.dataset.backgroundVars
                    // find a match in our content color definitions
                    const definition =
                        contentColorDefinitions[contentColorValue]
                    if (definition) {
                        return definition.colorText
                    } else {
                        // otherwise, extract it from the CSS
                        // because most components commonly have an optional RootComponent level background
                        const style = getComputedStyle(firstBgElement)
                        const color = style.getPropertyValue(
                            cssVarNames.content.colorText
                        )
                        return color
                    }
                }
            }
        }
        const textColor = getColorTextShouldBe()
        setColorHex(textColor ?? null)
    }

    const router = useRouter()
    useEffect(() => {
        const handler = () => {
            setTimeout(() => {
                checkItemBelowColor()
            }, 50)
        }
        router.events.on('routeChangeComplete', handler)
        return () => {
            router.events.off('routeChangeComplete', handler)
        }
    }, [router.events, setColorHex])

    useEffect(() => {
        // TODO: continuously check
        if (!isSticky) {
            checkItemBelowColor()
        } else {
            setColorHex(null)
        }
    }, [isSticky])

    return (
        <>
            <NavbarPopup />
            <s.Navbar
                data-testid={TestIds.Navbar}
                $isSticky={isSticky}
                $isPopupOpen={isOpen}
                as="nav"
                aria-label="Main"
                style={{
                    [cssVarNames.content.colorText]: colorHex || colors.black,
                }}
            >
                <Logo textVisible={!isSticky} />

                <NavbarItems isNavbarSticky={isSticky} />
            </s.Navbar>
        </>
    )
}
