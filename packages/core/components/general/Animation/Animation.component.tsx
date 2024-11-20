import React, { ComponentType, createContext, FC, useContext } from 'react'
import { AnimationStyles, AnimationStyles as s } from './Animation.styles'
import { InViewFadeIn } from './in-viewport/InViewFadeIn'
import { InViewFadeSlideUp } from './in-viewport/InViewFadeSlideUp'
import { InViewSlideUp } from './in-viewport/InViewSlideUp'
import { Parallaxer } from '../ParallaxOnScroll/ParallaxOnScroll.component'
import { InViewFadeInLeft } from './in-viewport/InViewFadeLeft'
import { useResponsiveQuery } from 'atomic-layout'
import {
    animationSelectors,
    useAppSelector,
    AnimationSetNames,
} from '@rightpoint/core/redux'
import { ScrollInSlideUp } from './in-viewport/ScrollInSlideUp'
import { ScrollInParallax } from './in-viewport/ScrollInParallax'
import { InViewRevealFromBottomSlide } from './in-viewport/InViewRevealFromBottomSlide'
import { InViewSlideDownClip } from './in-viewport/InViewSlideDownClip'
import { InViewRevealFromBottom } from './in-viewport/InViewRevealFromBottom'
import { isEmpty } from 'lodash'
import { AnimationContext } from './Animation.context'

export interface AnimationProps {}

export const Animation: FC<AnimationProps> = () => {
    return <s.Animation>Animation; Wrapper TBD. Hook only for now.</s.Animation>
}

export enum AnimationTypes {
    FadeIn = 'FadeIn',
    FadeInLeft = 'FadeInLeft',
    FadeSlideUp = 'FadeSlideUp',
    SlideDownClip = 'SlideDownClip',
    SlideUp = 'SlideUp',
    RevealFromBottomSlide = 'RevealFromBottom+Slide',
    RevealFromBottom = 'RevealFromBottom',

    ScrollInSlideUp = 'ScrollInSlideUp',
    ScrollInParallax = 'ScrollInParallax',
}

type AnimationResponse = {
    Animation: ComponentType<any>
}

type UseAnimationInViewportOptions = {
    lessMovement?: boolean
    isImage?: boolean
    isText?: boolean
}
type UseAnimationInViewport = (
    arg?: UseAnimationInViewportOptions
) => AnimationResponse

const Noop: FC<any> = ({ children }) => <>{children}</>

const getAnimationByType = (type: AnimationTypes): FC<any> => {
    switch (type) {
        case AnimationTypes.FadeIn:
            return InViewFadeIn
        case AnimationTypes.FadeInLeft:
            return InViewFadeInLeft
        case AnimationTypes.FadeSlideUp:
            return InViewFadeSlideUp
        case AnimationTypes.SlideUp:
            return InViewSlideUp
        case AnimationTypes.SlideDownClip:
            return InViewSlideDownClip
        case AnimationTypes.ScrollInSlideUp:
            return ScrollInSlideUp
        case AnimationTypes.ScrollInParallax:
            return ScrollInParallax
        case AnimationTypes.RevealFromBottomSlide:
            return InViewRevealFromBottomSlide
        case AnimationTypes.RevealFromBottom:
            return InViewRevealFromBottom
        default:
            return Noop
    }
}

/**
 * Wraps animation components with a component that:
 * - When set, overrides animation based on user settings in redux
 *  (to explore animations from font end)
 * - Can render custom animations in place of the default ones seamlessly.
 *  (to have seamless DX with custom animations, while still being over-writeable)
 *  <Animation renderFallback={({children}) => <MyCustomAnimation>{children}</MyCustomAnimation>}>
 */
type Options = {
    animationSet?: AnimationSetNames
}
const withAnimationOverride = (
    AnimationComponent,
    options: Options = {
        animationSet: 'inViewportImage',
    }
) => {
    const Wrapped: FC<any> = ({ children, ...props }) => {
        /**
         * Animation context.
         * - Could prevent nested animations.
         */
        const animationTypeOverride = useAppSelector((state) =>
            animationSelectors.selectAnimationSet(state, options.animationSet)
        )
        const transition = useAppSelector((state) =>
            animationSelectors.selectAnimationSetTransition(
                state,
                options.animationSet
            )
        )
        // use the override
        if (animationTypeOverride && animationTypeOverride.type) {
            const Override = getAnimationByType(animationTypeOverride.type)

            return (
                <Override transition={isEmpty(transition) ? null : transition}>
                    {children}
                </Override>
            )
        }

        // use the fallback animation if not overridden
        if (props.renderFallback) {
            return props.renderFallback({ children, ...props })
        }

        // use the provided default animation
        return <AnimationComponent>{children}</AnimationComponent>
    }
    return Wrapped
}

const NoAnimation = ({ children }) => <>{children}</>

/**
 * This hook is used to animate in a component when it is in the viewport.
 *
 * It may return different components depending on configuration.
 *
 * Inputs may be contextual traits, and a combination of them can be used to determine output.
 */
export const useScrollAnimation: UseAnimationInViewport = ({
    lessMovement = false,
    isImage = false,
    isText = false,
} = {}) => {
    const { disableAnimations } = useContext(AnimationContext)

    if (disableAnimations) {
        return {
            Animation: NoAnimation,
        }
    }

    if (isImage) {
        return {
            Animation: InViewFadeIn,
        }
    }

    if (lessMovement) {
        return { Animation: InViewFadeIn }
    }

    return { Animation: InViewFadeSlideUp }
}

// export const withAnimation = (
//     Component,
//     options?: UseAnimationInViewportOptions
// ) => {
//     return (props) => {
//         const { Animation } = useScrollAnimation(options)
//         return (
//             <Animation>
//                 <Component {...props} />
//             </Animation>
//         )
//     }
// }
