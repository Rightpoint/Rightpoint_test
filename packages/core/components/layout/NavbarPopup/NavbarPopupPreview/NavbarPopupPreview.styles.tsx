import styled, { css } from 'styled-components'
import { zIndexes } from '@rightpoint/core/styles'

const NavbarPopupPreview = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
`

const FramePositioner = styled.div`
    height: 60vh;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
`

const IFrameFixed = styled.div`
    overflow: hidden; // contain the scaled iframe
    z-index: ${zIndexes.navbarPreviewIframe};
`

const IFrame = styled.iframe`
    width: 100%;
    height: 100%;
    border: none;
    outline: none;
    pointer-events: none;
    background: white;
`

export const NavbarPopupPreviewStyles = {
    NavbarPopupPreview,
    FramePositioner,
    IFrame,
    IFrameFixed,
}
