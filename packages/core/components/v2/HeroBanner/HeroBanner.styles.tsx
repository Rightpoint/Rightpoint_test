import styled, { css } from 'styled-components'
import { cssVarsTypography, media, typography } from '@rightpoint/core/styles'

export const HeroBannerStyles = {
    HeroBanner: styled.div`
        position: relative;
        overflow: hidden;
    `,
    Grid: styled.div`
        display: grid;

        grid-template-areas:
            'main'
            'card';

        row-gap: 60px;

        ${media('xl')} {
            column-gap: 100px;
            grid-template-columns: 1fr minmax(200px, 380px);
            grid-template-areas: 'main card';
        }
    `,

    Main: styled.div`
        grid-area: main;
        ${cssVarsTypography.textColor};
    `,
    Card: styled.div`
        grid-area: card;

        ${media('md', 'xl')} {
            --aspect-wrapper-padding: 50%;
        }
    `,

    Eyebrow: styled.div`
        display: flex;
        align-items: center;
    `,

    Eyebrow__Icon: styled.div`
        width: 20px;
        height: 20px;
        display: inline-block;
        margin-right: 10px;
    `,

    Title: styled(typography.FoundersH200)`
        margin-top: 0.3em;
        margin-bottom: 0.3em;

        ${media('xs', 'md')} {
            margin-top: 0.75em;
            margin-bottom: 0.75em;
        }
    `,
    Subtitle: styled(typography.FoundersH700)``,

    Cta: styled.div`
        padding-bottom: 5px; // show underline
        ${media('xs', 'md')} {
            text-align: center;
        }

        ${media('md')} {
            text-align: right;
        }
        margin-top: 100px;
    `,
}
