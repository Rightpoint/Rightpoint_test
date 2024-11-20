import { useAnimationFrame } from 'framer-motion'
import { times } from 'lodash'
import { MouseEvent, useCallback, useEffect, useRef, useState } from 'react'

export const useSmoothScroll = () => {
    const [isDisabled, setIsDisabled] = useState(false)

    const inertiaDetectData = useRef({
        minScrollWheelInterval: 15,
        animSpeed: 300,
        lastScrollWheelTimestamp: 0,
        lastScrollWheelDelta: 0,
        animating: false,

        historicalScrollTops: times(5),

        historicalScrollWheelIntervals: times(5),
    }).current

    const SmoothScroll = useCallback(
        (target, speed, inertia) => {
            if (target === document)
                target =
                    document.scrollingElement ||
                    document.documentElement ||
                    document.body.parentNode ||
                    document.body // cross browser support for document scrolling

            let moving = false
            let pos = target.scrollTop
            const frame =
                target === document.body && document.documentElement
                    ? document.documentElement
                    : target
            let lastScrollTime

            /**
             * Detect if inertial scroll is being used.
             *
             * If it's detected, disable the wheel smooth scroller.
             */
            const detectInertia = (e: WheelEvent, cb) => {
                // check if inertial scroll
                const now = Date.now()
                const timeSince =
                    now - inertiaDetectData.lastScrollWheelTimestamp
                const rapidSuccession =
                    timeSince < inertiaDetectData.minScrollWheelInterval

                inertiaDetectData.historicalScrollWheelIntervals.pop()
                inertiaDetectData.historicalScrollWheelIntervals.unshift(
                    timeSince
                )
                const avg =
                    inertiaDetectData.historicalScrollWheelIntervals.reduce(
                        (acc, curr) => acc + curr,
                        0
                    ) / inertiaDetectData.historicalScrollWheelIntervals.length
                console.log(
                    'time since last event',
                    inertiaDetectData.historicalScrollWheelIntervals,
                    avg
                )

                const otherDirection =
                    inertiaDetectData.lastScrollWheelDelta > 0 !== e.deltaY > 0
                const speedDecrease =
                    Math.abs(e.deltaY) <=
                    Math.abs(inertiaDetectData.lastScrollWheelDelta)

                const isHuman =
                    otherDirection || !rapidSuccession || !speedDecrease

                if (isHuman && !inertiaDetectData.animating) {
                    inertiaDetectData.animating = true
                } else if (!isHuman && inertiaDetectData.animating) {
                    inertiaDetectData.animating = false
                }

                if (!isHuman) {
                    cb()
                    return
                }

                inertiaDetectData.lastScrollWheelTimestamp = now
                inertiaDetectData.lastScrollWheelDelta = e.deltaY
                // end check if inertia
            }

            const handleScroll = (e: WheelEvent) => {
                e.preventDefault() // disable default scrolling
                lastScrollTime = Date.now()
                // detectInertia(e, () => setIsDisabled(true))

                const delta = normalizeWheelDelta(e)

                pos += -delta * speed
                pos = Math.max(
                    0,
                    Math.min(pos, target.scrollHeight - frame.clientHeight)
                ) // limit scrolling

                if (!moving) update()
            }

            /**
             * Wheel deltas are different in browsers
             */
            const normalizeWheelDelta = (e) => {
                if (e.detail) {
                    if (e.wheelDelta)
                        return (
                            (e.wheelDelta / e.detail / 40) *
                            (e.detail > 0 ? 1 : -1)
                        )
                    // Opera
                    else return -e.detail / 3 // Firefox
                } else return e.wheelDelta / 120 // IE,Safari,Chrome
            }

            /**
             * Let's try updating translate
             *
             * then, for accessibility, we can swap back to an instant scrollTop.
             */

            const body = document.querySelector('body')
            const update = (t = null) => {
                moving = true
                /**
                 * Lower numbers ~2 make it choppy / reduce inertia
                 * Higher number ~20 make it slow / increase inertia
                 */
                const targetScrollTop = target.scrollTop
                const delta = (pos - targetScrollTop) / inertia

                inertiaDetectData.historicalScrollTops.pop()
                inertiaDetectData.historicalScrollTops.unshift(targetScrollTop)

                const allTheSame = inertiaDetectData.historicalScrollTops.every(
                    (v) => v === inertiaDetectData.historicalScrollTops[0]
                )
                console.log(allTheSame)

                target.scrollTop += delta

                if (!allTheSame && Math.abs(delta) > 0.7) {
                    /**
                     * Sometimes, this doesn't decay to 0
                     * Each animation should have a lifespan maximum
                     */
                    requestFrame(update)
                } else {
                    moving = false
                }
            }

            const requestFrame = (() =>
                window.requestAnimationFrame ||
                (window as any).webkitRequestAnimationFrame ||
                (window as any).mozRequestAnimationFrame ||
                (window as any).oRequestAnimationFrame ||
                (window as any).msRequestAnimationFrame ||
                function (func) {
                    window.setTimeout(func, 1000 / 50)
                })()

            target.addEventListener('wheel', handleScroll, { passive: false })
            return () => {
                target.removeEventListener('wheel', handleScroll, {
                    passive: false,
                })
            }
        },
        [inertiaDetectData]
    )

    useEffect(() => {
        if (!isDisabled) {
            return SmoothScroll(
                document,
                // speed
                30,
                // smooth
                10
            )
        } else {
            // console.log(
            //     'Disabled scroll handling due to inertial scroll detected'
            // )
        }
    }, [isDisabled, SmoothScroll])

    return {
        setIsDisabled,
    }
}
