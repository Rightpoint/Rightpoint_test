import {
    navbarActions,
    navbarSelectors,
    useAppSelector,
} from '@rightpoint/core/redux'
import { useKeyPress } from '@rightpoint/core/utils'
import { TestIds } from '@rightpoint/core/variables'
import { AnimatePresence, motion } from 'framer-motion'
import { useRouter } from 'next/router'
import { FC, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavbarPopupStyles as s } from './NavbarPopup.styles'
import { NavbarPopupContent } from './NavbarPopupContent/NavbarPopupContent.component'
import { NavbarPopupFooterProps } from './NavbarPopupFooter/NavbarPopupFooter.component'
import {
    BackgroundColors,
    getContentColorStyles,
} from '../RootComponent/background-color'

const animationParams = ({
    duration = 0.5,
    delay = 0,
    exitDelay = 0,
} = {}) => ({
    transition: {
        ease: 'linear',
        duration,
    },
    initial: {
        opacity: 0,
        // translateY: 10,
    },
    animate: {
        opacity: 1,
        translateY: 0,
        transition: {
            delay,
            duration: 1,
        },
    },
    exit: {
        opacity: 0,
        transition: {
            duration: 0.5,
            delay: exitDelay,
        },
    },
})

/**
 * Reminder: GlobalStyle can be conditionally injected
 */
// const GlobalStyle = createGlobalStyle<{
//     $preventScroll?: boolean
//     $isOpen?: boolean
// }>`
//     ${({ $isOpen }) =>
//         $isOpen
//             ? css`
//                   ${media('md')} {
//                       ${NavigationBarStyles.NavigationBar} {
//                           display: none;
//                       }
//                   }
//               `
//             : css``}
// `

export interface NavbarPopupProps {
    footerProps?: NavbarPopupFooterProps
}
export const NavbarPopup: FC<NavbarPopupProps> = ({ footerProps }) => {
    const isOpen = useSelector(navbarSelectors.isOpen)

    /**
     * TODO: The preview iframe takes a moment to load -- consider mounting it
     * in idle but hiding the popup.
     */
    const dispatch = useDispatch()
    const router = useRouter()

    const isPreviewMounted = useAppSelector(
        navbarSelectors.selectIsPreviewMounted
    )

    /**
     * Temporary toggle to enable/disable preview mode.
     * @deprecated -- but can be used for the new cards layout
     */
    const isPreviewEnabled = useAppSelector(
        navbarSelectors.selectIsPreviewEnabled
    )
    const hasPreviewUrl = useAppSelector(navbarSelectors.selectPreviewUrl)

    /**
     * Close navbar on route changes.
     *
     * If preview is not mounted.
     * If preview is mounted, it will animate and control navigation/navbar closing.
     */
    useEffect(() => {
        const handleRouteChange = (url, { shallow }) => {
            dispatch(navbarActions.close())
        }
        if (isPreviewMounted) {
            // preview is mounted
            // then close depends on the close handler.
        } else {
            router.events.on('routeChangeComplete', handleRouteChange)
        }
        return () => {
            router.events.off('routeChangeComplete', handleRouteChange)
        }
    }, [dispatch, router.events, isPreviewMounted])

    const ref = useRef<HTMLDivElement>(null)

    // useEffect(() => {
    //     if (isOpen) {
    //         disableBodyScroll(ref.current)
    //     } else {
    //         enableBodyScroll(ref.current)
    //     }
    // }, [ref, isOpen])

    useKeyPress({
        key: 'Escape',
        callback: () => {
            dispatch(navbarActions.close())
        },
    })

    return (
        <>
            {/* <GlobalStyle $isOpen={isOpen} $preventScroll={isOpen} /> */}
            <AnimatePresence>
                {isOpen && (
                    <s.Blur
                        as={motion.div}
                        initial={{ opacity: 0 }}
                        animate={{
                            opacity: 1,
                            transition: {
                                delay: 0,
                                duration: 0.15,
                            },
                        }}
                        exit={{
                            opacity: 0,
                            transition: {
                                delay: 0.2,
                                duration: 0.15,
                            },
                        }}
                        style={{
                            ...getContentColorStyles({
                                backgroundColor: BackgroundColors.Black,
                            }),
                        }}
                    >
                        <s.NavbarPopupInner
                            data-testid={TestIds.NavbarPopupInner}
                            ref={ref}
                        >
                            <NavbarPopupContent />
                        </s.NavbarPopupInner>
                    </s.Blur>
                )}
            </AnimatePresence>
        </>
    )
}
