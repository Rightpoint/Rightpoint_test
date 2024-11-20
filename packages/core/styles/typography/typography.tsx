import styled, { css, StyledComponent } from 'styled-components'
import { ResetByTagTags, resetByTag } from '../utils/resets'
import { media } from '../responsive/media-queries'
import { ComponentType } from 'react'
import { cssVarNames } from '../css-vars/var-names'
import { cssVarsTypography } from '../css-vars/typography'

type FontFamily = 'sans' | 'serif'

export enum FontWeights {
    Light = 300,
    Normal = 'normal',
    Bold = 700,
}

export enum TypeWidths {
    Default = 'Default',
}

export interface TypographyModifierProps {
    $reset?: ResetByTagTags
    $fontSmoothing?: 'antialiased' | 'subpixel-antialiased'
    $fontFamily?: FontFamily
    $fontWeight?: FontWeights
    $width?: TypeWidths
    $textAlign?: 'left' | 'center' | 'right'
}

/**
 * Allow conditionally removing default tag CSS
 */
const handleReset = css<TypographyModifierProps>`
    ${({ $reset }) => $reset && resetByTag[$reset]}
`

/**
 * Allow conditionally adding font smoothing
 * Use when background color is dark against serif fonts with curves
 */
const handleConditionalSmoothing = css<TypographyModifierProps>`
    ${({ $fontSmoothing }) =>
        $fontSmoothing
            ? `-webkit-font-smoothing: ${$fontSmoothing};`
            : `-webkit-font-smoothing: antialiased;`}
`

const getFontFamily = (fontFamily: FontFamily) => {
    if (fontFamily in fontFamilyCss) {
        return fontFamilyCss[fontFamily]
    }
    return ``
}

const handleAlignment = css<TypographyModifierProps>`
    ${({ $textAlign }) =>
        css`
            text-align: ${$textAlign};
        `}
`

const handleFonts = css<TypographyModifierProps>`
    ${({ $fontFamily }) => getFontFamily($fontFamily)}
    ${({ $fontWeight }) => $fontWeight && `font-weight: ${$fontWeight};`}
`

/**
 * Base CSS for all typography
 */
const typographyModifiers = css`
    ${handleConditionalSmoothing}
    ${handleFonts}
    ${handleAlignment}
`

const RECKLESS_SERIF = 'Reckless'
const RIFORMA_SANS = 'Riforma'
const FOUNDERS_GROTESK_SANS = 'Founders Grotesk'

const fontFamilyValues = {
    sans: FOUNDERS_GROTESK_SANS,
    serif: RECKLESS_SERIF,
}

const fontFeatureSettings = {
    recklessHeader: "font-feature-settings: 'ss04' on",
}

const foundersGrotesk = {
    fontFamilyCss: css`
        font-family: '${fontFamilyValues.sans}', sans-serif;
    `,
}

// const riforma = {
//     css: css`
//         font-family: '${fontFamilyValues.sans}', sans-serif;
//     `,
// }

const reckless = {
    fontFamilyCss: css`
        font-family: '${fontFamilyValues.serif}', serif-serif;
    `,
}

/**
 * Map font families to common names
 */
const fontFamilyCss = {
    serif: reckless.fontFamilyCss,
    sans: foundersGrotesk.fontFamilyCss,
}

/**
 * Construct typography css with base styles
 */
const constructCss = (cssIn) => {
    return css`
        // resets
        ${handleReset}
        // user css
        ${cssIn}
        // conditional modifiers
        ${typographyModifiers}
    `
}

export enum StyleNames {
    /**
     * V1 old styles
     *  */
    H1 = 'H1',
    H2 = 'H2',
    H3 = 'H3',
    H4 = 'H4',
    Subtitle = 'Subtitle',
    BodyS = 'BodyS',
    BodyM = 'BodyM',
    BodyL = 'BodyL',
    Link = 'Link',
    LinkS = 'LinkS',
    Button = 'Button',

    /**
     * V2 mid-design styles
     * these will be merged/refactored later
     */
    RecklessH300 = 'RecklessH300',
    RecklessH500 = 'RecklessH500',

    FoundersH100 = 'FoundersH100',
    FoundersH200 = 'FoundersH200',
    FoundersH300 = 'FoundersH300',
    FoundersH400 = 'FoundersH400',
    FoundersH600 = 'FoundersH600',
    FoundersH700 = 'FoundersH700',

    FoundersB100 = 'FoundersB100',
    FoundersB200 = 'FoundersB200',
    FoundersB300 = 'FoundersB300',
}

/**
 *
 *
 *
 */

type Styles = {
    [key in StyleNames]: {
        css: ReturnType<typeof css>
    }
}
/**
 * All typography styles defined in stylesheet
 */
const mediaDesktop = media('md')
const stylesCss: Styles = {
    /**
     * V1 Old styles
     * These exist only to not break existing pages.
     *  */
    [StyleNames.H1]: {
        css: constructCss(css`
            font-size: 4.8rem;
            letter-spacing: -0.02em;
            line-height: 1.15;
            font-weight: ${FontWeights.Light};
            ${fontFeatureSettings.recklessHeader};
            ${mediaDesktop} {
                font-size: 9.6rem;
            }
        `),
    },

    [StyleNames.H2]: {
        css: constructCss(css`
            font-size: 4.2rem;
            letter-spacing: -0.02em;
            line-height: 1.15;
            font-weight: ${FontWeights.Light};
            ${fontFeatureSettings.recklessHeader};
            ${mediaDesktop} {
                font-size: 6rem;
            }
        `),
    },

    [StyleNames.H3]: {
        css: constructCss(css`
            font-size: 3.4rem;
            line-height: 1.15;
            font-weight: ${FontWeights.Light};
            ${mediaDesktop} {
                font-size: 4.8rem;
            }
        `),
    },

    // for riforma, sans, we use light.
    [StyleNames.H4]: {
        css: constructCss(css`
            font-size: 2.4rem;
            letter-spacing: -0.01em;
            line-height: 1.2;
            font-weight: ${FontWeights.Light};
            ${mediaDesktop} {
                font-size: 3.2rem;
            }
        `),
    },
    // for riforma, sans, we use light.
    [StyleNames.Subtitle]: {
        css: constructCss(css`
            font-size: 1.8rem;
            letter-spacing: -0.01em;
            line-height: 1.2;
            font-weight: ${FontWeights.Light};
            ${mediaDesktop} {
                font-size: 3.2rem;
            }
        `),
    },
    [StyleNames.BodyL]: {
        css: constructCss(css`
            font-size: 1.8rem;
            line-height: 1.4;
            font-weight: ${FontWeights.Normal};

            ${mediaDesktop} {
                font-size: 2.4rem;
            }
        `),
    },

    [StyleNames.BodyM]: {
        css: constructCss(css`
            font-size: 1.4rem;
            line-height: 1.4;
            font-weight: ${FontWeights.Normal};
            ${mediaDesktop} {
                font-size: 1.8rem;
            }
        `),
    },

    [StyleNames.BodyS]: {
        css: constructCss(css`
            font-size: 1.2rem;
            line-height: 1.4;
            font-weight: ${FontWeights.Normal};
            ${mediaDesktop} {
                font-size: 1.4rem;
            }
        `),
    },

    [StyleNames.Link]: {
        css: constructCss(css`
            font-size: 1.4rem;
            line-height: 1.4;
            ${getFontFamily('serif')}

            ${cssVarsTypography.linkColor}

            ${mediaDesktop} {
                font-size: 1.8rem;
            }
        `),
    },

    [StyleNames.LinkS]: {
        css: constructCss(css`
            font-size: 1.2rem;
            line-height: 1.4;
            ${getFontFamily('serif')}

            ${cssVarsTypography.linkColor}

            ${mediaDesktop} {
                font-size: 1.4rem;
            }
        `),
    },

    [StyleNames.Button]: {
        css: constructCss(css`
            font-size: 1.2rem;
            ${getFontFamily('sans')}

            ${mediaDesktop} {
                font-size: 1.2rem;
            }
        `),
    },

    /**
     * V2 new styles.
     * These will be merged/refactored later as designs progress.
     */
    [StyleNames.FoundersH100]: {
        css: constructCss(css`
            ${foundersGrotesk.fontFamilyCss}
            font-weight: 400;
            font-size: 22.4rem;
            letter-spacing: -0.02em;
            line-height: 80%;
        `),
    },

    [StyleNames.FoundersH200]: {
        css: constructCss(css`
            ${foundersGrotesk.fontFamilyCss}
            font-weight: 400;
            font-size: 18.4rem;
            letter-spacing: -0.02em;
            line-height: 80%;
        `),
    },

    [StyleNames.FoundersH300]: {
        css: constructCss(css`
            ${foundersGrotesk.fontFamilyCss}
            font-weight: 400;
            font-size: 13rem;
            letter-spacing: -0.02em;
            line-height: 90%;
        `),
    },

    [StyleNames.RecklessH300]: {
        css: constructCss(css`
            ${reckless.fontFamilyCss}
            font-weight: 400;
            font-size: 13rem;
            letter-spacing: -0.02em;
            line-height: 90%;
        `),
    },

    [StyleNames.FoundersH400]: {
        css: constructCss(css`
            ${foundersGrotesk.fontFamilyCss}
            font-weight: 400;
            font-size: 7rem;
            letter-spacing: -0.02em;
            line-height: 90%;
        `),
    },

    [StyleNames.RecklessH500]: {
        css: constructCss(css`
            ${reckless.fontFamilyCss}
            font-weight: 400;
            font-size: 4.8rem;
            letter-spacing: -0.02em;
            line-height: 120%;
        `),
    },

    [StyleNames.FoundersH600]: {
        css: constructCss(css`
            ${foundersGrotesk.fontFamilyCss}
            font-weight: 400;
            font-size: 4.4rem;
            letter-spacing: -0.02em;
            line-height: 100%;
        `),
    },

    [StyleNames.FoundersH700]: {
        css: constructCss(css`
            ${foundersGrotesk.fontFamilyCss}
            font-weight: 400;
            font-size: 3.6rem;
            letter-spacing: -0.02em;
            line-height: 120%;
        `),
    },

    [StyleNames.FoundersB100]: {
        css: constructCss(css`
            ${foundersGrotesk.fontFamilyCss}
            font-weight: 400;
            font-size: 2.4rem;
            letter-spacing: 0;
            line-height: 120%;
        `),
    },
    [StyleNames.FoundersB200]: {
        css: constructCss(css`
            ${foundersGrotesk.fontFamilyCss}
            font-weight: 400;
            font-size: 1.7rem;
            letter-spacing: 0;
            line-height: 120%;
        `),
    },
    [StyleNames.FoundersB300]: {
        css: constructCss(css`
            ${foundersGrotesk.fontFamilyCss}
            font-weight: 400;
            font-size: 1.4rem;
            letter-spacing: 0;
            line-height: 120%;
        `),
    },
}

type StylesWithComponent = {
    [key in StyleNames]: StyledComponent<'div', any, any, any>
} & {
    [key in StyleNames as `${key}Css`]: ReturnType<typeof css>
} & {
    [key in StyleNames as `${key}Sans`]: ComponentType<TypographyModifierProps>
}

/**
 * Generate a styled component and css fragment
 * for usage in react, and css respectively.
 *
 * React: <MyStyle>{text}</MyStyle>
 * Styles: css|styled`
 *  ${myStyle}
 * `
 */
const stylesWithComponents: StylesWithComponent = Object.keys(stylesCss).reduce(
    (acc, styleName) => {
        const css_ = stylesCss[styleName].css

        /**
         * Create a React component for use via
         * - Extension: styled(Component)``
         * - Direct usage in React: <Component>Text</Component>
         */
        const Component = styled.div.withConfig({
            // this is necessary to calculate unique IDs reliably
            // it will fail on production, work on development if removed.
            displayName: styleName,
        })<TypographyModifierProps>`
            ${css_}
        `

        const ComponentSans = styled.div.withConfig({
            displayName: styleName + 'sans',
        })<TypographyModifierProps>`
            ${css_}
            ${getFontFamily('sans')};
        `

        /**
         * Store the CSS fragment for use in other styled components
         */
        acc[styleName] = Component
        acc[`${styleName}Sans`] = ComponentSans
        acc[`${styleName}Css`] = css_
        return acc
    },
    {} as StylesWithComponent
)

const stylesKeys = Object.keys(stylesWithComponents)

export const typography = {
    ...stylesWithComponents,

    // this is used to map out typography stories
    stylesKeys,

    // font families
    fonts: fontFamilyCss,

    // css utils
    utils: {
        typographyBase: typographyModifiers,
        constructCss,
        getFontFamily,
        fontFamilyValues,
        fontFeatureSettings,
    },
}
