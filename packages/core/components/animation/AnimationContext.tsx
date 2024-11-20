import { createContext, ProviderExoticComponent, ProviderProps } from 'react'
import {
    AnimationType,
    ScrollOffset,
} from '@rightpoint/core/components/animation/Surface/Surface'

export type AnimationContextType = {
    scrollSourceRef?: React.RefObject<HTMLElement>
    scrollSource?: HTMLElement | 'global' | 'local' | 'container'
    animationContextPresent?: boolean
    scrollOffset?: ScrollOffset
    type?: AnimationType
}

export const AnimationContext = createContext<AnimationContextType>({
    scrollSource: 'local',
    animationContextPresent: false,
    type: 'scroll',
})

export const AnimationContextCustomProvider = (props) => {
    return (
        <AnimationContextCustomProvider
            {...props}
            value={{
                ...props.value,
                animationContextPresent: true,
            }}
        />
    )
}
