import 'styled-components'
import { DefaultTheme } from 'styled-components'
import { colors } from '@rightpoint/core/variables'
import { zIndexes } from '../misc/z-indexes'

declare module 'styled-components' {
    export interface DefaultTheme {
        colors: typeof colors
        zIndexes: typeof zIndexes
    }
}

export const theme: DefaultTheme = {
    colors,
    zIndexes,
}
