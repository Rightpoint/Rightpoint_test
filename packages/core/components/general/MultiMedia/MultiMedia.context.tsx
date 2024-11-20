import { createContext, FC, ReactNode, useContext } from 'react'
import { useResponsiveQuery } from 'atomic-layout'
import {
    AspectWrapperContextProps,
    AspectWrapperContextProvider,
} from '../../utils/AspectWrapper/AspectWrapper.context'

export interface MultiMediaContextProps {
    // if we need to control child multi media components
    aspectWrapperProps?: AspectWrapperContextProps
    imagePriority?: boolean
    sizes?: string
}

/**
 * Global context used to pass global props to all components.
 */
export const MultiMediaContext = createContext<MultiMediaContextProps>({
    imagePriority: false,
    sizes: '',
})

export const useMultiMediaContext = () => {
    return useContext(MultiMediaContext)
}

interface MultiMediaContextProvider extends MultiMediaContextProps {
    children?: ReactNode
}
export const MultiMediaContextProvider: FC<MultiMediaContextProvider> = ({
    children,
    aspectWrapperProps,
    imagePriority,
}) => {
    return (
        <MultiMediaContext.Provider
            value={{
                imagePriority,
            }}
        >
            <AspectWrapperContextProvider {...aspectWrapperProps}>
                {children}
            </AspectWrapperContextProvider>
        </MultiMediaContext.Provider>
    )
}
