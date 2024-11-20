import styled, { css } from 'styled-components'
import { typography, zIndexes } from '../../styles'

const Link = styled.a`
    color: black;
    background: var(--light-blue);
    font-family: var(--font-sans);

    padding: 8px 10px;
    font-size: 12px;
    text-decoration: none;
    border-radius: 4px;

    z-index: ${zIndexes.navbarPopup - 1};
    transition: 0.2s ease 0s;
    overflow: hidden;
    white-space: nowrap;
    opacity: 0;
    &:hover {
        text-decoration: underline;
    }
    opacity: 1;
    display: block;
`

const PreviewWrapper = styled.div`
    position: relative;
    &:after {
        transition: 0.2s ease 0s;

        content: '';
        position: absolute;

        left: 5px;
        top: 5px;
        right: 5px;
        bottom: 5px;

        pointer-events: none;
        border: 2px solid transparent;
    }
    &:hover {
        ${Link} {
            opacity: 1;
            max-width: 500px;
        }
        &:after {
            border: 5px solid var(--light-blue);
            opacity 1;
        }
    }
    ${Link} {
        opacity: 0.1;
    }
`

const PreviewLinks = styled.div`
    position: absolute;
    top: 30px;
    left: 30px;
    z-index: 10;
    ${Link} {
        margin-bottom: 10px;
    }
`

const Icon = styled.span`
    margin-right: 5px;
    vertical-align: middle;
`

export const PreviewWrapperStyles = {
    PreviewWrapper,
    PreviewLinks,
    Link,
    Icon,
}
