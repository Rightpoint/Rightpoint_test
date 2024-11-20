import styled, { css } from 'styled-components'
import { media, verticalSpacing } from '@rightpoint/core/styles'

export const LandingPageThankYouStyles = {
    LandingPageThankYou: styled.div`
        // text-align: center;
        margin: 0 var(--container-padding);
    `,
    Button: styled.div`
        margin: 20px 0;
    `,
    Content: styled.div`
        margin-top: 100px;
        ${media('md')} {
            margin-top: 180px;
        }
        text-align: center;

        * {
            width: auto;
        }

        padding-bottom: 200px;
    `,
    Back: styled.div`
        margin-top: 100px;
        text-align: left;
    `,
    DownloadWrapper: styled.div`
        margin-top: 50px;
    `,
}
