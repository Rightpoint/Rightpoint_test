import { createContext } from 'react'

export const AnimationContext = createContext({
    disableAnimations: false,
})

export const AnimationsDisabled = ({ children }) => {
    return (
        <AnimationContext.Provider value={{ disableAnimations: true }}>
            {children}
        </AnimationContext.Provider>
    )
}
