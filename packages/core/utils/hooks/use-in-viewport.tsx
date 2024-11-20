import { defaults, get, throttle } from 'lodash'
import { RefObject, useEffect, useState } from 'react'

/**
 *
 * @param ref - the ref to the element to check if it is in the viewport
 * @param options
 * @params options.containerRef - when you have a TranslateZ positioned element, you need to pass the containerRef to get the correct offsetTop
 * @params options.offsetTop - offsetTop to use as threshold, allows to anticipate or delay appearance
 * @params options.offsetBottom - offsetBottom to use as threshold, allows to anticipate or delay the disappearance
 *
 * @returns
 */

type UseInViewportOptions = {
    offsetTop?: number
    offsetBottom?: number
    offset: number
}

export const useInViewport = (
    ref: RefObject<HTMLElement>,
    options?: UseInViewportOptions
) => {
    const { offsetTop, offsetBottom } = defaults(options, {
        offset: 0,
        offsetTop: get(options, 'offset', 0),
        offsetBottom: get(options, 'offset', 0),
    })

    const [isInViewport, setIsInViewport] = useState(false)

    useEffect(() => {
        const handleViewportChange = throttle(() => {
            const node = ref.current
            if (!node) return

            const elementRect = node.getBoundingClientRect()

            const currentisInViewport =
                elementRect.top + offsetTop <= window.innerHeight &&
                elementRect.bottom - offsetBottom >= 0

            if (currentisInViewport !== isInViewport) {
                setIsInViewport(currentisInViewport)
            }
        }, 20)

        handleViewportChange()
        window.addEventListener('scroll', handleViewportChange)
        window.addEventListener('resize', handleViewportChange)
        return () => {
            window.removeEventListener('scroll', handleViewportChange)
            window.removeEventListener('resize', handleViewportChange)
        }
    }, [ref, isInViewport])

    return isInViewport
}
