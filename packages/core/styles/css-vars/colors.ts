import { cssVarNames } from './var-names'
import { css } from 'styled-components'
import { colors } from '../../variables'

const { colors: colorVars } = cssVarNames

type ValueOf<T> = T[keyof T]
type ColorToHex = {
    [key in ValueOf<typeof cssVarNames.colors>]: string
}
const colorCssVarToColorHex: ColorToHex = {
    [colorVars.black]: colors.black,
    [colorVars.navy]: colors.navy,
    [colorVars.white]: colors.white,
    [colorVars.whiteNavyHover]: colors.whiteNavyHover,
    [colorVars.gray]: colors.gray,
    [colorVars.divider]: colors.divider,
    [colorVars.coral]: colors.coral,
    [colorVars.accent]: colors.accent,
    [colorVars.lightBlue]: colors.lightBlue,
}

export const colorCssVars = css`
    ${Object.entries(colorCssVarToColorHex).map(
        ([varname, colorHex]) => `${varname}: ${colorHex};`
    )}
`
