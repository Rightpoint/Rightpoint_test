import styled, { css } from 'styled-components'
import { cssVarNames, media } from '@rightpoint/core/styles'

export const GridStyles = {
    GridLayout: styled.div`
        img {
            max-width: 100%;
        }
        .row-grid-margin-selector {
            & > * {
                &:not(:last-child) {
                    margin-bottom: 90px;
                }
            }
        }
    `,
}
