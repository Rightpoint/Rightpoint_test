import { icons } from '@rightpoint/core/styles'
import { useInViewport } from '@rightpoint/core/utils'
import { motion, MotionValue } from 'framer-motion'
import { FC, useContext, useEffect, useRef, useState } from 'react'
import { ScrollBasedAnimationContainer } from '../../../../general/ScrollBasedAnimationContainer/ScrollBasedAnimationContainer.component'
import { ScrollZoomStyles as s } from './ScrollZoom.styles'

interface ScrollZoomLogoProps {
    playAnimate?: boolean
    animationScrollProgress?: MotionValue
}
export const ScrollZoomLogo: FC<ScrollZoomLogoProps> = ({ playAnimate }) => {
    const elementRef = useRef(null)
    const isInViewport = useInViewport(elementRef, {
        offsetTop: -100,
        offsetBottom: 0,
        offset: 0,
    })
    const { animationProgress } = useContext(
        ScrollBasedAnimationContainer.Context
    )

    /**
     * Disable logo if between video in middle and video max
     */
    const [disable, setDisable] = useState(true)
    useEffect(() => {
        return animationProgress.onChange((v) => {
            if (v < 0.2) {
                setDisable(false)
            }
            if (v > 0.35) {
                setDisable(true)
            }
        })
    }, [animationProgress])

    const shouldShow = !disable && playAnimate && isInViewport
    return (
        <s.LogoSticky
            ref={elementRef}
            as={motion.div}
            transformTemplate={({ y }) => {
                return `translateY(${y})`
            }}
            initial={{
                y: '100%',
            }}
            animate={{
                opacity: shouldShow ? 1 : 0,
                y: shouldShow
                    ? '0%' // show
                    : '100%', // 100% is hidden
            }}
            transition={{
                ease: 'easeInOut',
                duration: 1,
            }}
        >
            <s.Logo>
                <s.LogoWrapper>
                    {disable && 'Disabled logo'}
                    <icons.Logo />
                </s.LogoWrapper>
            </s.Logo>
        </s.LogoSticky>
    )
}
