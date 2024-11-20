export enum Breakpoints {
    xs = 'xs',
    sm = 'sm',
    md = 'md',
    lg = 'lg',
    xl = 'xl',
    xxl = 'xxl',

    smallMobile = 'smallMobile',
}

export const breakpoints = {
    [Breakpoints.xs]: 0,
    [Breakpoints.smallMobile]: 360,
    [Breakpoints.sm]: 576,
    [Breakpoints.md]: 768,
    [Breakpoints.lg]: 992,
    [Breakpoints.xl]: 1200,
    [Breakpoints.xxl]: 1400,
}
