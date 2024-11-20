import { colors } from '@rightpoint/core/variables'
import { cssVarNames, zIndexes } from '@rightpoint/core/styles'
import { reduce } from 'lodash'
import { CSSProperties } from 'styled-components'
import { FC } from 'react'

/**
 * Background colors
 */
export enum BackgroundColors {
    None = 'None',
    Black = 'Black',
    LightBlue = 'LightBlue',
    DarkGrey = 'DarkGrey',
    Coral = 'Coral',
    Teal = 'Teal',
    Green = 'Green',
    Sand = 'Neutral2',
    Neutral2 = 'Neutral2',
}
type BackgroundColorDefinition = {
    hex: string
    contentColor: ContentColors
}
type BackgroundColorDefinitions = {
    [key in BackgroundColors]: BackgroundColorDefinition
}

/**
 * Content colors.
 *
 * These are the colors of content such as text, links, buttons, dividers, etc.
 */
export enum ContentColors {
    Dark = 'Dark',
    Light = 'Light',

    DarkWhiteAccent = 'DarkWhiteAccent',
    DarkBlackAccent = 'DarkBlackAccent',

    // since accents are coral, coral requires a specific override to make sure we can see the links
    Coral = 'Coral',
}
type ContentColorDefinition = {
    [k in keyof typeof cssVarNames.content]?: string
}
type ContentColorDefinitions = {
    [key in ContentColors]: ContentColorDefinition
}

/**
 * Content colors affect text color via css vars
 */
export const contentColorDefinitions: ContentColorDefinitions = {
    [ContentColors.Dark]: {
        colorText: colors.black,
        colorTextAlternate: colors.iron,

        colorDivider: colors.sand,

        colorButton: colors.black,
        colorButtonText: colors.white,
        colorButtonHover: colors.gray,
    },
    [ContentColors.Light]: {
        colorText: colors.white,
        colorTextAlternate: colors.stone,

        colorDivider: colors.sand,

        colorButton: colors.white,
        colorButtonText: colors.black,
        colorButtonHover: colors.gray,
    },

    [ContentColors.DarkWhiteAccent]: {
        colorText: '#000',
        colorAccent: colors.white,
    },
    [ContentColors.DarkBlackAccent]: {
        colorText: '#000',
        colorAccent: colors.black,
    },
    [ContentColors.Coral]: {
        colorAccent: colors.white,
        colorDivider: colors.black,

        colorButton: colors.black,
        colorButtonText: colors.white,
        colorButtonHover: colors.gray,
    },
}

/**
 * Map "named" background colors to hex values and content colors
 */
const backgroundColorDefinitions: BackgroundColorDefinitions = {
    [BackgroundColors.None]: {
        hex: '',
        contentColor: ContentColors.Dark,
    },
    [BackgroundColors.Black]: {
        hex: colors.black,
        contentColor: ContentColors.Light,
    },
    [BackgroundColors.DarkGrey]: {
        // hex: '#141317',
        hex: colors.black, // black has become a dark grey
        contentColor: ContentColors.Light,
    },
    [BackgroundColors.Coral]: {
        hex: colors.coral,
        contentColor: ContentColors.Coral,
    },
    [BackgroundColors.Teal]: {
        hex: colors.teal,
        contentColor: ContentColors.DarkWhiteAccent,
    },
    [BackgroundColors.Green]: {
        hex: colors.green,
        contentColor: ContentColors.DarkBlackAccent,
    },
    [BackgroundColors.LightBlue]: {
        hex: colors.lightBlue,
        contentColor: ContentColors.Dark,
    },

    // v2+
    [BackgroundColors.Neutral2]: {
        hex: colors.sand,
        contentColor: ContentColors.Dark,
    },
}

export type BackgroundColorData = {
    backgroundColor?: string
    contentColor?: ContentColors
}

/**
 * Get background color definition
 */
const getBackgroundColorDefinition = (
    background: BackgroundColorData
): BackgroundColorDefinition => {
    if (background.backgroundColor in backgroundColorDefinitions) {
        return backgroundColorDefinitions[background.backgroundColor]
    }
}

/**
 * Get CSS var styles for background color
 */
export const getBackgroundColorStyles = (
    background: BackgroundColorData = {}
): CSSProperties => {
    const backgroundColorDefinition = getBackgroundColorDefinition(background)
    if (backgroundColorDefinition) {
        return {
            backgroundColor: backgroundColorDefinition.hex,
        }
    }
    return {}
}

/**
 * Get content color name which is either specified explicitly
 * or inferred from the background color.
 *
 * If a content author needs to use an arbitrary color for backgrounds (Work Detail)
 * then they can specify a specific content color to use (Light, Dark)
 *
 * If a preset background is used, like "Black", then the content color is inferred
 * from the background color definition.
 */
export const getContentColorName = (
    background: BackgroundColorData
): ContentColors | null => {
    // return the content color if it's been set by the component explicitly
    if (background.contentColor in contentColorDefinitions) {
        return background.contentColor
    }
    // otherwise, return the content color based on the background color
    const backgroundColorDefinition = getBackgroundColorDefinition(background)
    if (backgroundColorDefinition && backgroundColorDefinition.contentColor) {
        return backgroundColorDefinition.contentColor
    }
    return null
}

/**
 * Get content color definition object
 */
export const getContentColorDefinition = (
    contentColorName: ContentColors
): ContentColorDefinition | null => {
    if (contentColorName in contentColorDefinitions) {
        return contentColorDefinitions[contentColorName]
    }
    return null
}

/**
 * Get content color CSS variables styles.
 *
 * Each key in a ContentColorDefinition is converted into its corresponding css var name.
 */
export const getContentColorStyles = (
    background: BackgroundColorData = {}
): CSSProperties => {
    const contentColorName = getContentColorName(background) // gets the content color if explicitly set, or the pair of the background color
    const contentColorDefinition = getContentColorDefinition(contentColorName)

    if (contentColorDefinition) {
        return Object.entries(contentColorDefinition).reduce(
            (prev, curr: [string, string]) => {
                const [key, value] = curr
                const cssVarName = cssVarNames.content[key]
                prev[cssVarName] = value
                return prev
            },
            {}
        )
    }
    return {}
}

// export const BackgroundColor: FC<{
//     background?: BackgroundColorData
// }> = () => {
//     return <div style={{ ...getBackgroundColorStyles() }}></div>
// }
