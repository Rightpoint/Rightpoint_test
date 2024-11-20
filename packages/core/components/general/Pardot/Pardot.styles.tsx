import styled, { css } from 'styled-components'
import { typography } from '@rightpoint/core/styles'

const Pardot = styled.div``

const Iframe = styled.iframe<{ $isLoaded: boolean }>`
    outline: none;
    border: none;
    transition: opacity 0.3s ease-in-out;
    opacity: ${({ $isLoaded = true }) => ($isLoaded ? 1 : 0)};
`

export const PardotStyles = {
    Pardot,
    Iframe,
}
