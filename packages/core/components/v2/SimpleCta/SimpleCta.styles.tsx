import styled, { css } from 'styled-components'
import { typography } from '@rightpoint/core/styles'

export const SimpleCtaStyles = {
    SimpleCta: styled.div`
        text-align: center;
    `,
    Title: styled(typography.FoundersH600)`
        ${typography.utils.cssVarsTypography.textColor}
    `,
    Cta: styled.div`
        margin-top: 45px;
    `,
}
