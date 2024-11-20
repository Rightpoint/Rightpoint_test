import {
    useIsomorphicLayoutEffect,
    useWindowDimensions,
} from '@rightpoint/core/utils'
import { motion, useTransform } from 'framer-motion'
import { noop } from 'lodash'
import { FC, useContext, useState } from 'react'
import { HeaderText } from '../../../../general/HeaderText/HeaderText.component'
import { ScrollBasedAnimationContainer } from '../../../../general/ScrollBasedAnimationContainer/ScrollBasedAnimationContainer.component'
import { ScrollZoomStyles as s } from './ScrollZoom.styles'
import { scrollToY } from './scroll-to-smooth'

export interface ScrollZoomTextProps {
    typewriterTexts?: string[]
    title?: string
}
export const ScrollZoomText: FC<ScrollZoomTextProps> = ({
    typewriterTexts,
    title,
}) => {
    const { animationProgress } = useContext(
        ScrollBasedAnimationContainer.Context
    )
    const { width, height } = useWindowDimensions()
    const textTranslateYOnScroll = useTransform(
        animationProgress,
        [0, 0.35],
        [0, height * -1],
        {}
    )
    const [cancelAutoScroll, setCancelAutoScroll] = useState(false)
    const [isAutoScrolling, setIsAutoScrolling] = useState(false)

    let timeoutId
    useIsomorphicLayoutEffect(() => {
        // prevent auto scroll if scrolled
        const scrollInterrupterHandler = (ev) => {
            clearTimeout(timeoutId)
            setCancelAutoScroll(true)
            if (isAutoScrolling) {
                ev.preventDefault()
                ev.stopPropagation()
                return false
            }
        }
        window.addEventListener('scroll', scrollInterrupterHandler)
        return () => {
            window.removeEventListener('scroll', scrollInterrupterHandler)
        }
    }, [isAutoScrolling])

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{
                opacity: 1,
            }}
            transition={{
                opacity: { duration: 2 },
            }}
            exit={{ opacity: 1 }}
            onAnimationComplete={() => {
                const shouldAutoScroll = () =>
                    window !== undefined &&
                    window.pageYOffset === 0 &&
                    !cancelAutoScroll

                if (shouldAutoScroll()) {
                    setIsAutoScrolling(true)
                    scrollToY(height / 2 - 50, 100, 'easeFromTo', () => {
                        setIsAutoScrolling(false)
                    })
                }
            }}
            style={{
                zIndex: 10,
                background: 'white',
                width: '100%',
                y: textTranslateYOnScroll,
            }}
        >
            <s.ScrollZoomText>
                <HeaderText
                    title={title}
                    typewriterProps={{
                        texts: typewriterTexts || [],
                        retainer: true,
                        avgTypingDelay: 20,
                        stdTypingDelay: 10,
                        TitleComponent: s.ScrollZoomTypewriterTitle,
                        cursorProps: {
                            hideWhenDone: true,
                            hideWhenDoneDelay: 0,
                            show: false,
                        },
                    }}
                />
            </s.ScrollZoomText>
        </motion.div>
    )
}
