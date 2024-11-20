import { css } from 'styled-components'
import { colorCssVars } from './colors'
import { fontVars } from './font'
import { innerPaddingVars } from './inner-padding'
import { siteMarginVars } from './site-margin'

/**
 * Default CSS var declarations
 */
export const defaultCssVarValues = css`
    ${fontVars}
    ${colorCssVars}
    ${siteMarginVars}
    ${innerPaddingVars}
`
