import { motion, useMotionValue } from 'framer-motion'
import { FC, useEffect, useRef } from 'react'
import { ScrollingTextStyles as s } from './ScrollingText.styles'

export interface ScrollingTextProps {
    text: string
}

export const ScrollingText: FC<ScrollingTextProps> = ({ text }) => {
    const ref = useRef()
    const { x } = useHorizontalScrollAnimation(ref)
    // todo: enable animation when near viewport only
    return (
        <s.ScrollingText ref={ref}>
            <s.Text
                as={motion.div}
                style={{
                    x,
                }}
            >
                {text} {text} {text} {text}
            </s.Text>
        </s.ScrollingText>
    )
}

const useHorizontalScrollAnimation = (scrollerRef) => {
    const x = useMotionValue(0)
    const debugInfiniteScroll = false

    useEffect(() => {
        const animationSpeed = 0.5
        let running = true

        // without a small initial delay, browser tab shows infinite spinning/loading
        const tick = () => {
            x.set(x.get() - animationSpeed)
            // todo: infinite detect if text scrolls off screen
            if (running) {
                requestAnimationFrame(tick)
            }
        }

        setTimeout(tick, 200)

        return () => {
            running = false
        }
    }, [debugInfiniteScroll, x])
    return { x }
}
