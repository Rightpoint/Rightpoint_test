import { FC, useEffect, useState } from 'react'
import Link from 'next/link'
import { NavbarStyles as s } from './Navbar.styles'
import { NavbarItemData } from '@rightpoint/core/types'
import { TestIds } from '@rightpoint/core/variables'
import { cssVarNames, icons } from '@rightpoint/core/styles'
import { useNavbarPopupToggleDispatch } from '../NavbarPopup/NavbarPopup.hooks'
import { useScroll } from 'framer-motion'
import { useAppSelector, navbarSelectors } from '@rightpoint/core/redux'
import { NavbarPopup } from '../NavbarPopup/NavbarPopup.component'

const Contact = () => {
    return (
        <s.Item data-testid={TestIds.NavbarContact}>
            <Link href={'/contact'} passHref tabIndex={50} legacyBehavior>
                <s.ItemAnchor>Contact</s.ItemAnchor>
            </Link>
        </s.Item>
    )
}

const Logo = () => {
    return (
        <s.Logo>
            <Link href="/" aria-label="Rightpoint home" tabIndex={40}>
                <icons.Logo aria-label="Rightpoint logo" />
            </Link>
        </s.Logo>
    )
}

const Menu = ({}) => {
    const dispatchToggle = useNavbarPopupToggleDispatch()
    return (
        <s.Item
            as="button"
            type="button"
            onClick={dispatchToggle}
            data-testid={TestIds.NavbarToggle}
            tabIndex={30}
        >
            <s.ItemAnchor>Menu</s.ItemAnchor>
        </s.Item>
    )
}

const NavbarItems = () => {
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
    return (
        <s.NavbarItems>
            {items.map((linkProps) => (
                <Link
                    href={linkProps.href}
                    style={{
                        textDecoration: 'none',
                    }}
                >
                    <s.NavbarItems__Item>{linkProps.label}</s.NavbarItems__Item>
                </Link>
            ))}

            <s.NavbarItems__Item $circled>Contact</s.NavbarItems__Item>
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
        return scrollY.onChange((y) => {
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

    const [color, setColor] = useState(null)
    useEffect(() => {
        if (!isSticky && !isPreSticky) {
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
            if (exists(firstBgElement)) {
                const isAtTopOfPage = firstBgElement.offsetTop < NAV_HEIGHT
                if (isAtTopOfPage) {
                    const style = getComputedStyle(firstBgElement)
                    const color = style.getPropertyValue(
                        cssVarNames.content.colorText
                    )
                    setColor(color)
                }
            }
        } else {
            setColor(null)
        }
    }, [isSticky, isPreSticky])

    return (
        <>
            <s.Navbar
                data-testid={TestIds.Navbar}
                $isPreSticky={isPreSticky}
                $isSticky={isSticky}
                $isPopupOpen={isOpen}
                as="nav"
                aria-label="Main"
                style={{
                    [cssVarNames.content.colorText]: color,
                }}
            >
                <Logo />
                <NavbarItems />
                {/* <Menu /> */}
            </s.Navbar>
            <NavbarPopup />
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
