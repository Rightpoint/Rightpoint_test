export enum Breakpoints {
    xs = 'xs',
    sm = 'sm',
    md = 'md',
    lg = 'lg',
    xl = 'xl',
    xxl = 'xxl',

    mobileSm = 'mobileSm',
    mobileXs = 'mobileXs', //
}

export const breakpoints = {
    [Breakpoints.xs]: 0,
    [Breakpoints.mobileXs]: 321, // tiny fraction of users
    [Breakpoints.mobileSm]: 360,
    [Breakpoints.sm]: 576,
    [Breakpoints.md]: 768,
    [Breakpoints.lg]: 992,
    [Breakpoints.xl]: 1200,
    [Breakpoints.xxl]: 1440, // design spec
}
