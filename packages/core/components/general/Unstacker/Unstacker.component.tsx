import { motion, MotionValue, useTransform, useScroll } from 'framer-motion'
import { Children, FC, useContext, useEffect, useRef, useState } from 'react'
import {
    UnstackerContext,
    unstackerContextDefault,
    UnstackerItemContext,
} from './Unstacker.context'
import { UnstackerStyles as s } from './Unstacker.styles'
import {
    UnstackerItem,
    UnstackerItemProps,
} from './components/UnstackerItem/UnstackerItem'
import { useRect, useIsomorphicLayoutEffect } from '@rightpoint/core/utils'
import { filter, reduce, times } from 'lodash'
import { useResponsiveQuery } from 'atomic-layout'
import { useRouter } from 'next/router'
import { ScrollBasedAnimationContainer } from '../ScrollBasedAnimationContainer/ScrollBasedAnimationContainer.component'
import { ProgressBar } from './components/ProgressBar'

const generateId = ({ index }) => `i-${index}`

interface UnstackerItemAnimatorProps {
    itemCount: number
    index: number
    progress: MotionValue
    isFixed: boolean
    itemHeightVh: string
}
const UnstackerItemAnimator: FC<UnstackerItemAnimatorProps> = ({
    children,
    index,
    progress,
    itemCount,
    isFixed,
    itemHeightVh,
}) => {
    /**
     * Progress fractions would be 1 at last slide, 0 at first slide.
     * A slide length would be 1/slideCount
     */
    const oneSlideLength = 1 / itemCount // one slide length is dependent on the viewport
    const startProgress = index * oneSlideLength

    const itemProgress = useTransform(
        progress,
        // take input range like .2-.3, convert to a new 0-1 range
        [startProgress, startProgress + oneSlideLength],
        [0, 1],
        {
            clamp: false,
        }
    )

    // delay translating the slide off the screen, so that there is a "dead zone" where the slide is in focus.
    // otherwise, it is difficult to land in a visually pleasing position reliably.

    const itemProgressWithDeadzone = useTransform(
        itemProgress,
        [-1, 0, 0.6, 1],
        [-1, 0, 0, 1],
        { clamp: false }
    )

    // const translateY = useTransform(
    //     itemProgressWithDeadzone,
    //     [0, 1],
    //     ['translateY(0%)', 'translateY(-100%)']
    // )

    const translateY = useTransform(
        itemProgressWithDeadzone,
        [0, 1],
        ['translateY(0%)', 'translateY(-100%)']
    )

    const opacity = useTransform(itemProgressWithDeadzone, [0, 1], [1, 1])

    // we may need component metadata in context to generate unique ids
    const id = generateId({ index })

    return (
        <s.ItemPlaceholder
            style={{
                // this height matches the expected virtual height of the unstacker
                // so that scroll behavior is maintained as expected of normal browser scrolling
                // and also enables anchor navigation
                height: itemHeightVh,
            }}
            id={id}
            data-hint="item-animator"
            tabIndex={0}
            data-scroll-parent
        >
            <UnstackerItemContext.Provider
                value={{
                    itemProgress,
                    itemProgressWithDeadzone,
                    itemCount,
                    index,
                }}
            >
                <s.Item
                    as={motion.div}
                    style={{
                        position: isFixed ? 'fixed' : 'absolute',
                        // height of an item is always full screen.
                        // not to be confused with the height of the scroll area that corresponds to each full screen item.
                        zIndex: itemCount - index,
                        transform: translateY,
                        opacity,
                    }}
                >
                    {children}
                </s.Item>
            </UnstackerItemContext.Provider>
        </s.ItemPlaceholder>
    )
}

const UnstackerNavigation = ({
    progress,
    itemCount,
    navigationItems,
}: {
    progress: MotionValue
    itemCount: number
    navigationItems?: {
        title: string
    }[]
}) => {
    const [isVisible, setIsVisible] = useState(false)
    const [activeIndex, setActiveIndex] = useState(0)

    // 1 - 1/childCount is when the last item starts to slide off the screen,
    // and the effect is effectively over
    const slideFraction = 1 / itemCount

    const activeSlide = useTransform(
        progress,
        [0, 1 - slideFraction],
        [0, itemCount],
        {
            clamp: false,
        }
    )
    const [isReady, setIsReady] = useState(false)

    useIsomorphicLayoutEffect(() => {
        setTimeout(() => {
            setIsReady(true)
        }, 1000)
    }, [])

    useIsomorphicLayoutEffect(() => {
        return progress.onChange((v) => {
            const newVisibleState = v > -0.1 && v < 1 - slideFraction * 0.8
            const isDifferentFromState = newVisibleState !== isVisible
            if (isReady && isDifferentFromState) {
                setIsVisible(newVisibleState)
            }
        })
    }, [progress, isReady, isVisible])

    useIsomorphicLayoutEffect(() => {
        return activeSlide.onChange((v) => {
            let indexToSet = Math.floor(v)
            if (indexToSet >= itemCount) {
                indexToSet = itemCount - 1
            }
            if (indexToSet !== activeIndex) {
                setActiveIndex(indexToSet)
            }
        })
    }, [activeIndex, activeSlide])

    if (!isReady) {
        return null
    }

    return (
        <s.Navigation
            as={motion.div}
            animate={{
                translateX: isVisible ? 0 : -100,
                opacity: isReady && isVisible ? 1 : 0,
            }}
            initial={{
                translateX: -100,
            }}
            data-hint={`Active index ${activeIndex}`}
            // this is not necessary for screen readers. Tabbing continues to the next slide.
            aria-hidden="true"
        >
            {times(itemCount, (i) => {
                return (
                    <s.NavigationDotClickable
                        key={i}
                        onClick={() => {
                            try {
                                document
                                    .querySelector(
                                        `#${generateId({ index: i })}`
                                    )
                                    .scrollIntoView({ behavior: 'smooth' })
                            } catch (ex) {
                                console.log(ex)
                            }
                        }}
                        $active={i === activeIndex}
                    >
                        <s.NavigationDot />
                        <s.NavigationText
                        // slide in when active
                        // as={motion.div}
                        // style={
                        //     i === activeIndex
                        //         ? {
                        //               opacity: 1,
                        //               translateX: '0%',
                        //           }
                        //         : {
                        //               opacity: 0,
                        //               translateX: '-50%',
                        //           }
                        // }
                        >
                            {navigationItems[i].title}
                        </s.NavigationText>
                    </s.NavigationDotClickable>
                )
            })}
        </s.Navigation>
    )
}

/**
 * Generic unstacker component
 */
export interface UnstackerGenericProps {
    debug?: boolean
    navigationItems?: {
        title: string
    }[]
    easings?: {
        vertical: number[]
        text1: number[]
        text2: number[]
        text3: number[]
        textOpacity: number[]
    }
    heroTitle?: string

    items?: UnstackerItemProps[]
}

const getScrollY = () => (typeof window !== 'undefined' ? window.scrollY : 0)

export const UnstackerGeneric: FC<UnstackerGenericProps> = ({
    children,
    debug,
    easings,
    navigationItems,
    heroTitle,
    items,
}) => {
    const ref = useRef<HTMLDivElement>()
    const rect = useRect(ref)
    const { scrollY } = useScroll()
    const [range, setRange] = useState([
        getScrollY() + rect.top,
        getScrollY() + rect.bottom,
    ])
    /**
     * Progress is determined by the scroll range that is:
     *
     * Enter: element TOP reaches viewport BOTTOM
     * Exit: element BOTTOM reaches viewport TOP
     */
    const totalProgress = useTransform(scrollY, range, [0, 1], {
        clamp: false,
    })
    const [isFixed, setIsFixed] = useState(false)
    const router = useRouter()

    useIsomorphicLayoutEffect(() => {
        setRange([
            // this should be an absolute top
            getScrollY() + rect.top,
            getScrollY() + rect.bottom,
        ])
        const destroy = totalProgress.onChange((v) => {
            setIsFixed(v > 0)
        })

        return () => {
            destroy()
        }
    }, [totalProgress, rect, router.asPath])

    // increasing this increases the amount of "real" scroll per slide
    const itemHeightVh = '150vh'

    const isMobile = useResponsiveQuery({ from: 'xs', to: 'sm' })

    // hide initial load state
    const [isReady, setIsReady] = useState(false)
    useIsomorphicLayoutEffect(() => {
        setTimeout(() => {
            setIsReady(true)
        }, 250)
    }, [])

    return (
        <UnstackerContext.Provider
            value={{
                debug,
                easings: easings || unstackerContextDefault.easings,
                heroTitle,
            }}
        >
            <s.Unstacker
                $itemCount={Children.count(children)}
                $itemHeight={itemHeightVh}
                $debug={debug}
                ref={ref}
                style={{
                    opacity: isReady ? 1 : 0,
                }}
            >
                {Children.map(children, (child, index) => (
                    <UnstackerItemAnimator
                        key={index}
                        index={index}
                        progress={totalProgress}
                        isFixed={isFixed}
                        itemCount={Children.count(children)}
                        itemHeightVh={itemHeightVh}
                    >
                        {child}
                    </UnstackerItemAnimator>
                ))}
                {/* disable on mobile, or if there's only 1 slide */}
                {!isMobile && Children.count(children) > 1 && (
                    <UnstackerNavigation
                        itemCount={Children.count(children)}
                        progress={totalProgress}
                        navigationItems={navigationItems}
                    />
                )}
            </s.Unstacker>

            {debug && <ProgressBar progress={totalProgress} color="red" />}
        </UnstackerContext.Provider>
    )
}

export const UnstackerScrollContained: FC<UnstackerGenericProps> = ({
    children,
    debug,
    easings,
    navigationItems,
    heroTitle,
    items,
    ...props
}) => {
    const itemHeightVh = 100
    const isMobile = useResponsiveQuery({ from: 'xs', to: 'sm' })
    debug = true
    return (
        <ScrollBasedAnimationContainer
            debug={debug}
            scrollHeight={items.length * itemHeightVh + 'vh'}
            renderFixedPositionedContent={({ animationProgress }) => {
                return (
                    <>
                        {debug && (
                            <ProgressBar
                                progress={animationProgress}
                                color="red"
                            />
                        )}
                    </>
                )
            }}
        >
            {({ animationProgress }) => (
                <UnstackerContext.Provider
                    value={{
                        debug,
                        easings: easings || unstackerContextDefault.easings,
                        heroTitle,
                    }}
                >
                    {items.map((item, index) => (
                        <UnstackerItemAnimator
                            key={index}
                            index={index}
                            progress={animationProgress}
                            isFixed={true}
                            itemCount={items.length}
                            itemHeightVh={itemHeightVh + 'vh'}
                        >
                            <UnstackerItem key={'child-' + index} {...item} />
                        </UnstackerItemAnimator>
                    ))}
                </UnstackerContext.Provider>
            )}
        </ScrollBasedAnimationContainer>
    )
}

export interface UnstackerProps {
    heroTitle?: string
    items?: UnstackerItemProps[]
}
export const Unstacker: FC<UnstackerProps> = ({
    children,
    items,
    ...props
}) => {
    return <div>Obsoleted by new designs</div>
}

const UnstackerNavigationLine = ({
    progress,
    itemCount,
    navigationItems,
}: {
    progress: MotionValue
    itemCount: number
    navigationItems?: {
        title: string
    }[]
}) => {
    const [isVisible, setIsVisible] = useState(false)

    const [activeIndex, setActiveIndex] = useState(0)

    // 1 - 1/childCount is when the last item starts to slide off the screen,
    // and the effect is effectively over
    const slideFraction = 1 / itemCount

    const activeSlide = useTransform(
        progress,
        [0, 1 - slideFraction],
        [0, itemCount],
        {
            clamp: false,
        }
    )

    useIsomorphicLayoutEffect(() => {
        return progress.onChange((v) => {
            setIsVisible(v > 0 && v < 1 - slideFraction * 0.3)
        })
    }, [progress])

    useIsomorphicLayoutEffect(() => {
        return activeSlide.onChange((v) => {
            let indexToSet = Math.floor(v)
            if (indexToSet >= itemCount) {
                indexToSet = itemCount - 1
            }
            if (indexToSet !== activeIndex) {
                setActiveIndex(indexToSet)
            }
        })
    }, [activeIndex, activeSlide])

    const progressPercentage = useTransform(progress, [0, 1], ['0%', '100%'])

    return (
        <motion.div
            style={{
                position: 'fixed',
                top: '20%',
                bottom: '20%',
                left: 10,
                width: 2,
                background: '#f5f5f5',
                translateX: isVisible ? 0 : -50,
            }}
        >
            <motion.div
                style={{
                    position: 'absolute',
                    top: '0px',
                    bottom: 0,
                    left: 0,
                    width: 1,
                    background: 'black',
                    height: progressPercentage,
                }}
            ></motion.div>

            {times(itemCount, (i) => {
                const isActive = activeIndex === i
                return (
                    <motion.div
                        style={{
                            height: 1,
                            width: isActive ? 10 : 0,
                            background: 'red',
                            position: 'absolute',
                            top: `calc(100% / ${itemCount - 1} * ${i})`,
                        }}
                    />
                )
            })}
        </motion.div>
    )
}

/**
 * This is an idea to implement decaying requestAnimationFrame based
 * animations on scroll release.
 */
class AnimationHandler {
    containerElement: HTMLElement
    htmlElement: HTMLElement
    startTimestamp: number
    isAnimating: boolean
    scrollDirection: 'up' | 'down'
    constructor(containerElement) {
        this.containerElement = containerElement
        this.htmlElement = document.querySelector('html')
    }
    bind() {
        window.addEventListener('wheel', this.wheelHandler.bind(this), {
            passive: false,
        })
    }
    destroy() {
        window.removeEventListener('wheel', this.wheelHandler.bind(this))
    }
    wheelHandler(ev: WheelEvent) {
        console.log(`${ev.deltaY}`)
        const isGoingDown = ev.deltaY > 0
        this.scrollDirection = isGoingDown ? 'down' : 'up'
        // This fails pretty hard on touchpads with fast inputs,
        // and decaying wheel events that persist for seconds.
        // TODO: only apply if intent, so if we scrolled a little bit
        if (this.scrollDirection === 'down') {
            const nextVisible = this.getNextElementsPeekingViewport()
            if (nextVisible) {
                console.log(
                    'first visible top',
                    nextVisible.getBoundingClientRect().top
                )

                // nextVisible.style.background = '#eee'
                this.start(ev, nextVisible)
            }
        } else {
        }
    }
    getNextElementsPeekingViewport() {
        // we really need to get the next one, not this one.
        const nextElements = filter(
            document.querySelectorAll('[data-scroll-snap]'),
            (element) => {
                const itemBCR = element.getBoundingClientRect()
                const BOTTOM_RANGE = 300
                return itemBCR.top > window.innerHeight - BOTTOM_RANGE
            }
        )
        console.log('Visible in VP', nextElements)
        if (nextElements.length > 0) {
            return nextElements[0]
        }
    }

    smoothScrollTo(y: number, { duration = 400, offset = 0 } = {}) {
        const easeOutCubic = (t: number) => --t * t * t + 1
        const startY = window.scrollY
        const difference = y - startY
        const startTime = performance.now()

        if (y === startY + offset) {
            return Promise.resolve(undefined)
        }

        return new Promise((resolve, reject) => {
            const step = () => {
                const progress = (performance.now() - startTime) / duration
                const amount = easeOutCubic(progress)
                window.scrollTo({ top: startY + amount * difference - offset })
                if (progress < 0.99) {
                    window.requestAnimationFrame(step)
                } else {
                    resolve(undefined)
                }
            }
            step()
        })
    }

    start(ev, target) {
        ev.preventDefault()
        const absoluteTarget =
            target.getBoundingClientRect().top + window.scrollY

        this.smoothScrollTo(absoluteTarget, {
            duration: 1500,
            offset: 0,
        }).then(() => {
            this.isAnimating = false
        })

        // console.log('Starting to target')
        // const frameHandler = (t) => {
        //     ev.preventDefault()
        //     if (!this.startTimestamp) {
        //         this.startTimestamp = t

        //         console.log('started timestamp', this.startTimestamp)
        //     }
        //     const elapsedMs = t - this.startTimestamp

        //     const targetBCR = target.getBoundingClientRect()

        //     // console.log('frame handled', startTime, timeElapsed)
        //     // which way do we go?
        //     // scroll top vs absolute top
        //     const absoluteTop = targetBCR.top + window.scrollY

        //     // if target is below, we need to add scroll top
        //     const isTargetBelow = absoluteTop > window.scrollY
        //     const scrollDirection = isTargetBelow ? 1 : -1

        //     const distanceToGo = window.scrollY - absoluteTop

        //     // const scrollDelta = scrollDirection * progress *
        //     const targetMs = 500
        //     //
        //     const progress = elapsedMs >= targetMs ? 1 : elapsedMs / targetMs

        //     const scrollDelta = distanceToGo * progress
        //     // console.log('Scroll delta', progress * distanceToGo)

        //     // const isAtTarget = absoluteTop === window.scrollY

        //     // the top of the target, relative to the top of the viewport.
        //     // is a positive number if below the top of the viewport
        //     // is a negative number if above the top of the viewport

        //     const isAtTarget = targetBCR.top === 0

        //     // until we are at the target, scroll towards the target.
        //     // fail safe elapsed
        //     if (elapsedMs < 1000 && !isAtTarget) {
        //         this.htmlElement.scrollTop += scrollDirection
        //         requestAnimationFrame(frameHandler.bind(this))
        //     } else {
        //         console.log('Done animating')
        //         this.isAnimating = false
        //         this.startTimestamp = null
        //     }
        // }
        // requestAnimationFrame(frameHandler)
    }
}
