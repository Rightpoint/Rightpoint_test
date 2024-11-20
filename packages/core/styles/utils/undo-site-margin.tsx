import styled, { css } from 'styled-components'

import { cssVarNames } from '../css-vars/var-names'

/**
 * @deprecated -- handled by root component
 */
export const undoSiteMarginCss = css`
    margin-left: calc(var(${cssVarNames.siteMargin}) * -1);
    margin-right: calc(var(${cssVarNames.siteMargin}) * -1);
`

/**
 * @deprecated -- handled by root component
 */
export const UndoSiteMargin = styled.div`
    ${undoSiteMarginCss}
`
