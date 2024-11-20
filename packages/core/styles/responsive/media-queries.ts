import { breakpoints, Breakpoints } from './breakpoints'

type Media = (
    breakpoint: keyof typeof Breakpoints,
    end?: keyof typeof Breakpoints
) => string

export const media: Media = (breakpoint: Breakpoints, end: Breakpoints) => {
    return `@media screen and (min-width: ${breakpoints[breakpoint]}px) ${
        end ? `and (max-width: ${breakpoints[end]}px)` : ''
    }`
}

export const responsive = {
    media,
    breakpoints,
    Breakpoints,
}

export default responsive
