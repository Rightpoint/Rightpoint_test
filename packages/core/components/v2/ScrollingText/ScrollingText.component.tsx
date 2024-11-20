import { motion, useInView, useMotionValue } from 'framer-motion'
import { times } from 'lodash'
import { FC, useEffect, useRef } from 'react'
import { ScrollingTextStyles as s } from './ScrollingText.styles'

export interface ScrollingTextProps {
    text: string
}

export const ScrollingText: FC<ScrollingTextProps> = ({ text }) => {
    const ref = useRef()
    const inView = useInView(ref)
    const { x } = useHorizontalScrollAnimation(ref, inView)
    // todo: enable animation when near viewport only
    return (
        <s.ScrollingText ref={ref}>
            <s.Text
                as={motion.div}
                style={{
                    x,
                }}
            >
                {times(4, (i) => (
                    <s.Repeated key={i}>{text}</s.Repeated>
                ))}
            </s.Text>
        </s.ScrollingText>
    )
}

const useHorizontalScrollAnimation = (scrollerRef, start) => {
    const X_START = -150
    const x = useMotionValue(X_START)
    const debugInfiniteScroll = false

    useEffect(() => {
        let running = true
        if (start) {
            x.set(X_START)
            const animationSpeed = 0.5

            // without a small initial delay, browser tab shows infinite spinning/loading
            const tick = () => {
                x.set(x.get() - animationSpeed)
                // todo: infinite detect if text scrolls off screen
                if (running) {
                    requestAnimationFrame(tick)
                }
            }

            setTimeout(tick, 200)
        } else {
            running = false
        }
        return () => {
            running = false
        }
    }, [debugInfiniteScroll, x, start])
    return { x }
}
