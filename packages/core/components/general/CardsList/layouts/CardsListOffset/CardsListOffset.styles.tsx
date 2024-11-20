import styled, { css } from 'styled-components'
import { media, typography } from '@rightpoint/core/styles'

// local alias to coordinate query at which we stack the cards
const mediaDesktop = media('md')

export const CardsListOffsetStyles = {
    CardsListOffset: styled.div`
        display: grid;
        grid-template-columns: 1fr;
        row-gap: 100px;

        ${mediaDesktop} {
            grid-template-columns: 1fr 1fr 1fr;
            grid-gap: 20px;
            row-gap: 60px;
        }
    `,
    OffsetItem: styled.div`
        ${media('md')} {
            &:nth-child(2),
            &:nth-child(3n + 2) {
                margin-top: 75px;
            }
            &:nth-child(3n + 3) {
                margin-top: 150px;
            }
        }

        ${media('xl')} {
            &:nth-child(2),
            &:nth-child(3n + 2) {
                margin-top: 100px;
            }
            &:nth-child(3n + 3) {
                margin-top: 200px;
            }
        }
    `,
}
