import { css } from 'styled-components'
import { media } from '../responsive/media-queries'
import { cssVarNames } from './var-names'

export const siteMarginVars = css`
    ${cssVarNames.siteMargin}: 15px;
    ${media('md')} {
        ${cssVarNames.siteMargin}: 20px;
    }
`
