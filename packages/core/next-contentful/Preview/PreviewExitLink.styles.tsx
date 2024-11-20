import styled, { css } from 'styled-components'
import { typography, zIndexes } from '../../styles'

const PreviewExitLink = styled.a`
    background: var(--light-blue);
    font-family: var(--font-sans);
    text-decoration: none;
    color: black;
    border-radius: 4px;
    padding: 8px 10px;
    font-size: 12px;
    z-index: ${zIndexes.navbarPopup + 10};
    text-transform: capitalize;
    &:hover {
        text-decoration: underline;
    }
`

export const PreviewExitLinkStyles = {
    PreviewExitLink,
}
