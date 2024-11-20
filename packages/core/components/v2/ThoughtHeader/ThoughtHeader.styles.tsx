import styled, { css } from 'styled-components'
import { media, typography } from '@rightpoint/core/styles'
import { CardStyles } from '../../general/Card/Card.styles'

export const ThoughtHeaderStyles = {
    ThoughtHeader: styled.div`
        position: relative;

        // let the background image clip out of the container
        overflow: hidden;
        margin-bottom: var(--spacing-vertical);
    `,
    MaxWidth: styled.div`
        max-width: 1600px;
        margin: 0 auto;
        padding: 150px var(--container-padding);
        justify-content: space-between;
        ${media('md')} {
            gap: 15%;
            display: flex;
        }
    `,
    Content: styled.div`
        max-width: 700px;
    `,
    Date: styled(typography.FoundersB100)``,
    Title: styled.h1`
        ${typography.FoundersH400Css}
        margin-top: .3em;
        margin-bottom: 0.6em;
    `,
    Body: styled(typography.FoundersB100)``,
    Card: styled.div`
        min-width: 350px;
        ${media('xs', 'md')} {
            margin-top: 30px;
        }

        ${CardStyles.Caption},
        ${CardStyles.Link} {
            display: none;
        }
    `,
    Background: styled.div`
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        z-index: -1;
        filter: blur(20px);
        transform: scale(2);
        img {
            width: 100%;
        }
    `,
}
