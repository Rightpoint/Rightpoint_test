import { FC, useCallback, useEffect, useState } from 'react'
import { throttle } from 'lodash'
import { useResponsiveQuery } from 'atomic-layout'
import { motion, useSpring } from 'framer-motion'
import { CursorStyles as s } from './Cursor.styles'
import { dataAttributes } from '@rightpoint/core/variables'
import {
    contentColorDefinitions,
    ContentColors,
} from '../../layout/RootComponent/background-color'
import { useKeyPress } from '@rightpoint/core/utils'
import { useRouter } from 'next/router'

export interface CursorProps {
    springConfig?: {
        stiffness: 300
        bounce: 0
        damping: 50
        mass: 1
    }
}

export type CursorControlProps = {
    text?: string
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

export const Cursor: FC<CursorProps> = ({ springConfig }) => {
    const isMobile = useResponsiveQuery({ from: 'xs', to: 'sm' })
    const [isVisible, setIsVisible] = useState(false)
    const [text, setText] = useState('')
    const [color, setColor] = useState<ContentColors>()
    const getHandleMouseMoveThrottled = useCallback(
        throttle(
            (ev) => {
                if (isMobile) {
                    return
                }

                // update position
                x.set(ev.clientX)
                y.set(ev.clientY)

                /**
                 * Check if we're hovering over a cursor-enabled element.
                 *
                 * Capture all errors, as this behavior is non critical,
                 * and uses many DOM APIs.
                 */
                try {
                    const closestTrigger: HTMLElement = ev.target?.closest(
                        dataAttributes.cursorText.selector
                    )

                    if (closestTrigger) {
                        const triggerText =
                            closestTrigger.dataset[
                                dataAttributes.cursorText.datasetName
                            ]

                        if (triggerText) {
                            setText(triggerText)
                            setIsVisible(true)
                        }

                        const contentColorElement = ev.target.closest(
                            dataAttributes.content.selector
                        )

                        let contentColorValue
                        if (contentColorElement) {
                            try {
                                contentColorValue =
                                    contentColorElement.dataset[
                                        dataAttributes.content.datasetName
                                    ]
                            } catch (ex) {
                                console.error(ex)
                            }
                        }

                        const contentColorToSet =
                            contentColorValue || ContentColors.Dark
                        setColor(contentColorToSet)
                    } else {
                        setIsVisible(false)
                    }
                } catch (ex) {
                    setIsVisible(false)
                    console.error('Cursor', ex)
                }
            },
            100,
            {
                leading: true,
                trailing: true,
            }
        ),
        [isMobile]
    )

    const { x, y } = useXYSpring({
        springConfig,
        handleMouseMove: getHandleMouseMoveThrottled,
    })

    /**
     * Exist on tab which moves scroll position
     */
    useKeyPress({
        key: 'Tab',
        callback: () => {
            setIsVisible(false)
        },
    })

    /**
     * Reset on route change
     */
    const router = useRouter()
    useEffect(() => {
        const handleRouteChange = () => {
            setIsVisible(false)
        }
        router.events.on('routeChangeStart', handleRouteChange)
        return () => {
            router.events.off('routeChangeStart', handleRouteChange)
        }
    }, [router])

    /**
     * Problem: mousemove not fired during scroll and does not update the hover text.
     *
     * ev.target is lost even if we can store x, y coords.
     */
    // const scrollY = useScroll().scrollY
    // useEffect(() => {
    //     return scrollY.on('change', () => {
    //         const element = document.elementsFromPoint(x.get(), y.get())
    //         // can filter all elements here for a cursor-enabled element, but is that too expensive?
    //         const hasCursor = element.filter((el) => {
    //             const cursor = (el as any)?.dataset?.[
    //                 dataAttributes.cursorText.datasetName
    //             ]
    //             return cursor
    //         })

    //     })
    // }, [])

    if (isMobile) {
        return null
    }

    const definition = contentColorDefinitions[color]
    return (
        <s.Cursor
            as={motion.div}
            style={{
                x,
                y,
            }}
            initial={{ opacity: 1 }}
        >
            <s.Circle $isVisible={isVisible} $contentColor={color}>
                <s.RegularText $color={definition?.colorText}>
                    {text}
                </s.RegularText>
            </s.Circle>
        </s.Cursor>
    )
}

/**
 * @returns {Object} data attributes for the cursor control
 */
export const createCursorControlAttributes = ({
    cursorControlProps,
}: {
    cursorControlProps: CursorControlProps
}) => {
    if (!cursorControlProps) {
        return null
    }
    return {
        [dataAttributes.cursorText.attribute]: cursorControlProps.text,
    }
}
