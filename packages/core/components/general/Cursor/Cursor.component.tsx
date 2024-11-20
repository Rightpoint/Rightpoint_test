import { FC, useCallback, useEffect, useRef, useState } from 'react'
import router from 'next/router'
import dynamic from 'next/dynamic'
import { throttle } from 'lodash'
import { useResponsiveQuery } from 'atomic-layout'
import {
    useMotionValue,
    motion,
    useSpring,
    AnimatePresence,
} from 'framer-motion'
import { CursorStyles as s } from './Cursor.styles'

export const CursorSelectors = {
    trigger: 'data-cursor-text',
}
export interface CursorProps {
    springConfig?: {
        stiffness: 300
        bounce: 0
        damping: 50
        mass: 1
    }
}

const useXYSpringValue = ({ springConfig }) => {
    const spring = {
        stiffness: 300,
        bounce: 0,
        damping: 50,
        mass: 1,
    }
    const x = useSpring(0, springConfig || spring)
    const y = useSpring(0, springConfig || spring)
    return { x, y }
}

const useXYSpring = ({ springConfig, handleMouseMove }) => {
    const { x, y } = useXYSpringValue({
        springConfig,
    })

    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove)
        return () => {
            window.removeEventListener('mousemove', handleMouseMove)
        }
    }, [handleMouseMove])

    return {
        x,
        y,
    }
}

const RegularText = ({ children }) => {
    return <s.RegularText>{children}</s.RegularText>
}

export const Cursor: FC<CursorProps> = ({ springConfig }) => {
    const isMobile = useResponsiveQuery({ from: 'xs', to: 'sm' })
    const [isVisible, setIsVisible] = useState(false)

    const [text, setText] = useState('')
    const getHandleMouseMoveThrottled = useCallback(
        () =>
            throttle((ev) => {
                if (isMobile) {
                    return
                }

                // update position
                x.set(ev.clientX)
                y.set(ev.clientY)

                // check if we're hovering over something
                const closestTrigger: HTMLElement = ev.target.closest(
                    `[${CursorSelectors.trigger}]`
                )

                const shouldBeVisible = Boolean(closestTrigger)
                setIsVisible(shouldBeVisible)
                if (closestTrigger) {
                    const triggerText = closestTrigger.dataset.cursorText
                    setText(triggerText)
                }
            }, 100),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [isMobile]
    )

    const { x, y } = useXYSpring({
        springConfig,
        handleMouseMove: getHandleMouseMoveThrottled(),
    })

    return (
        <>
            <s.Cursor
                as={motion.div}
                style={{
                    x,
                    y,
                }}
                initial={{ opacity: 1 }}
                // animate={{ opacity: isVisible ? 1 : 0.1 }}
                // exit={{ opacity: 0, scale: 0.5 }}
            >
                <s.Circle $isVisible={isVisible}>
                    <RegularText>{text}</RegularText>
                </s.Circle>
            </s.Cursor>
        </>
    )
}
