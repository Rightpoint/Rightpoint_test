import {
    cssVarNames,
    cssVarsTypography,
    cssVarUtils,
    hovers,
    resets,
    typography,
} from '@rightpoint/core/styles'
import styled, { css } from 'styled-components'

const BigLinkList = styled.div`
    text-align: center;
`

const Item = styled.div`
    text-transform: capitalize;
`

const Icon = styled.span`
    display: inline-block;
    vertical-align: middle;
    width: 0.35em;
    margin-bottom: 0.15em;
    transform: translateY(-0.33em) translateX(0.1em);
    transition: all 0.5s ease;

    path,
    rect {
        fill: ${cssVarUtils.withFallback(
            cssVarNames.content.colorAccent,
            cssVarNames.colors.accent
        )};
    }
`

const Link = styled(typography.H1).attrs({
    $fontFamily: 'serif',
})`
    ${resets.anchor}
    ${hovers.typography.body}    
    ${cssVarsTypography.textColor}
    &:hover {
        ${Icon} {
            transform: translateY(-0.4em) translateX(0.14em);
        }
        ${cssVarsTypography.linkColor}
    }
`

export const BigLinkListStyles = {
    BigLinkList,
    Item,
    Link,
    Icon,
}
