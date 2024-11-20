export const getMarginBetweenComponents = ({
    isFirst,
    isLast,
    removeFirstLastSpacing,
    hasBackground,
    noMargins,
}) => {
    if (noMargins || hasBackground) {
        // no margins, if it has a background.
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
