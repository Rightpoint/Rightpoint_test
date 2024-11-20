import styled, { css } from 'styled-components'
import {
    cssVarNames,
    cssVarsTypography,
    media,
    typography,
} from '@rightpoint/core/styles'

const Text = styled.div`
    padding-bottom: 100px;
    ${cssVarsTypography.textColor}
    ${media('lg')} {
        padding-bottom: 100px;
        max-width: 1000px;
        margin: 0 auto;
    }
`

const Media = styled.div`
    min-width: 300px;
    width: 50%;
    margin: 0 auto;
`

const ContentLarge = styled.div`
    text-align: center;
    padding: 100px 20px;

    ${media('md')} {
        padding-left: 100px;
        padding-right: 100px;
        padding-top: 120px;
        padding-bottom: 170px;
    }
    max-width: 1300px;
    margin: 0 auto;

    ${typography.H3Css}
    ${cssVarsTypography.textColor}
    
    b,
    strong {
        font-family: var(${cssVarNames.typography.fontSans});
        font-weight: 100;
    }
`

const Header = styled.div``

export const HeaderStyles = {
    Header,
    Text,
    Media,
    ContentLarge,
}
