import { FC, ReactNode, useRef, useState } from 'react'
import type { GridProps } from '../../general/Grid/Grid.component'
import { ParallaxOnScrollStyles as s } from './ParallaxOnScroll.styles'
import { motion, useTransform, useScroll } from 'framer-motion'
import {
    useIsomorphicLayoutEffect,
    useRect,
    useWindowDimensions,
} from '@rightpoint/core/utils'
import BezierEasing from 'bezier-easing'
import { useBezierEditorContextDefaults } from '../../utils/BezierEditor/BezierEditor.component'
import { useResponsiveQuery } from 'atomic-layout'

export interface ParallaxOnScrollProps
    extends Pick<GridProps, 'cardVariant' | 'gridLayout'> {
    Wrapper: ReactNode
    titleSticky?: boolean
}

/**
 * This component animates children on scroll in, and out, with a parallax effect.
 *
 * Parallax: content moves differently between foreground and background.
 * This is achieved by altering the position of elements as it relates to the viewport, on scroll.
 *
 * As elements enter the screen, the elements begin lower/move upwards towards resting position,
 * and as they leave the screen, the elements move upwards and out.
 */
export const Parallaxer = ({
    children,
    transformRangeEnd = null,
    startWindowMultiplier = 1,
    translateDistanceMin = 200,
    translateDistanceRange = 500,
    translateDistance = null,
}) => {
    const ref = useRef<HTMLDivElement>()
    const { scrollY } = useScroll()
    const { height: windowHeight } = useWindowDimensions()
    const [range, setRange] = useState([0, 1])
    const isMobile = useResponsiveQuery({ from: 'xs', to: 'sm' })
    const [shouldAnimate, setShouldAnimate] = useState(true)
    useIsomorphicLayoutEffect(() => {
        // we have the ref
        if (ref.current) {
            const rect = ref.current.getBoundingClientRect()
            if (isMobile) {
                setShouldAnimate(false)
                return
            }
            // Start position is when element top reaches viewport bottom
            const elAbsoluteOffsetTop = window.scrollY + rect.top
            const start =
                elAbsoluteOffsetTop - windowHeight * startWindowMultiplier
            // End position is when element bottom reaches viewport top
            const end = elAbsoluteOffsetTop + rect.height
            setRange([start, end])
        } else {
            console.log('no ref')
        }
    }, [ref, windowHeight])

    const progress = useTransform(scrollY, range, [0, 1], {
        clamp: false,
    })

    // const progressWidth = useTransform(progress, [0, 1], ['0%', '100%'])

    const [distanceToTranslate, _] = useState(
        translateDistance ||
            Math.floor(Math.random() * translateDistanceRange) +
                translateDistanceMin
    )

    const { easing } = useBezierEditorContextDefaults({
        easing: [0.5, 0.5, 0.5, 0.5],
    })

    const transform = useTransform(
        progress,
        [0, 1],
        transformRangeEnd || [
            'translateY(0)',
            `translateY(-${distanceToTranslate}px)`,
        ],
        {
            clamp: true,
            ease: [BezierEasing.apply(null, easing)],
        }
    )

    return (
        <div ref={ref} style={{}}>
            <motion.div
                style={
                    shouldAnimate
                        ? {
                              transform,
                          }
                        : {}
                }
            >
                {/* <motion.div
                    style={{
                        width: progressWidth,
                        background: 'gray',
                        // height: 2,
                    }}
                >
                    {JSON.stringify(range)}
                </motion.div> */}
                {children}
            </motion.div>
        </div>
    )
}

export const ParallaxOnScroll: FC<ParallaxOnScrollProps> = ({
    titleSticky,
    ...rest
}) => {
    return <s.ParallaxOnScroll>N/A</s.ParallaxOnScroll>
}

export const ParallaxOnEnter = ({
    children,
    transformRangeEnd = null,
    startWindowMultiplier = 1,
    translateDistanceMax = 700,
    translateDistance = null,
}) => {
    const ref = useRef<HTMLDivElement>()
    const { scrollY } = useScroll()
    const { height: windowHeight } = useWindowDimensions()

    /**
     * Progress is determined by the scroll range that is:
     *
     * Enter: element TOP reaches viewport BOTTOM
     *  This means scrollY is equal to:
     *  - scroll distance + viewport height
     *  - OR rect.offsetTop - viewport height
     * Exit: element BOTTOM reaches viewport TOP
     *  This means scrollY is equal to element bottom
     */
    const [range, setRange] = useState([0, 0])

    useIsomorphicLayoutEffect(() => {
        // we have the ref
        if (ref.current) {
            const rect = ref.current.getBoundingClientRect()
            const isAboveFold = rect.top < windowHeight
            if (isAboveFold) {
                // don't parallax above fold stuff
                return
            }
            // Start position is when element top reaches viewport bottom
            const elAbsoluteOffsetTop = window.scrollY + rect.top
            const start =
                elAbsoluteOffsetTop - windowHeight * startWindowMultiplier
            // End position is when element bottom reaches viewport top
            const end = elAbsoluteOffsetTop + rect.height

            /**
             * If we're at the top of the page, scrollY is negative, and we should not animate.
             */

            setRange([start, end])
        } else {
            console.log('no ref')
        }
    }, [ref, windowHeight])

    const progress = useTransform(scrollY, range, [0, 1], {
        clamp: false,
    })

    const progressWidth = useTransform(progress, [0, 1], ['0%', '100%'])

    const { easing } = useBezierEditorContextDefaults({
        easing: [0.5, 0.5, 0.5, 0.5],
    })

    const transform = useTransform(
        progress,
        [0, 0.5],
        [`translateY(500px)`, `translateY(0px)`],
        {
            clamp: true,
            ease: [BezierEasing.apply(null, easing)],
        }
    )
    const [debug, setDebug] = useState<any>()

    return (
        <div
            ref={ref}
            style={{
                outline: '1px dashed rgba(0, 0, 0, .1)',
            }}
            data-hint="parallaxOnEnter"
        >
            <motion.div
                style={{
                    transform,
                }}
            >
                <motion.div
                    style={{
                        width: progressWidth,
                        background: 'rgba(0, 0, 0, .1)',
                        height: 2,
                    }}
                ></motion.div>
                {children}
            </motion.div>
        </div>
    )
}

/**
 * This component approximates starting the parallax effect only after element reaches middle of viewport.
 *
 * TODO: aware of child content size.
 */
export const ParallaxOnExit = ({ children }) => {
    return (
        <Parallaxer translateDistance={300} startWindowMultiplier={0.4}>
            {children}
        </Parallaxer>
    )
}
