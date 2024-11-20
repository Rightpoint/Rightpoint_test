import { cssVarNames } from '@rightpoint/core/styles'
import styled, { css } from 'styled-components'

const Layout = styled.div<{
    debug?: boolean
}>`
    ${(props) =>
        props.debug &&
        css`
            background-color: #f0f0f0;
            > * {
                background: rgba(0, 0, 0, 0.1);
            }
        `}
`

const SkipToMainContent = styled.a`
    position: fixed;
    top: 20px;
    left: 20px;
    z-index: 1000;
    padding: 20px;
    background: white;
    border-radius: 10px;
    transform: translateY(-500px);
    color: inherit;
    text-decoration: none;
    &:focus {
        transform: translateY(0);
    }
`

const LayoutContainer = styled.div`
    margin: 0 auto;
    min-height: 500px;
`

export const LayoutStyles = {
    Layout,
    LayoutContainer,
    SkipToMainContent,
}
