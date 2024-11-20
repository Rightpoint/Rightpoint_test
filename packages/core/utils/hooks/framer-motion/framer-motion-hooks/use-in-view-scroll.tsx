import { RefObject, useEffect } from 'react'
import { MotionValue, useMotionValue, useScroll } from 'framer-motion'

interface IOptions {
    threshold?: number
}

/**
 * `useInViewScroll` returns a MotionValue that updates when the target element is visible in viewport
 *
 * @param el - The target element
 * @param options - An object of options e.g. `threshold`
 */
export const useInViewScroll = (
    el: RefObject<HTMLElement>,
    options: IOptions = {}
): {
    progress: MotionValue<number>
    scrollY: MotionValue<number>
} => {
    const progress = useMotionValue(0)
    const { scrollY } = useScroll()

    useEffect(() => {
        const handleScrollProgress = () => {
            const node = el.current
            if (!node) return

            const threshold = options.threshold || 0

            /**
             * calculate the position of the top edge of the element
             */
            const elPosY = node.getBoundingClientRect().top + scrollY.get()
            const elHeight = node.scrollHeight

            const viewIntersect = Math.max(elPosY - window.innerHeight, 0)

            const current = scrollY.get() - viewIntersect - threshold
            const total =
                Math.min(window.innerHeight, elPosY) + elHeight - threshold

            const quotient = current / total

            if (quotient >= 0 && quotient <= 1) {
                progress.set(quotient)
            }

            false &&
                console.log(
                    `scroll debug 
                        C:${current}
                        T:${total}
                        Q:${quotient}
                        viewIntersect: ${viewIntersect}
                        elPosY: ${elPosY}
                    `
                )
        }

        handleScrollProgress()
        const unsubscribeFromScroll = scrollY.onChange(handleScrollProgress)
        return () => unsubscribeFromScroll()
    }, [el, options, progress, scrollY])

    // note: take care not to re-render this component too many times, and note the difference between
    // motion values which are mutated and updated outside react, and react state.
    return { progress, scrollY }
}
