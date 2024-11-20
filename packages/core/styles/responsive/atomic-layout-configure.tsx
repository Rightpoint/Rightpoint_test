import Layout from 'atomic-layout'
import { breakpoints, Breakpoints } from './breakpoints'

export const configureAtomicLayout = () => {
    // custom breakpoints seems to break the "behavior" props of atomic-layout (up, down, only)
    // 100% breaks the navbar popup
    // const orderedBreakpoints = Object.entries(breakpoints).sort(
    //     (a, b) => a[1] - b[1]
    // )
    // const breakpoints_ = Object.assign(
    //     {},
    //     ...Object.entries(orderedBreakpoints).map((bp) => {
    //         const [_, pair] = bp
    //         return {
    //             [pair[0]]: {
    //                 minWidth: pair[1],
    //             },
    //         }
    //     })
    // )
    // // console.log('Breakpoints', breakpoints_)
    // Layout.configure({
    //     defaultBehavior: 'up',
    //     defaultBreakpointName: 'xs',
    //     breakpoints: breakpoints_,
    // })
}
