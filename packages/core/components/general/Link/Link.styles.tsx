import styled, { css } from 'styled-components'
import {
    cssVarNames,
    cssVarsTypography,
    cssVarUtils,
    resetByTag,
} from '@rightpoint/core/styles'
import { typography } from '@rightpoint/core/styles'

const Link = styled.div``

const Anchor = styled.a<{ $enableLinkStyle?: boolean }>`
    text-decoration: none;
    ${({ $enableLinkStyle }) =>
        $enableLinkStyle &&
        css`
            ${cssVarsTypography.linkColor};
            text-decoration: underline;
        `}
`

export const LinkStyles = {
    Link,
    Anchor,
}
