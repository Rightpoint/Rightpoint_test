import { css } from 'styled-components'
import { typography } from '../typography/typography'
import { cssVarNames } from './var-names'

export const fontVars = css`
    ${cssVarNames.typography.fontSans}: ${typography.utils.fontFamilyValues
        .sans};
    ${cssVarNames.typography.fontSerif}: ${typography.utils.fontFamilyValues
        .serif};
`
