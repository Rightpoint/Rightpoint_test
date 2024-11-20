import { useTransform, useScroll } from 'framer-motion'
import { debounce, isFunction, times } from 'lodash'

import {
    createContext,
    FC,
    ReactNode,
    useEffect,
    useRef,
    useState,
} from 'react'
import { ScrollBasedAnimationContainerStyles as s } from './ScrollBasedAnimationContainer.styles'
import { useRouter } from 'next/router'
import { useIsomorphicLayoutEffect } from '@rightpoint/core/utils'
const ScrollBasedAnimationContainerContext = createContext({
    animationProgress: null,
    scrollContainerRef: null,
    scrollViewportRef: null,
})

interface ScrollBasedAnimationContainerProps {
    debug?: boolean
    renderFixedPositionedContent(...args: any): null | void
    children?: ReactNode
    scrollHeight?: string
}

type AttachedProperties = {
    Context: typeof ScrollBasedAnimationContainerContext
}

export const ScrollBasedAnimationContainer: FC<ScrollBasedAnimationContainerProps> &
    AttachedProperties = ({
    debug = false,
    renderFixedPositionedContent = () => null,
    children,
    scrollHeight = '300vh',
}) => {
    const scrollContainerRef = useRef<HTMLDivElement>(null)
    const scrollViewportRef = useRef<HTMLDivElement>(null)
    const { scrollY } = useScroll()
    const [scrollRange, setScrollRange] = useState([0, 0])
    const animationProgress = useTransform(scrollY, scrollRange, [0, 1], {})
    const router = useRouter()

    useIsomorphicLayoutEffect(() => {
        if (scrollContainerRef.current) {
            const handleResize = debounce(() => {
                setScrollRange([
                    scrollContainerRef.current?.offsetTop,
                    scrollContainerRef.current?.offsetTop +
                        scrollContainerRef.current?.offsetHeight -
                        window.innerHeight,
                ])
            }, 20)

            const handleNewRoute = () => {
                /**
                 * These components are heavily position based, and their position is impacted by
                 * components rendering.
                 *
                 * Run the resize handler multiple times on route change to ensure the scroll range is correct.
                 */
                handleResize()
                // fire increasingly larger increments
                times(5, (i) => setTimeout(handleResize, 100 * (i ^ 2)))
            }

            handleResize()
            window.addEventListener('resize', handleResize)
            router.events.on('routeChangeComplete', handleNewRoute)
            return () => {
                window.removeEventListener('resize', handleResize)
                router.events.off('routeChangeComplete', handleNewRoute)
            }
        }
    }, [scrollContainerRef])

    return (
        <ScrollBasedAnimationContainerContext.Provider
            value={{
                animationProgress,
                scrollContainerRef,
                scrollViewportRef,
            }}
        >
            <s.ScrollContainer
                ref={scrollContainerRef}
                style={{
                    maxHeight: scrollHeight,
                }}
            >
                <s.ScrollViewport $debug={debug} ref={scrollViewportRef}>
                    <s.ScrollContent>
                        {isFunction(children)
                            ? children({ animationProgress })
                            : children}
                    </s.ScrollContent>

                    {renderFixedPositionedContent({ animationProgress })}
                </s.ScrollViewport>

                <div
                    style={{
                        height: scrollHeight,
                        pointerEvents: 'none',
                    }}
                />
            </s.ScrollContainer>
        </ScrollBasedAnimationContainerContext.Provider>
    )
}

ScrollBasedAnimationContainer.Context = ScrollBasedAnimationContainerContext
