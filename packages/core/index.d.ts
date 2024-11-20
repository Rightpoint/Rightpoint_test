/**
 * the CSS prop needs to be enabled for styled components
 */
import { CSSProp } from 'styled-components'

declare module 'react' {
    interface Attributes {
        css?: CSSProp<any>
    }
}
