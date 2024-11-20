import styled, { css } from 'styled-components'

import { cssVarNames } from '../css-vars/var-names'

export const undoSiteMarginCss = css`
    margin-left: calc(var(${cssVarNames.siteMargin}) * -1);
    margin-right: calc(var(${cssVarNames.siteMargin}) * -1);
`

export const UndoSiteMargin = styled.div`
    ${undoSiteMarginCss}
`
