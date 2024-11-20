import styled, { css } from 'styled-components'
import {
    cssVarNames,
    cssVarsTypographyValues,
    typography,
} from '@rightpoint/core/styles'

export const PageHeaderStyles = {
    PageHeader: styled.div`
        position: relative;
        color: ${cssVarsTypographyValues.getTextColor()};

        padding-top: 190px;
        padding-bottom: 360px;
    `,

    /**
     * Header
     */
    Above: styled.div`
        display: flex;
        justify-content: flex-end;
        padding-bottom: 200px;
    `,

    Eyebrow: styled(typography.FoundersB100)`
        position: absolute;
        top: 0;
        left: 0;
    `,

    Links: styled.div`
        padding-right: 10%;
    `,
    Link: styled.div``,

    /**
     * Main
     */
    Main: styled.div`
        margin-top: 200px;
    `,

    Title: styled.h1`
        ${typography.FoundersH100Css}
        font-size: 22.4rem;
        margin-top: 30px;
        margin-bottom: 140px;
    `,

    Background: styled.div`
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        width: 100vw;
        margin-left: calc(50% - 50vw);
        z-index: 0;

        img {
            width: 100%;
            object-fit: cover;
        }

        > div {
            &:after {
                content: '';
                position: absolute;
                bottom: 0;
                left: 0;
                right: 0;
                height: 500px;
                z-index: 2;
                background: linear-gradient(
                    0deg,
                    var(${cssVarNames.colors.black}) 0%,
                    rgba(0, 0, 0, 0) 100%
                );
            }
        }
    `,

    AboveBackground: styled.div`
        z-index: 1;
        position: relative;
    `,
}
