import styled, { css } from 'styled-components'
import { media, typography } from '@rightpoint/core/styles'

export const HeroBannerStyles = {
    HeroBanner: styled.div`
        position: relative;
        display: grid;

        grid-template-areas:
            'main'
            'card';

        grid-gap: 40px;
        grid-template-columns: 1fr minmax(300px, 1fr);

        ${media('md')} {
            grid-template-areas: 'main card';
        }
    `,
    Main: styled.div`
        grid-area: main;
    `,
    Card: styled.div`
        grid-area: card;
    `,

    Eyebrow: styled.div`
        display: flex;
        align-items: center;
    `,

    Eyebrow__Icon: styled.div`
        background: red;
        width: 20px;
        height: 20px;
        display: inline-block;
        margin-right: 10px;
    `,

    Title: styled.div`
        margin-top: 0.3em;
        margin-bottom: 0.3em;
        font-size: 18rem;

        // TODO: Typography System
        font-family: 'Founders Grotesk', sans-serif;
    `,
    Subtitle: styled.div`
        font-size: 3.6rem;
    `,

    Cta: styled.div`
        position: absolute;
        right: 0;
        bottom: 0;
        white-space: nowrap;
    `,
}
