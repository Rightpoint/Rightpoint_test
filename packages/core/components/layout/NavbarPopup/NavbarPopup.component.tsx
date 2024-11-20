import {
    navbarActions,
    navbarSelectors,
    useAppSelector,
} from '@rightpoint/core/redux'
import { useKeyPress } from '@rightpoint/core/utils'
import { TestIds } from '@rightpoint/core/variables'
import { AnimatePresence, motion } from 'framer-motion'
import { useRouter } from 'next/router'
import { FC, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createGlobalStyle, css } from 'styled-components'
import { media } from '@rightpoint/core/styles'
import { NavigationBarStyles } from '../../general/NavigationBar/NavigationBar.styles'
import { NavbarPopupStyles as s } from './NavbarPopup.styles'
import { NavbarPopupContent } from './NavbarPopupContent/NavbarPopupContent.component'
import { NavbarPopupFooterProps } from './NavbarPopupFooter/NavbarPopupFooter.component'

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

const Logo = () => {
    return (
        <s.LogoWrapper>
            <s.Logo />
        </s.LogoWrapper>
    )
}

const Close = () => {
    const dispatch = useDispatch()

    const setModel = (modalClose: Boolean) => {
        if (modalClose) {
            document.body.style.overflow = 'unset'
        }
    }

    useKeyPress({
        key: 'Escape',
        callback: () => {
            dispatch(navbarActions.close())
        },
    })

    return (
        <s.Close
            onClick={() => {
                dispatch(navbarActions.close())
                setModel(true)
            }}
            as={motion.div}
            {...animationParams({
                delay: 0.3,
                exitDelay: 0,
            })}
            // todo: need global tab focus solution
        >
            Close
            <s.CloseButtonContainer>
                <s.CloseButtonLeft /> <s.CloseButtonRight />
            </s.CloseButtonContainer>
        </s.Close>
    )
}

const GlobalStyle = createGlobalStyle<{
    $preventScroll?: boolean
    $isOpen?: boolean
}>`


    ${({ $isOpen }) =>
        $isOpen
            ? css`
                  ${media('md')} {
                      ${NavigationBarStyles.NavigationBar} {
                          display: none;
                      }
                  }
              `
            : css``}

`
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

    return (
        <>
            <GlobalStyle $isOpen={isOpen} $preventScroll={isOpen} />

            <AnimatePresence>
                {isOpen && (
                    <s.Blur
                        as={motion.div}
                        initial={{ opacity: 0 }}
                        animate={{
                            opacity: 1,
                            transition: {
                                delay: 0.2,
                                // easings: context.blurEasing || 'easeInOut',
                                duration: 0.2,
                            },
                        }}
                        exit={{
                            opacity: 0,
                            transition: {
                                delay: 0.4,
                                duration: 0.3,
                            },
                        }}
                    >
                        <s.NavbarPopup
                            data-testid={TestIds.NavbarPopupInner}
                            ref={ref}
                        >
                            <Logo />
                            <Close />
                            <NavbarPopupContent />
                        </s.NavbarPopup>
                    </s.Blur>
                )}
            </AnimatePresence>
        </>
    )
}
