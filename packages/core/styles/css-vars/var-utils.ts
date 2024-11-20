export const cssVarUtils = {
    /**
     * @param var_ CSS varname
     * @param varFallback CSS varname
     * @returns var(--0, var(--1))
     */
    withFallback: (var_: string, varFallback: string) =>
        `var(${var_}, var(${varFallback}))`,
}
