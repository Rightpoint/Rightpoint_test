import { css } from 'styled-components'
import { ContentColors } from '../RootComponent/background-color'

/**
 * The "treatment" is a CSS filter applied to the image to make it more readable.
 *
 * This project has a lot of text overlaid on top of images, and there
 * needs to be consistent solutions to lack of contrast between images and text.
 */
export const backgroundColorTreatment = ({
    $treatmentLevel,
    $contentColor,
    $isInView,
}) => {
    if (!$isInView && $isInView !== undefined) {
        return ``
    }
    if (!$treatmentLevel) {
        return css`
            filter: saturate(1.5) // s
                contrast(0.9) // c
                brightness(
                    ${$contentColor === ContentColors.Dark ? 1 : 1}
                ); // b
        `
    }
    switch ($treatmentLevel) {
        case 'Subtle':
            return css`
                filter: saturate(2) // s
                    contrast(0.7) // c
                    brightness(
                        ${$contentColor === ContentColors.Dark ? 1.1 : 0.9}
                    ); // b
            `
        case 'Normal':
            return css`
                filter: saturate(3) // s
                    contrast(0.7) // c
                    brightness(
                        ${$contentColor === ContentColors.Dark ? 1.3 : 0.7}
                    ); // b
            `
        case 'Strong':
            return css`
                filter: saturate(4) // s
                    contrast(0.6) // c
                    brightness(
                        ${$contentColor === ContentColors.Dark ? 1.3 : 0.7}
                    ); // b
            `
        default:
            return ``
    }
}
