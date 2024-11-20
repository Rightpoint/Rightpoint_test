import styled, { css } from 'styled-components'
import { media, typography } from '@rightpoint/core/styles'

export const CardsListStyles = {
    CardsList: styled.div`
        position: relative;
    `,

    Link: styled.div`
        margin-top: 100px;

        text-align: right;

        ${media('xs', 'md')} {
            text-align: center;
        }
    `,
}
