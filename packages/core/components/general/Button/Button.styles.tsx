import { colors, transitions } from '@rightpoint/core/variables'
import styled, { css } from 'styled-components'
import {
    cssVarsTypography,
    cssVarsTypographyValues,
    typography,
} from '@rightpoint/core/styles'

const Button = styled.div<{ size?: 'large' | 'medium' }>`
    ${typography.ButtonCss}

    text-align: center;

    display: inline-block;

    padding: 12px 20px;
    min-width: 203px;
    border-radius: 60px;

    ${cssVarsTypography.buttonColor};
    ${cssVarsTypography.buttonTextColor};
    transition: ${transitions.hover.default};
    cursor: pointer;
    &:hover {
        background: ${colors.gray};
    }

    svg {
        width: 0.7em;
        transform: translateX(0.5em);
        * {
            fill: white;
        }
    }
`

export const ButtonStyles = {
    Button,
}
