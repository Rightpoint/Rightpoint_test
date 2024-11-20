import { colors, transitions } from '@rightpoint/core/variables'
import styled, { css } from 'styled-components'
import {
    cssVarsTypography,
    cssVarsTypographyValues,
    typography,
} from '@rightpoint/core/styles'
import type { ButtonSize } from './Button.component'

type ButtonCssProps = {
    $size?: ButtonSize
    $outlined?: boolean
}

const buttonOutlinedCss = css<ButtonCssProps>`
    ${typography.FoundersB200Css}
    background: transparent;
    border: 1px solid ${cssVarsTypographyValues.getTextColor()};
    color: ${cssVarsTypographyValues.getTextColor()};
`

// const buttonWithSvgCss = css`
//     svg {
//         width: 10px;
//         margin-left: 10px;
//         * {
//             fill: ${colors.white};
//         }
//     }
// `

const buttonCss = css<ButtonCssProps>`
    ${typography.FoundersB200Css}
    ${cssVarsTypography.buttonBgColor};
    ${cssVarsTypography.buttonTextColor};

    ${({ $outlined }) => $outlined && buttonOutlinedCss}

    text-align: center;
    display: inline-block;

    border-radius: 60px;
    text-decoration: none;

    cursor: pointer;

    transition: ${transitions.hover.default};
    &:hover {
        opacity: 0.7;
    }

    ${({ $size }) => {
        switch ($size) {
            case 'small':
                return css`
                    padding: 5px 20px 3px 20px;
                `
            default:
                return css`
                    padding: 10px 30px;
                `
        }
    }}
`

const Button = styled.div<ButtonCssProps>`
    ${buttonCss}
`

export const ButtonStyles = {
    Button,
    buttonCss,
    buttonOutlinedCss,
}
