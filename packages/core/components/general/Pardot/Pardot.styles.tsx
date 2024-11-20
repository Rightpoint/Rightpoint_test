import styled, { css } from 'styled-components'
import { media, resets, typography } from '@rightpoint/core/styles'

const Pardot = styled.div``

const Iframe = styled.iframe<{ $isLoaded: boolean }>`
    outline: none;
    border: none;
    transition: opacity 0.3s ease-in-out;
    opacity: ${({ $isLoaded = true }) => ($isLoaded ? 1 : 0)};
    max-width: 100%;
`

export const PardotStyles = {
    Pardot,
    Iframe,

    Modal: {
        Background: styled.div``,

        Content: styled.div`
            padding: 20px;
            padding-top: 100px;
            text-align: center;
            background: white;
            margin: 0 auto;

            ${media('lg')} {
                max-width: 800px;
            }
        `,
        Close: styled.button`
            ${resets.button}
            position: absolute;
            top: 20px;
            right: 20px;
        `,
        Title: styled(typography.FoundersH600)`
            margin-bottom: 1em;
        `,
    },
}
