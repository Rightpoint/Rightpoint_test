import {
    motion,
    useInView,
    useMotionValue,
    useScroll,
    useTransform,
} from 'framer-motion'
import { get, isEmpty, isString, keys, uniqueId } from 'lodash'
import * as React from 'react'
import { useContext, useEffect, useMemo, useRef, useState } from 'react'
import styled, { css } from 'styled-components'
import {
    ImageFill,
    ImageProps,
    ImageWithAspect,
} from '../../general/Image/Image.component'
import { AnimationContext } from '../AnimationContext'

const animationDefaultStyles = {
    opacity: 1,
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    scale: 1,
    translateX: 0,
    translateY: 0,
}

const animationDefaults = {
    initial: {
        ...animationDefaultStyles,
    },
    final: {
        ...animationDefaultStyles,
    },
}

type SurfaceAnimationPropsStyles = {
    left?: number | string
    scale?: number
    opacity?: number
    translateY?: number | string
    translateX?: number | string
    scrollProgress?: number
}

type ScrollOffsetValue = 'start start' | 'start end' | 'end start' | 'end end'

export type ScrollOffset = [ScrollOffsetValue, ScrollOffsetValue]

export type AnimationType = 'in-viewport' | 'scroll'

export type SurfaceAnimationProps = {
    initial?: SurfaceAnimationPropsStyles
    final?: SurfaceAnimationPropsStyles
    target?: 'content' | 'root'
    type?: AnimationType
    scrollOffset?: ScrollOffset
}

type SurfaceProps = {
    aspectRatio?: number
    rounded?: boolean
    style?: any
    children?: React.ReactNode
    animation?: SurfaceAnimationProps
    color?: string
    debug?: boolean
    backgroundMedia?: ImageProps
}

const valueUnit = (value) => {
    return isString(value) ? value.replace(/[-0-9.\s]+/g, '').toLowerCase() : ''
}

const valueNumber = (value) => {
    return isString(value)
        ? parseFloat(value.replace(/[^\-0-9.]+/g, '').toLowerCase())
        : value
}

const AspectRatioWrapper = styled.div<any>`
    ${({ $aspectRatio }) =>
        $aspectRatio
            ? css`
                  padding-bottom: ${100 / $aspectRatio}%;
              `
            : css`
                  position: absolute;
                  inset: 0;
              `}
`

const Content = styled.div<any>`
    ${({ $fillParent }) =>
        $fillParent &&
        css`
            position: absolute;
            inset: 0;
        `}
`

const Root = styled.div<any>`
    position: relative;
    background: ${({ $color }) => $color};
    display: flex;

    ${({ rounded }) =>
        rounded &&
        css`
            border-radius: 10px;
            overflow: hidden;
        `}
`

const useStyleValueTransform = (
    animation,
    styleName,
    animationProgress,
    scrollProgressInterval = [0, 1]
) => {
    const initialValue = get(
        animation,
        `initial.${styleName}`,
        animationDefaults.initial[styleName]
    )
    const finalValue = get(
        animation,
        `final.${styleName}`,
        animationDefaults.final[styleName]
    )

    const unit = valueUnit(initialValue)

    const outputInterval = [valueNumber(initialValue), valueNumber(finalValue)]

    const outputValue = useTransform(
        animationProgress,
        scrollProgressInterval,
        outputInterval
    )

    const outputValueAsString = useTransform(
        outputValue,
        (p) => `${p.toFixed(4)}${unit}`
    )

    return isEmpty(unit) ? outputValue : outputValueAsString
}

const AnimationInternal = React.forwardRef(
    (
        {
            Component,
            className,
            debug: debugEnabled,
            style,
            children,
            scrollSourceRef,
            animation,
            ...props
        }: any,
        ref
    ) => {
        const debug = debugEnabled
            ? console.log.bind(console, '[DEBUG][Surface]')
            : () => {}

        const animationContext = useContext(AnimationContext)

        const scrollOffset = get(
            animation,
            'scrollOffset',
            animationContext.scrollOffset
        )
        const animationType =
            get(animation, 'type', animationContext.type) || 'scroll'

        const isInView = useInView(scrollSourceRef)

        debug('Render animation internal', {
            isInView,
            element: scrollSourceRef.current,
            animationType,
        })

        const scrollProgressInterval = [
            get(animation, 'initial.scrollProgress', 0),
            get(animation, 'final.scrollProgress', 1),
        ]

        const { scrollYProgress } = useScroll({
            target: scrollSourceRef,
            offset: [
                get(scrollOffset, '0', 'start end'),
                get(scrollOffset, '1', 'end end'),
            ],
        })

        const inViewportProgress = useMotionValue(0)

        const animationProgress =
            animationType === 'in-viewport'
                ? inViewportProgress
                : scrollYProgress

        const animatedStyles = useMemo(
            () =>
                Array.from(
                    new Set([
                        ...keys(get(animation, 'initial', {})),
                        ...keys(get(animation, 'final', {})),
                    ])
                ),
            [animation]
        )

        const motionValues = {}

        for (const styleName of animatedStyles) {
            motionValues[styleName] = useStyleValueTransform(
                animation,
                styleName,
                animationProgress,
                scrollProgressInterval
            )
        }

        useEffect(() => {
            debug('Is in view', isInView)
            inViewportProgress.set(isInView ? 1 : 0)
        }, [isInView, inViewportProgress])

        useEffect(() => {
            if (debugEnabled) {
                animationProgress.onChange((v) => {
                    console.log('animationProgress', v)
                })
            }
        }, [debugEnabled, animationProgress])

        return (
            <Component
                className={[]
                    .concat(className, 'debug-animated')
                    .filter(Boolean)
                    .join(' ')}
                ref={ref}
                as={motion.div}
                style={{
                    ...style,
                    ...motionValues,
                }}
                {...props}
            >
                {children}
            </Component>
        )
    }
)
const withAnimations = (Component) =>
    React.forwardRef(({ scrollSourceRef, ...props }: any, ref) => {
        const [dummyState, setDummyState] = useState(uniqueId())
        const internalRef = useRef(null)

        useEffect(() => {
            if (!internalRef?.current) {
                const intervalId = setInterval(() => {
                    if (
                        scrollSourceRef?.current &&
                        internalRef.current !== scrollSourceRef.current
                    ) {
                        internalRef.current = scrollSourceRef.current
                        setDummyState(uniqueId())
                        if (props.debug) {
                            console.log(
                                'Surface animated ref changed',
                                internalRef
                            )
                        }
                    }
                }, 1000)

                return () => {
                    clearInterval(intervalId)
                }
            }
        }, [props.debug, scrollSourceRef])

        return (
            <AnimationInternal
                key={dummyState}
                ref={ref}
                {...props}
                scrollSourceRef={internalRef}
                Component={Component}
            />
        )
    })

const AnimatedContent = withAnimations(Content)
const AnimatedRoot = withAnimations(Root)

export const Surface: React.FC<SurfaceProps> = ({
    children,
    rounded,
    aspectRatio,
    style,
    color,
    animation,
    debug: debugEnabled = false,
    backgroundMedia,
    ...props
}) => {
    const debug = debugEnabled
        ? console.log.bind(console, '[DEBUG][Surface]')
        : () => {}

    const isAnimated = !isEmpty(animation)

    const [dummyState, setDummyState] = useState(uniqueId())
    const {
        scrollSource = 'local',
        animationContextPresent,
        ...animationContext
    } = useContext(AnimationContext)

    const animationType =
        get(animation, 'type', animationContext.type) || 'scroll'

    const scrollSourceRef = useRef(null)

    debug('Surface render', {
        animationContextPresent,
        scrollSource,
        dummyState,
    })

    useEffect(() => {
        if (
            isAnimated &&
            animationContextPresent &&
            scrollSource &&
            !isString(scrollSource)
        ) {
            scrollSourceRef.current = scrollSource
            setDummyState(uniqueId())
        }
    }, [isAnimated, scrollSource, animationContextPresent])

    const RootImplementation =
        isAnimated && animation.target !== 'content' ? AnimatedRoot : Root
    const ContentImplementation =
        isAnimated && animation.target === 'content' ? AnimatedContent : Content

    const contentElement = (
        <ContentImplementation
            key={dummyState}
            className="debug-Content"
            scrollSourceRef={scrollSource === 'global' ? null : scrollSourceRef}
            animation={animation}
            $fillParent={Boolean(aspectRatio)}
            debug={debug}
        >
            {backgroundMedia && <ImageFill {...backgroundMedia} />}
            {children}
        </ContentImplementation>
    )

    return (
        <RootImplementation
            className="debug-Root"
            ref={(ref) => {
                if (ref && ref !== scrollSourceRef.current) {
                    if (
                        scrollSource === 'local' ||
                        !animationContextPresent ||
                        animationType === 'in-viewport'
                    ) {
                        scrollSourceRef.current = ref
                        setDummyState(uniqueId())
                    }
                }
            }}
            scrollSourceRef={scrollSource === 'global' ? null : scrollSourceRef}
            {...{
                rounded,
                style,
                animation,
                debug,
            }}
            $color={color}
        >
            {aspectRatio ? (
                <AspectRatioWrapper $aspectRatio={aspectRatio}>
                    {contentElement}
                </AspectRatioWrapper>
            ) : (
                contentElement
            )}
        </RootImplementation>
    )
}
