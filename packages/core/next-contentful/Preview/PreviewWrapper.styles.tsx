import styled, { css } from 'styled-components'
import { typography, zIndexes } from '../../styles'

const Link = styled.a`
    color: black;
    background: var(--light-blue);
    font-family: var(--font-sans);

    padding: 8px 10px;
    font-size: 14px;
    text-decoration: none;
    border-radius: 6px;

    z-index: ${zIndexes.navbarPopup - 1};
    transition: 0.2s ease 0s;
    overflow: hidden;
    white-space: wrap;
    opacity: 0;
    &:hover {
        filter: saturate(1.5);
    }
    opacity: 1;
    display: block;
    max-width: calc(100vw - 80px);
`

const PreviewWrapper = styled.div`
    position: relative;
    &:after {
        transition: 0.2s ease 0s;

        content: '';
        position: absolute;

        left: 0px;
        top: 0px;
        right: 0px;
        bottom: 0px;

        pointer-events: none;
        outline: 2px solid transparent;
    }
    &:hover {
        ${Link} {
            opacity: 1;
        }
        &:after {
            outline: 2px dashed var(--light-blue);
            opacity 1;
        }
    }
    ${Link} {
        opacity: 0.1;
    }
`

const PreviewLinks = styled.div`
    position: absolute;
    top: 10px;
    left: 10px;
    z-index: 10000;
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
    Prefix: styled.div`
        font-weight: 500;
    `,
    Label: styled.span`
        font-weight: 500;
    `,
    Name: styled.div``,
}
