import styled, { css } from 'styled-components'
import { media, typography } from '@rightpoint/core/styles'

const CardsList = styled.div``

export const CardsListStyles = {
    CardsList,

    SingleCard: styled.div`
        margin: 0 auto;
        ${media('md')} {
            max-width: calc(8 / 12 * 100%);
        }

        ${media('lg')} {
            max-width: calc(6 / 12 * 100%);
        }

        text-align: center;

        --card-content-padding: 0;
    `,
}
