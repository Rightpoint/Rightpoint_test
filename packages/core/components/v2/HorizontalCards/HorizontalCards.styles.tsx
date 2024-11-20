import styled, { css } from 'styled-components'
import { cssRemoveScrollbar, media, typography } from '@rightpoint/core/styles'

const mediaStacked = media('xs', 'lg')
const mediaHorizontal = media('lg')

export const HorizontalCardsStyles = {
    HorizontalCards: styled.div`
        ${mediaHorizontal} {
            display: flex;
            gap: 35px;
            max-with: 380px;
        }
    `,
    content: {
        Root: styled.div`
            max-width: 380px;
            flex-shrink: 2;
        `,
        Title: styled(typography.FoundersH600)`
            ${typography.utils.cssVarsTypography.textColor}
        `,
        Body: styled(typography.FoundersB200)`
            ${typography.utils.cssVarsTypography.textAltColor}
            margin-top: 30px; // visual align
            margin-bottom: 40px;
        `,
        Cta: styled.div`
            margin-top: 40px;
        `,
    },

    Cards: styled.div`
        display: flex;
        gap: 20px;

        flex-basis: 100%;
        ${mediaHorizontal} {
            justify-content: flex-end;
        }

        ${mediaStacked} {
            margin-top: 80px;
            overflow: scroll;
            -webkit-overflow-scrolling: touch;
            ${cssRemoveScrollbar}
        }
    `,
    Card: styled.div`
        max-width: 400px;
        width: 50%;

        ${mediaStacked} {
            flex-basis: calc(90vw - 60px);
            flex-shrink: 0;
        }
    `,
}
