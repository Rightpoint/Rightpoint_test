import { FC, useEffect, useRef, useState } from 'react'

import { NavbarPopupPreviewStyles as s } from './NavbarPopupPreview.styles'
import { useBezierEditorContextDefaults } from '../../../utils/BezierEditor/BezierEditor.component'
import { debounce } from 'lodash'
import {
    useAppSelector,
    navbarSelectors,
    navbarActions,
    useAppDispatch,
} from '@rightpoint/core/redux'
import { useRouter } from 'next/router'
import { useIsomorphicLayoutEffect } from '@rightpoint/core/utils'
import {
    disableBodyScroll,
    enableBodyScroll,
    clearAllBodyScrollLocks,
} from 'body-scroll-lock'

export interface NavbarPopupPreviewProps {}
export const NavbarPopupPreview: FC<NavbarPopupPreviewProps> = () => {
    const previewUrl = useAppSelector(navbarSelectors.selectPreviewUrl)

    /**
     * Set the floating iframe position to fill the DOM target.
     *
     * The technique we are using is to render the iframe at the exact size of the window
     * then scaling it down to fit the DOM target.
     *
     * This way, when zooming into the iframe, the content will be scaled 1:1 to the next page.
     */
    const [targetWidth, setTargetWidth] = useState(500)
    const ref = useRef<HTMLDivElement>(null)
    useIsomorphicLayoutEffect(() => {
        if (ref && ref.current) {
            setTargetWidth(ref.current.getBoundingClientRect().width)
        }
    }, [ref])
    const iframeWidth = window.innerWidth || 1000
    const [isFullScreen, setIsFullScreen] = useState(false)
    // track frame position, set iframe to match
    const framePositionRef = useRef<HTMLDivElement>(null)
    const [fixedStyles, setFixedStyles] = useState({
        height: 0,
    })
    useIsomorphicLayoutEffect(() => {
        const matchElementPosition = () => {
            const { left, top, width, height } =
                framePositionRef.current.getBoundingClientRect()
            const styles = {
                position: 'fixed',
                transformOrigin: 'top left',
                transform: `translate3d(${left}px, ${top}px, 0) scale(${(
                    width / window.innerWidth
                ).toFixed(2)})`,
                height: 2000, // todo: must set
                top: 0,
                left: 0,
            }
            setFixedStyles(styles)
        }
        const debounced = debounce(matchElementPosition, 200)

        if (framePositionRef && framePositionRef.current) {
            matchElementPosition()
        }
        window.addEventListener('resize', debounced)

        return () => {
            debounced.cancel()
            window.removeEventListener('resize', debounced)
        }
    }, [framePositionRef])

    const context = useBezierEditorContextDefaults({
        previewExitAnimation: [0.25, 0.1, 0.25, 1],
    })

    const isExpanded = useAppSelector(navbarSelectors.selectIsPreviewExpanded)
    const iframeRef = useRef<HTMLIFrameElement>()

    /**
     * - Animate preview to full screen
     * - Change route
     * - Reset navbar state when route change complete
     */
    const router = useRouter()
    const dispatch = useAppDispatch()
    useEffect(() => {
        const afterAnimationEnded = (cb) => {
            let fired = false
            iframeRef.current.addEventListener('animationend', (ev) => {
                cb()
                fired = true
            })
            // fire callback at 1 second
            setTimeout(() => {
                !fired &&
                    cb() &&
                    console.log(
                        "Fired animation end callback because it didn't fire in time"
                    )
            }, 1500)
        }
        /**
         * Expansion animation
         */
        if (isExpanded) {
            setIsFullScreen(true)
            // lock screen
            afterAnimationEnded(() => {
                dispatch(navbarActions.reset())
                router.push(previewUrl, undefined, {
                    // otherwise, in page nav loads new page at current position, then scrolls up.
                    scroll: false,
                })
                console.log('Navigating to the target URL')
            })
        } else {
            setIsFullScreen(false)
        }
    }, [isExpanded, dispatch, previewUrl, router])

    /**
     * Detect when the preview component is mounted
     * so that the navbar can replace onClick() handlers when needed.
     */
    useEffect(() => {
        dispatch(navbarActions.mounted())
        return () => {
            dispatch(navbarActions.unmounted())
        }
    }, [dispatch])

    /**
     * Set the iframe preview url with an identifier to differentiate
     * between preview hits and not.
     */
    const PREVIEW_IDENTIFIER_QUERYSTRING = 'navbar-popup-preview'
    const iframePreviewUrl =
        previewUrl + `?${PREVIEW_IDENTIFIER_QUERYSTRING}=true`

    // useEffect(() => {
    //     disableBodyScroll(ref.current)

    //     return () => {
    //         enableBodyScroll(ref.current)
    //     }
    // }, [ref])

    return (
        <s.NavbarPopupPreview
            ref={ref}
            onClick={() => setIsFullScreen(!isFullScreen)}
        >
            {/* this provides a DOM element to match size */}
            <s.FramePositioner
                ref={framePositionRef}
                data-hint="frame-position"
            >
                {/* the fixed position iframe is moved to match the size of the parent div*/}
                <s.IFrameFixed
                    style={{
                        willChange: 'transform',
                        transition: 'all 1s ease 0s',
                        transitionTimingFunction: `cubic-bezier(${
                            context.previewExitAnimation &&
                            context.previewExitAnimation.join(', ')
                        })`,
                        transform: `scale(0)`,
                        ...fixedStyles,

                        // use an instant transform to let browser do the work
                        ...(isFullScreen
                            ? {
                                  transform: `translate3d(0, 0, 0) scale(1)`,
                              }
                            : {}),
                    }}
                    data-hint="iframe-fixed-parent"
                >
                    <s.IFrame
                        // adding key did not help preserve, and broke the scroll to animation (due to different key)
                        // key={previewUrl}
                        ref={iframeRef}
                        src={iframePreviewUrl}
                        scrolling={isFullScreen ? 'yes' : 'no'}
                        style={{
                            willChange: 'transform',
                            width: iframeWidth,
                            // height:
                            //     iframeWidth *
                            //     (fixedStyles.height / fixedStyles.width),
                            overflow: 'hidden',
                            // transform: `scale( calc(${targetWidth} / ${iframeWidth}) )`,
                            transformOrigin: 'top left',
                            transition: 'all 1s ease 0s',
                            transitionTimingFunction: `cubic-bezier(${
                                context.previewExitAnimation &&
                                context.previewExitAnimation.join(', ')
                            })`,
                            ...(isFullScreen
                                ? {
                                      transform: 'scale(1)',
                                      height: '100vh',
                                      pointerEvents: 'all',
                                      overflowY: 'scroll',
                                  }
                                : {}),
                        }}
                    ></s.IFrame>
                </s.IFrameFixed>
            </s.FramePositioner>
        </s.NavbarPopupPreview>
    )
}
