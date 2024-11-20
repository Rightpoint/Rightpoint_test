import { colors, transitions } from '@rightpoint/core/variables'
import styled, { css } from 'styled-components'
import {
    cssVarsTypography,
    cssVarsTypographyValues,
    typography,
} from '@rightpoint/core/styles'

const buttonCss = css<{ size?: 'large' | 'medium' }>`
    ${typography.FoundersB200Css}

    ${cssVarsTypography.buttonBgColor};
    ${cssVarsTypography.buttonTextColor};

    text-align: center;
    display: inline-block;
    padding: 12px 30px;

    border-radius: 60px;
    text-decoration: none;

    cursor: pointer;

    transition: ${transitions.hover.default};
    &:hover {
        opacity: 0.7;
    }
`

const Button = styled.div`
    ${buttonCss}
`

export const ButtonStyles = {
    Button,
    buttonCss,
}
