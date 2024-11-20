import { FC, useCallback, useEffect, useId, useState } from 'react'
import { NavbarStyles as s } from './Navbar.styles'
import { NavbarItemData } from '@rightpoint/core/types'
import { colors, dataAttributes, TestIds } from '@rightpoint/core/variables'
import { cssVarNames, icons, resets } from '@rightpoint/core/styles'
import { useNavbarPopupToggleDispatch } from '../NavbarPopup/NavbarPopup.hooks'
import { AnimatePresence, LayoutGroup, motion, useScroll } from 'framer-motion'
import { useAppSelector, navbarSelectors } from '@rightpoint/core/redux'
import { isSameBasePath } from '../../utils/url'
import { Link, LinkProps } from '../../links/Link/Link.component'
import { useRouter } from 'next/router'
import { contentColorDefinitions } from '../RootComponent/background-color'
import { getHardCodedNavbarItems } from './Navbar.hard-coded-data'
import { throttle } from 'lodash'
import { ConditionalWrapper } from '@rightpoint/core/utils'

const Logo = () => {
    return (
        <s.Logo>
            <Link href="/" aria-label="Rightpoint logo">
                <icons.LogoRightpointGenpact />
            </Link>
        </s.Logo>
    )
}

export const Menu = () => {
    const dispatchToggle = useNavbarPopupToggleDispatch()
    const isNavbarPopupOpen = useAppSelector(navbarSelectors.isOpen)
    const id = useId()
    return (
        <s.MenuItem
            as="button"
            type="button"
            onClick={dispatchToggle}
            data-testid={TestIds.NavbarToggle}
            aria-labelledby={id}
        >
            <s.MenuItemAnchor>
                <s.MenuLabel id={id}>
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

const DropdownItem = (linkProps) => {
    const router = useRouter()
    const isActive = isSameBasePath(linkProps.href, router.asPath, {
        exactMatch: true,
    })

    return (
        <s.Item__Dropdown__Item>
            <Link
                {...linkProps}
                noDecoration
                noDecorationAddHover
                addDecoration={isActive}
            >
                {linkProps.text}
            </Link>
        </s.Item__Dropdown__Item>
    )
}

const ActiveItemIndicator = () => {
    return (
        <motion.div layoutId="navbar-underline">
            <s.Item__Active />
        </motion.div>
    )
}

export interface NavbarItemProps {
    linkProps: LinkProps
    circled?: boolean
    dropdownLinksProps?: LinkProps[]
    isNavbarHovered?: boolean
}

const NavbarItem: FC<NavbarItemProps> = ({
    linkProps,
    circled,
    dropdownLinksProps,

    isNavbarHovered,
}) => {
    const router = useRouter()

    const isActive = isSameBasePath(linkProps.href, router.asPath, {
        exactMatch: false,
        matchDepth: 1,
    })

    const [isDropdownOpen, setIsDropdownOpen] = useState(false)

    /**
     * Hide dropdown nav on change
     */
    useEffect(() => {
        const handleRouteChange = () => {
            setIsDropdownOpen(false)
        }
        router.events.on('routeChangeStart', handleRouteChange)
        return () => {
            router.events.off('routeChangeStart', handleRouteChange)
        }
    }, [router.events])

    const [isItemHovered, setIsItemHovered] = useState(false)

    return (
        <s.NavbarItems__Item
            {...(circled
                ? {
                      $circled: true,
                      'data-circled': true, // used by css
                  }
                : {})}
            onMouseEnter={() => {
                setIsItemHovered(true)
                if (dropdownLinksProps) {
                    setIsDropdownOpen(true)
                }
            }}
            onMouseLeave={() => {
                setIsItemHovered(false)

                if (dropdownLinksProps) {
                    setIsDropdownOpen(false)
                }
            }}
        >
            <s.Item__Positioner>
                <ConditionalWrapper
                    condition={Boolean(linkProps?.href)}
                    wrapper={(children) => (
                        <Link {...linkProps} noDecoration>
                            {children}
                        </Link>
                    )}
                >
                    {linkProps.text}
                </ConditionalWrapper>

                {/* if navbar is hovered, prioritize the isItem hovered */}
                {(isNavbarHovered ? isItemHovered : isActive) && (
                    <ActiveItemIndicator />
                )}

                <AnimatePresence>
                    {isDropdownOpen && dropdownLinksProps && (
                        <s.Item__Dropdown
                            as={motion.div}
                            transition={{
                                ease: [0.07, 0.61, 0.44, 0.87],
                            }}
                            initial={{
                                opacity: 0,
                                y: -5,
                            }}
                            animate={{
                                opacity: 1,
                                y: 0,
                            }}
                            exit={{
                                opacity: 0,
                                y: -5,
                            }}
                        >
                            {dropdownLinksProps.map((linkProps, index) => {
                                return (
                                    <DropdownItem {...linkProps} key={index} />
                                )
                            })}
                        </s.Item__Dropdown>
                    )}
                </AnimatePresence>
            </s.Item__Positioner>
        </s.NavbarItems__Item>
    )
}

const NavbarItems = ({ items }) => {
    const [isNavbarHovered, setIsNavbarHovered] = useState(false)
    return (
        <s.NavbarItems>
            <s.NavbarItemsHoverable
                onMouseEnter={() => {
                    setIsNavbarHovered(true)
                }}
                onMouseLeave={() => {
                    setIsNavbarHovered(false)
                }}
            >
                {items.map((linkProps, index) => (
                    <NavbarItem
                        {...linkProps}
                        key={index}
                        isNavbarHovered={isNavbarHovered}
                    />
                ))}
            </s.NavbarItemsHoverable>

            <Menu />
        </s.NavbarItems>
    )
}
export interface NavbarProps {
    items?: NavbarItemData[]

    // a version of the navbar on the homepage sticks after you scroll past an intro
    belowFoldVariant?: boolean
}
export const Navbar: FC<NavbarProps> = () => {
    const [isNavbarCompact, setIsNavbarCompact] = useState(false)
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

    const handleNavbarColor = useCallback(
        throttle(
            () => {
                // this is heavily throttled
                // logDevelopmentOnly('Navbar color check')
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
                                    element.dataset[
                                        dataAttributes.content.datasetName
                                    ]
                                return Boolean(contentColorDataAttributeValue)
                            }
                        }
                    ) as HTMLElement[] // we are filtering by HTMLElement type
                    const contentColorElement =
                        contentColorElementsAtPoint.slice(0)[0]

                    if (!contentColorElement) {
                        return null
                    }

                    /**
                     * We have a content color element
                     */
                    const contentColorValue =
                        contentColorElement.dataset[
                            dataAttributes.content.datasetName
                        ]

                    /**
                     * Finding a matching content color definition, which has color values
                     */
                    const definition =
                        contentColorDefinitions[contentColorValue]

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
            },
            200,
            {
                leading: true,
                trailing: true,
            }
        ),
        [setColorHex]
    )

    const router = useRouter()
    useEffect(() => {
        const handler = () => {
            handleNavbarColor()
            setTimeout(() => {
                handleNavbarColor()
            }, 100)
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

    /**
     * Poll for navbar colors just in case a non scroll event causes movement
     * i.e. keyboard, or popup, mouse, etc.
     */
    useEffect(() => {
        const intervalId = setInterval(() => {
            handleNavbarColor()
        }, 1000)

        return () => {
            clearInterval(intervalId)
        }
    }, [])

    /**
     * Set isLoaded to true after the first render
     * to fade in the navbar after the initial SSR render.
     * - This prevents the navbar from flashing on the screen as it determines what color it should be
     * - Is also the hook / place to add initial on-load animations
     */
    const [isLoaded, setIsLoaded] = useState(false)
    useEffect(() => {
        setIsLoaded(true)
    }, [])

    return (
        <>
            <s.Navbar
                className="navbar"
                data-testid={TestIds.Navbar}
                $isLoaded={isLoaded}
                $isSticky={isNavbarCompact}
                $isPopupOpen={isNavbarPopupOpen}
                as={motion.nav}
                aria-label="Main"
                style={{
                    // default to black
                    [cssVarNames.content.colorText]: colorHex || colors.black,
                }}
                /**
                 * Prevent animations from sliding upwards when navigation is sticky.
                 * Makes layout animations relative to this element i.e. x axis only
                 */
                layoutRoot
            >
                <Logo />

                <NavbarItems items={getHardCodedNavbarItems()} />
            </s.Navbar>
        </>
    )
}
