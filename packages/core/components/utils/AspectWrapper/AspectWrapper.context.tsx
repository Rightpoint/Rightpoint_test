import { createContext, FC, ReactNode, useContext } from 'react'
import { useResponsiveQuery } from 'atomic-layout'
import { MotionValue, useMotionValue } from 'framer-motion'

export enum AspectWrapperRatios {
    Default = 16 / 9,
    // optional reusable ratios
    Portrait = 165 / 200,
    Landscape = 16 / 9,
}
export interface AspectWrapperContextProps {
    aspectWrapperRatio?: string | number | AspectWrapperRatios
    aspectWrapperRatioDesktop?: string | number | AspectWrapperRatios
    aspectWrapperRatioMotionValue?: MotionValue
}

/**
 * Optional aspect wrapper context that takes precedence vs locally set ratios.
 *
 * Allows parent layout components to define the aspect ratio of the child content.
 */
export const AspectWrapperContext = createContext<AspectWrapperContextProps>({
    aspectWrapperRatio: '',
    aspectWrapperRatioMotionValue: null,
})

export const useAspectWrapperContext = () => {
    return useContext(AspectWrapperContext)
}

interface AspectWrapperContextProvider extends AspectWrapperContextProps {
    children?: ReactNode
}
/**
 * Control child AspectWrapper child ratios.
 */
export const AspectWrapperContextProvider: FC<AspectWrapperContextProvider> = ({
    children,
    aspectWrapperRatio,
    aspectWrapperRatioDesktop,
    aspectWrapperRatioMotionValue,
}) => {
    const isDesktop = useResponsiveQuery({ from: 'md' })

    const responsiveAspectWrapperRatio = isDesktop
        ? aspectWrapperRatioDesktop
        : aspectWrapperRatio

    return (
        <AspectWrapperContext.Provider
            value={{
                aspectWrapperRatio: responsiveAspectWrapperRatio,
                aspectWrapperRatioMotionValue,
            }}
        >
            {children}
        </AspectWrapperContext.Provider>
    )
}
