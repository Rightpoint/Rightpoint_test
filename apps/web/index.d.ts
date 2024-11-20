declare module '*.svg' {
    const content: any
    export const ReactComponent: any
    export default content
}

/**
 * the CSS prop needs to be enabled for styled components
 * -- a rogue @emotion typing is conflicting and causing build errors
 */
import { CSSProp } from 'styled-components'

declare module 'react' {
    interface Attributes {
        css?: CSSProp<MyTheme>
    }
}
