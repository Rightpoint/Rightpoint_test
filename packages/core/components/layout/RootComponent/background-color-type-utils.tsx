import { BackgroundColors, ContentColors } from './background-color'

/**
 * Background color CMS validation functions.
 */
export const backgroundTypeUtils = {
    getContentColor(colorIn: string) {
        const isValid = (color: string): color is ContentColors => {
            return color in ContentColors
        }
        return isValid(colorIn) ? colorIn : null
    },
    getBackgroundColor(colorIn: string) {
        const isValid = (color: string): color is BackgroundColors => {
            return color in BackgroundColors
        }
        return isValid(colorIn) ? colorIn : null
    },
}
