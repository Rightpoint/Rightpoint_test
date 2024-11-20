import { useEffect, useState } from 'react'
import { useIsomorphicLayoutEffect } from './use-isomorphic-layout-effect'

/**
 * Scrollspy: check  if element in viewport/active.
 * Possibly return progress numbers.
 */
interface ScrollSpyProps {
    querySelector: string
}
export const useScrollSpy = ({ querySelector }: ScrollSpyProps) => {
    const [isInViewport, setIsInViewport] = useState(false)

    useIsomorphicLayoutEffect(() => {
        const element = document.querySelector(querySelector)
        console.log('Got element', element, querySelector)
        if (!element) {
            return
        }

        // the intersection observer doesn't fire enough.

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    setIsInViewport(entry.isIntersecting)

                    // const rect = entry.target.getBoundingClientRect()
                    // console.log(
                    //     'SS:',
                    //     entry.target,
                    //     rect.top + window.scrollY,
                    //     rect.bottom + window.scrollY
                    // )

                    // const absTop = rect.top + window.scrollY
                    // const absBot = rect.bottom + window.scrollY

                    // const startAbove = absTop < window.scrollY
                    // const endBelow = absBot > window.scrollY

                    // const inVP = startAbove && endBelow
                    // console.log({
                    //     el: entry.target,
                    //     startAbove: {
                    //         startAbove,
                    //         absTop,
                    //         y: window.scrollY,
                    //     },
                    //     endBelow: {
                    //         endBelow,
                    //         absBot,
                    //         y: window.scrollY,
                    //     },
                    //     inVP,
                    // })

                    // setIsInViewport(inVP)
                })
            },

            {}
        )
        observer.observe(element)

        return () => {
            observer.disconnect()
        }
    }, [])

    return { isInViewport }
}
