import { FC, useEffect, useState } from 'react'

import { NavbarStyles as s } from './Navbar.styles'
import { NavbarItemData } from '@rightpoint/core/types'
import { TestIds } from '@rightpoint/core/variables'
import { cssVarNames, icons } from '@rightpoint/core/styles'
import { useNavbarPopupToggleDispatch } from '../NavbarPopup/NavbarPopup.hooks'
import { useScroll } from 'framer-motion'
import { useAppSelector, navbarSelectors } from '@rightpoint/core/redux'
import { NavbarPopup } from '../NavbarPopup/NavbarPopup.component'
import { useResponsiveQuery } from 'atomic-layout'
import { isSameBasePath } from '../../utils/url'
import { Link } from '../../general/Link/Link.component'
import { useRouter } from 'next/router'
import { contentColorDefinitions } from '../RootComponent/background-color'

const Logo = ({ textVisible }) => {
    return (
        <s.Logo $textVisible={textVisible}>
            <Link href="/" aria-label="Rightpoint home" tabIndex={40}>
                <icons.Logo aria-label="Rightpoint logo" />
            </Link>
        </s.Logo>
    )
}

const Menu = ({ visible }) => {
    const dispatchToggle = useNavbarPopupToggleDispatch()
    return (
        <s.MenuItem
            as="button"
            type="button"
            onClick={dispatchToggle}
            data-testid={TestIds.NavbarToggle}
            $visible={visible}
        >
            <s.MenuItemAnchor>
                <span>Menu</span>
                <icons.Menu style={{ marginLeft: '1rem' }} />
            </s.MenuItemAnchor>
        </s.MenuItem>
    )
}

const NavbarItems = ({ isNavbarSticky }) => {
    const isMobile = useResponsiveQuery({ from: 'xs', to: 'md' })

    const items = [
        {
            href: '/industries',
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
            {!isMobile &&
                items.map((linkProps, index) => (
                    <s.NavbarItems__Item
                        key={index}
                        $active={isActiveLink(linkProps.href)}
                        $visible={!isNavbarSticky}
                        href={linkProps.href}
                    >
                        {linkProps.label}
                    </s.NavbarItems__Item>
                ))}

            {!isMobile && (
                <s.NavbarItems__Item $circled href={'/contact'}>
                    Contact
                </s.NavbarItems__Item>
            )}

            <Menu visible={isMobile || isNavbarSticky} />
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
    const [isPreSticky, setIsPreSticky] = useState(sticky)
    const { scrollY } = useScroll()
    const PRE_STICK_THRESHOLD = 300
    const STICK_THRESHOLD = 400

    useEffect(() => {
        return scrollY.on('change', (y) => {
            if (!isPreSticky && y > PRE_STICK_THRESHOLD) {
                setIsPreSticky(true)
            }
            if (isPreSticky && y < PRE_STICK_THRESHOLD) {
                setIsPreSticky(false)
            }
            if (!isSticky && y > STICK_THRESHOLD) {
                setIsSticky(true)
            }
            if (isSticky && y < STICK_THRESHOLD) {
                setIsSticky(false)
            }
        })
    }, [isSticky, scrollY, STICK_THRESHOLD, isPreSticky])
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
        if (!isSticky && !isPreSticky) {
            checkItemBelowColor()
        } else {
            setColorHex(null)
        }
    }, [isSticky, isPreSticky])

    return (
        <>
            <NavbarPopup />
            <s.Navbar
                data-testid={TestIds.Navbar}
                $isPreSticky={isPreSticky}
                $isSticky={isSticky}
                $isPopupOpen={isOpen}
                as="nav"
                aria-label="Main"
                style={{
                    [cssVarNames.content.colorText]: colorHex,
                }}
            >
                <Logo textVisible={!isSticky} />

                <NavbarItems isNavbarSticky={isSticky} />
            </s.Navbar>
        </>
    )
}

// const NavbarBelowFold: FC<NavbarProps & { ref?: ForwardedRef<any> }> =
//     forwardRef(({ sticky = false }, ref) => {
//         const [isSticky, setIsSticky] = useState(sticky)
//         const { scrollY } = useScroll()
//         const isOpen = useAppSelector(navbarSelectors.isOpen)

//         const innerRef = useRef<HTMLDivElement>(null)
//         // https://stackoverflow.com/questions/68162617/whats-the-correct-way-to-use-useref-and-forwardref-together
//         useImperativeHandle(ref, () => innerRef.current)

//         useEffect(() => {
//             if (innerRef.current) {
//                 const stickThreshold = innerRef.current.offsetTop
//                 return scrollY.onChange((y) => {
//                     if (!isSticky && y > stickThreshold) {
//                         setIsSticky(true)
//                         console.log(y, stickThreshold)
//                     }
//                     if (isSticky && y < stickThreshold) {
//                         setIsSticky(false)
//                     }
//                 })
//             }
//         }, [isSticky, scrollY, ref])

//         return (
//             <>
//                 <s.NavbarHeightRetainer ref={innerRef}>
//                     <s.Navbar
//                         data-testid={TestIds.Navbar}
//                         $isSticky={isSticky}
//                         $isPreSticky={isSticky}
//                         $isPopupOpen={isOpen}
//                         as="nav"
//                         aria-label="Main"
//                         $belowFoldVariant
//                     >
//                         <Contact />
//                         <Logo />
//                         <Menu />
//                     </s.Navbar>
//                 </s.NavbarHeightRetainer>
//                 <NavbarPopupDynamic />
//             </>
//         )
//     })
// NavbarBelowFold.displayName = 'NavbarBelowFold'

// Navbar.displayName = 'Navbar'
