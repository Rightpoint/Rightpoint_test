import styled, { css } from 'styled-components'
import { media, typography } from '@rightpoint/core/styles'

// local alias to coordinate query at which we stack the cards
const mediaDesktop = media('md')

export const CardsListFullWidthStyles = {
    CardsListFullWidth: styled.div`
        margin-bottom: 100px;
    `,
    Card: styled.div`
        &:not(:last-child) {
            padding-bottom: var(--spacing-vertical);
            margin-bottom: 20px;
            border-bottom: 1px solid ${(props) => props.theme.colors.black};
        }
    `,
}
