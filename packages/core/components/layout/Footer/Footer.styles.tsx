import styled, { css } from 'styled-components'
import { media, resets, typography, zIndexes } from '@rightpoint/core/styles'

const Footer = styled.div`
    text-align: left;
    position: relative;
    z-index: ${zIndexes.footer};
`

const Logo = styled.div`
    svg {
        width: 100%;
        height: auto;
        display: block;
        margin-bottom: 0.05em;
        path {
            fill: white;
        }
    }
`

const Item = styled.div`
    ${typography.BodyMCss}
    a {
        ${resets.anchor}
        text-decoration :none;
    }
`

const ItemTitle = styled(typography.BodyL)``

const Text = styled(typography.BodyS).attrs({
    $fontFamily: 'serif',
})``

export const FooterStyles = {
    Footer,
    Logo,
    Item,
    ItemTitle,
    Text,
    Copyright: styled(typography.BodySSans)`
        color: rgba(0, 0, 0, 0.4);
    `,

    MainLinks: styled(typography.H2)`
        margin-bottom: 50px;
    `,

    Policies: styled(typography.BodySSans)`
        color: rgba(0, 0, 0, 0.4);
        display: flex;
    `,
    Policy: styled.div`
        &:not(:last-child) {
            margin-right: 20px;
        }
    `,
}
