import styled, { createGlobalStyle, css } from 'styled-components'
import { resets, typography } from '@rightpoint/core/styles'

export const ModalStyles = {
    Modal: styled.div``,
    Close: styled.button`
        ${resets.button}
        position: absolute;
        top: 20px;
        right: 20px;
    `,
    Title: styled(typography.FoundersH400)`
        margin-bottom: 1em;
    `,
}
