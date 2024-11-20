import styled, { css } from 'styled-components'
import { typography } from '@rightpoint/core/styles'

export const PageHeaderStyles = {
    PageHeader: styled.div`
        position: relative;
    `,

    /**
     * Header
     */
    Above: styled.div`
        display: flex;
        justify-content: flex-end;
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        padding-bottom: 200px;
    `,

    Label: styled.div`
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
        outline: 1px solid red;
    `,

    Eyebrow: styled.div`
        font-size: 2.4rem;
    `,
    Title: styled.h1`
        font-size: 22.4rem;
        margin-top: 30px;
        margin-bottom: 1em;
    `,
}
