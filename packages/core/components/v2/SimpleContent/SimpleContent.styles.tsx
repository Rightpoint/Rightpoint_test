import styled, { css } from 'styled-components'
import { cssVarsTypography, typography } from '@rightpoint/core/styles'

export const SimpleContentStyles = {
    SimpleContent: styled.div<{ $textAlign?: string }>`
        ${({ $textAlign }) =>
            $textAlign &&
            css`
                text-align: ${$textAlign};
            `}
        ${cssVarsTypography.textColor}
    `,
    RichText: styled.div``,
    Media: styled.div`
        & + * {
            margin-top: 30px;
        }
    `,
}
