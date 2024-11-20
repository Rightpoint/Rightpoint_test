import { ContainerWidths } from './container'

/**
 * Container type validation functions.
 */
export const containerTypeUtils = {
    getContainerWidth(container: string | boolean) {
        /**
         * Support old scenario of boolean container
         */
        if (typeof container === 'boolean') {
            return ContainerWidths.Default
        }
        const isValid = (color: string): color is ContainerWidths => {
            return color in ContainerWidths
        }
        return isValid(container) ? container : ContainerWidths.None
    },
}
