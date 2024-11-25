import { createContext, useContext } from 'react'
import type { GlobalPageProps } from '@rightpoint/core/next-contentful'

export type GlobalContextProps = {} & GlobalPageProps

export const GlobalContextDefaultValue = {
    __isPreview: false,
    __contentfulEnvironmentOverride: null,
    offices: [],
}

export const GlobalContext = createContext<GlobalContextProps>(
    GlobalContextDefaultValue
)
