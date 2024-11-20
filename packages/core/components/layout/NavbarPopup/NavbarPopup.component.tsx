import { FC, useEffect, useRef } from 'react'
import { NavbarPopupStyles as s } from './NavbarPopup.styles'
import { AnimatePresence, motion } from 'framer-motion'
import { useDispatch, useSelector } from 'react-redux'
import { useKeyPress } from '@rightpoint/core/utils'
import {
    navbarActions,
    navbarSelectors,
    useAppSelector,
} from '@rightpoint/core/redux'
import { TestIds } from '@rightpoint/core/variables'
import { NavbarPopupFooterProps } from './NavbarPopupFooter/NavbarPopupFooter.component'
import { Composition } from 'atomic-layout'
import { NavbarPopupContent } from './NavbarPopupContent/NavbarPopupContent.component'
import { NavbarPopupContext } from './NavbarPopup.context'
import { createGlobalStyle, css } from 'styled-components'
import { media } from '@rightpoint/core/styles'
import { useRouter } from 'next/router'
import { NavigationBarStyles } from '../../general/NavigationBar/NavigationBar.styles'
import { NavbarPopupPreview } from './NavbarPopupPreview/NavbarPopupPreview.component'
import {
    disableBodyScroll,
    enableBodyScroll,
    clearAllBodyScrollLocks,
} from 'body-scroll-lock'

const Close = () => {
    const dispatch = useDispatch()

    useKeyPress({
        key: 'Escape',
        callback: () => {
            dispatch(navbarActions.close())
        },
    })

    return (
        <s.Close
            onClick={() => dispatch(navbarActions.close())}
            as="button"
            type="button"
            // todo: need global tab focus solution
        >
            Close
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
                  // applying filter: creates a new context for position.
                  // can't target HTML because even our navbar is in it.
                  // only way to solve is to NOT apply the filter on specific elements
                  // or use backdrop-filter.
                  // main,
                  nav * {
                      filter: blur(30px);
                  }
                  ${NavigationBarStyles.NavigationBar} {
                      display: none;
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
        <NavbarPopupContext.Provider
            value={{
                footerProps,
            }}
        >
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
                                delay: 0,
                                duration: 0,
                            },
                        }}
                    >
                        <s.NavbarPopup
                            data-testid={TestIds.NavbarPopupInner}
                            ref={ref}
                        >
                            <Close />

                            {/* 
                            <Composition
                                height={'100%'}
                                template={`main`}
                                templateMd={`main`}
                                templateLg={`
                                    main preview
                                    / auto 440px
                                `}
                            >
                                {(areas) => (
                                    <>
                                        <areas.Main padding={20}>
                                            <NavbarPopupContent />
                                            <Close />
                                        </areas.Main>
                                        <areas.Preview
                                            as={motion.div}
                                            initial={{ opacity: 0 }}
                                            animate={{
                                                opacity: 1,
                                                transition: {
                                                    delay: 0.5,
                                                    duration: 0.3,
                                                    easing: 'easeOut',
                                                },
                                            }}
                                            exit={{
                                                opacity: 0,
                                            }}
                                            marginHorizontal={70}
                                        >
                                            {hasPreviewUrl &&
                                                isPreviewEnabled && (
                                                    <NavbarPopupPreview />
                                                )}
                                        </areas.Preview>
                                    </>
                                )}
                            </Composition> */}
                        </s.NavbarPopup>
                    </s.Blur>
                )}
            </AnimatePresence>
        </NavbarPopupContext.Provider>
    )
}
