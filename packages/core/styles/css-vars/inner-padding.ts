import { css } from 'styled-components'
import { media } from '../responsive/media-queries'
import { cssVarNames } from './var-names'

export const innerPaddingVars = css`
    ${cssVarNames.innerPadding}: 15px;
    ${media('md')} {
        ${cssVarNames.innerPadding}: 20px;
    }
`
