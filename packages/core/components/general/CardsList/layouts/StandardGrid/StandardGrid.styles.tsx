import styled, { css } from 'styled-components'
import { media, typography } from '@rightpoint/core/styles'

// local alias to coordinate query at which we stack the cards

export const StandardGridStyles = {
    StandardGrid: styled.div`
        display: grid;
        grid-template-columns: 1fr;
        row-gap: 40px;
        column-gap: 20px;

        ${media('md')} {
            grid-template-columns: 1fr 1fr;
            row-gap: 60px;
        }
        ${media('lg')} {
            grid-template-columns: 1fr 1fr 1fr;
            row-gap: 80px;
        }
        ${media('xxl')} {
            row-gap: 120px;
        }
    `,
    Item: styled.div``,
}
