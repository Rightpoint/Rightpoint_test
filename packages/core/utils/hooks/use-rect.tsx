// source: https://gist.github.com/morajabi/523d7a642d8c0a2f71fcfa0d8b3d2846
import { useCallback, useState } from 'react'
import { useIsomorphicLayoutEffect } from './use-isomorphic-layout-effect'

type AdjustRectFunc = (rect: RectResult) => RectResult

type RectResult = {
    bottom: number
    height: number
    left: number
    right: number
    top: number
    width: number
}

function getRect<T extends HTMLElement>(
    element?: T,
    adjustRect?: AdjustRectFunc
): RectResult {
    let rect: RectResult = {
        bottom: 0,
        height: 0,
        left: 0,
        right: 0,
        top: 0,
        width: 0,
    }
    if (element) {
        rect = element.getBoundingClientRect()
    }
    if (adjustRect) {
        rect = adjustRect(rect)
    }
    return rect
}

type Options = {
    adjustRect?: AdjustRectFunc
}
export function useRect<T extends HTMLElement>(
    ref: React.RefObject<T>,
    options?: Options
): RectResult {
    const adjustRect = (options || {}).adjustRect
    const [rect, setRect] = useState<RectResult>(
        ref && ref.current ? getRect(ref.current, adjustRect) : getRect()
    )

    const handleResize = useCallback(() => {
        if (!ref.current) return
        setRect(getRect(ref.current, adjustRect)) // Update client rect
    }, [ref])

    useIsomorphicLayoutEffect(() => {
        const element = ref.current
        if (!element) return

        handleResize()

        if (typeof ResizeObserver === 'function') {
            let resizeObserver = new ResizeObserver(() => handleResize())
            resizeObserver.observe(element)
            return () => {
                if (!resizeObserver) return
                resizeObserver.disconnect()
                resizeObserver = null
            }
        } else {
            window.addEventListener('resize', handleResize)
            return () => window.removeEventListener('resize', handleResize)
        }
    }, [ref.current])

    return rect
}
