import styled, { css } from 'styled-components'
import { resets, typography, zIndexes } from '@rightpoint/core/styles'
import { colors } from '@rightpoint/core/variables'

const NavbarPopup = styled.div`
    z-index: ${zIndexes.navbarPopup};

    transform: translate3d(0, 0, 0); // set fixed context
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    overflow-y: scroll;
    overflow-x: hidden;
    -webkit-overflow-scrolling: touch;

    color: ${colors.white};
`

const Blur = styled.div`
    // backdrop filter is expensive, and only in latest chrome, not in FF. It's a 2022 thing.
    // instead, inject a global style and apply filter on the entire site.

    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    background: rgba(0, 0, 0, 0.8);

    z-index: ${zIndexes.navbarPopup};
`

const Content = styled.div`
    max-width: 800px;
    height: 100%;
`

const ContentInner = styled.div`
    position: relative;
    display: flex;
    height: 100%;
`

const Close = styled.button`
    ${resets.button}
    ${typography.utils.getFontFamily('serif')}
    font-size: 1.8rem;

    position: fixed;
    top: 20px;
    left: 20px;
    cursor: pointer;
    z-index: 3;
`

export const NavbarPopupStyles = {
    NavbarPopup,
    Content,
    ContentInner,
    Close,
    Blur,
}
