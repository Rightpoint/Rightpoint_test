import { logDevelopmentOnly } from '@rightpoint/core/utils'

export const getMarginBetweenComponents = ({
    isFirst,
    isLast,
    removeFirstLastSpacing,
    hasBackground,
    noMargins,
}) => {
    if (noMargins || hasBackground) {
        return {}
    }
    if (removeFirstLastSpacing) {
        if (isFirst) {
            return { marginTop: 0 }
        }
        if (isLast) {
            return {
                marginBottom: 0,
            }
        }
    }
    return {
        marginTop: 150,
        marginBottom: 150,
    }
}
