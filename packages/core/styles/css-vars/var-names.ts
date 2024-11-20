export const cssVarNames = {
    siteMargin: '--site-margin',

    innerPadding: '--inner-padding',

    // TODO: automate this from colors.ts?
    // Yes, automate.
    colors: {
        black: '--black',
        navy: '--navy',
        white: '--white',
        whiteNavyHover: '--white-navy-hover',
        gray: '--gray',
        coral: '--coral',
        divider: '--divider',
        accent: '--accent',
        lightBlue: '--light-blue',
    },

    /**
     * Colors that vary based on variable "Background Color" sets
     * Or specific "Content Color" sets set by content author or component.
     *
     * Colors that exist in an environment where they may change color should use these CSS variables to set color.
     *
     * See also: `cssVarsTypography` for CSS helpers to set colors.
     */
    content: {
        background: '--bg-color',

        colorText: '--bg-color-text',
        colorTextHover: '--bg-color-text-hover',
        colorAccent: '--bg-color-accent',

        colorTextAlternate: '--bg-color-text-alt',
        colorTextAlternateHover: '--bg-color-text-alt-hover',

        colorDivider: '--bg-color-divider',

        colorButton: '--bg-color-button',
        colorButtonText: '--bg-color-button-text',
        colorButtonHover: '--bg-color-button-hover',
    },

    typography: {
        fontSans: '--font-sans',
        fontSerif: '--font-serif',
    },

    components: {
        scroller: {
            width: '--swiper-slide-width',
        },
        card: {
            contentPadding: '--card-content-padding',
        },
    },
}
