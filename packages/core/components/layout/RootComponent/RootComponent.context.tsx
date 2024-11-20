import { createContext, useContext, useEffect } from 'react'

export const RootComponentContext = createContext({
    isFirst: false,
    isLast: false,
    index: 0,
    totalCount: 0,
    id: '',
    container: false,
    removeFirstLastSpacing: true,
    setComponentContext: (arg) => {},
})
