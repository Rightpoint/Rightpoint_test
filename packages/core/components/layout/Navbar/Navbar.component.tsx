import { FC, useEffect, useState } from 'react'
import { NavbarStyles as s } from './Navbar.styles'
import { NavbarItemData } from '@rightpoint/core/types'
import { colors, dataAttributes, TestIds } from '@rightpoint/core/variables'
import { cssVarNames, icons, resets } from '@rightpoint/core/styles'
import { useNavbarPopupToggleDispatch } from '../NavbarPopup/NavbarPopup.hooks'
import { motion, useScroll } from 'framer-motion'
import { useAppSelector, navbarSelectors } from '@rightpoint/core/redux'
import { NavbarPopup } from '../NavbarPopup/NavbarPopup.component'
import { isSameBasePath } from '../../utils/url'
import { Link, LinkProps } from '../../links/Link/Link.component'
import { useRouter } from 'next/router'
import { contentColorDefinitions } from '../RootComponent/background-color'
import { getHardCodedNavbarItems } from './Navbar.hard-coded-data'
import { logDevelopmentOnly } from '@rightpoint/core/utils'

const Logo = () => {
    return (
        <s.Logo>
            <Link href="/" aria-label="Rightpoint home">
                <icons.LogoRightpointGenpact aria-label="Rightpoint logo" />
            </Link>
        </s.Logo>
    )
}

const Menu = () => {
    const dispatchToggle = useNavbarPopupToggleDispatch()
    const isNavbarPopupOpen = useAppSelector(navbarSelectors.isOpen)
    return (
        <s.MenuItem
            as="button"
            type="button"
            onClick={dispatchToggle}
            data-testid={TestIds.NavbarToggle}
        >
            <s.MenuItemAnchor>
                <s.MenuLabel>
                    {isNavbarPopupOpen ? 'Close' : 'Menu'}
                </s.MenuLabel>
                <s.Hamburger.Root>
                    <s.Hamburger.Line />
                    <s.Hamburger.Line />
                    <s.Hamburger.Line />
                </s.Hamburger.Root>
            </s.MenuItemAnchor>
        </s.MenuItem>
    )
}

export interface NavbarItemProps {
    linkProps: LinkProps
    circled?: boolean
}

const NavbarItem: FC<NavbarItemProps> = ({ linkProps, circled }) => {
    const router = useRouter()

    const isActive = isSameBasePath(linkProps.href, router.asPath, {
        exactMatch: false,
    })

    return (
        <s.NavbarItems__Item
            {...linkProps}
            {...(circled
                ? {
                      $circled: true,
                      'data-circled': true, // used by css
                  }
                : {})}
        >
            <s.Item__Positioner>
                {linkProps.text}

                {isActive && (
                    <s.Item__Active
                        as={motion.div}
                        layoutId="navbar-underline"
                    />
                )}
            </s.Item__Positioner>
        </s.NavbarItems__Item>
    )
}

const NavbarItems = ({ items }) => {
    const router = useRouter()

    return (
        <s.NavbarItems>
            {items.map((linkProps, index) => (
                <NavbarItem {...linkProps} key={index} />
            ))}
            {/* 
            <s.NavbarItems__Item $circled={true} data-circled href={'/contact'}>
                Contact
            </s.NavbarItems__Item> */}

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
    const [isNavbarCompact, setIsNavbarCompact] = useState(sticky)
    const { scrollY } = useScroll()
    const STICK_THRESHOLD = 1

    useEffect(() => {
        return scrollY.on('change', (y) => {
            if (!isNavbarCompact && y > STICK_THRESHOLD) {
                setIsNavbarCompact(true)
            }
            if (isNavbarCompact && y < STICK_THRESHOLD) {
                setIsNavbarCompact(false)
            }
        })
    }, [isNavbarCompact, scrollY, STICK_THRESHOLD])

    const isNavbarPopupOpen = useAppSelector(navbarSelectors.isOpen)

    /**
     * REFACTOR: These color related functions should be moved to a
     * new hook rather than being in the component.
     *
     * - Separate out logic
     * - Makes it reusable
     */
    const [colorHex, setColorHex] = useState(null)
    const handleNavbarColor = () => {
        /**
         * TODO:PERFORMANCE
         * This fires too often, even with the framer-motion throttle/debounce.
         *
         * Throttle it again.
         */
        const getColorFromElementsUnderNavbar = () => {
            /**
             * Check if element behind navbar has background colors
             * that require the navbar to change color.
             *
             * Elements that set content color define the navbar color.
             */
            const elementsAtPoint = document.elementsFromPoint(0, 50)

            const contentColorElementsAtPoint = elementsAtPoint.filter(
                (element) => {
                    if (element instanceof HTMLElement) {
                        // if it has content color, filter by it
                        const contentColorDataAttributeValue =
                            element.dataset[dataAttributes.content.datasetName]
                        return Boolean(contentColorDataAttributeValue)
                    }
                }
            ) as HTMLElement[] // we are filtering by HTMLElement type
            const contentColorElement = contentColorElementsAtPoint.slice(0)[0]

            if (!contentColorElement) {
                return null
            }

            /**
             * We have a content color element
             */
            const contentColorValue =
                contentColorElement.dataset[dataAttributes.content.datasetName]

            /**
             * Finding a matching content color definition, which has color values
             */
            const definition = contentColorDefinitions[contentColorValue]

            if (definition) {
                return definition.colorText
            } else {
                // otherwise, extract it from the CSS
                // because most components commonly have an optional RootComponent level background
                const style = getComputedStyle(contentColorElement)
                const color = style.getPropertyValue(
                    cssVarNames.content.colorText
                )
                return color
            }
        }
        const textColor = getColorFromElementsUnderNavbar()
        setColorHex(textColor ?? null)
    }

    const router = useRouter()
    useEffect(() => {
        const handler = () => {
            handleNavbarColor()
            setTimeout(() => {
                handleNavbarColor()
            }, 50)
        }
        router.events.on('routeChangeComplete', handler)
        return () => {
            router.events.off('routeChangeComplete', handler)
        }
    }, [router.events, setColorHex])

    useEffect(() => {
        handleNavbarColor()
        return scrollY.on('change', handleNavbarColor)
    }, [])

    return (
        <>
            <NavbarPopup />
            <s.Navbar
                data-testid={TestIds.Navbar}
                $isSticky={isNavbarCompact}
                $isPopupOpen={isNavbarPopupOpen}
                as="nav"
                aria-label="Main"
                style={{
                    [cssVarNames.content.colorText]: colorHex || colors.black,
                }}
            >
                <Logo />

                <NavbarItems items={getHardCodedNavbarItems()} />
            </s.Navbar>
        </>
    )
}
