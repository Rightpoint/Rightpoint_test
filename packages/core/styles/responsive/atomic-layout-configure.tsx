import Layout from 'atomic-layout'
import { breakpoints, Breakpoints } from './breakpoints'

export const configureAtomicLayout = () => {
    // custom breakpoints seems to break the "behavior" props of atomic-layout (up, down, only)
    // disable for now.
    // Layout.configure({
    //     defaultBreakpointName: 'xs',
    //     breakpoints: Object.assign(
    //         {},
    //         ...Object.entries(breakpoints).map(([name, value]) => {
    //             return {
    //                 [name]: {
    //                     minWidth: value,
    //                 },
    //             }
    //         })
    //     ),
    // })
}
