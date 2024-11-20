import styled, { css } from 'styled-components'
import { typography } from '@rightpoint/core/styles'

const ScrollZoom = styled.div.attrs({ className: 'ScrollZoom__Root' })`
    position: relative;
`

const ScrollViewport = styled.div.attrs({
    className: 'ScrollZoom__ScrollViewport',
})`
    top: 0;
    position: sticky;
    transform: translateZ(0);
    overflow: hidden;
`

const ScrollContent = styled.div.attrs({
    className: 'ScrollZoom__ScrollContent',
})`
    display: fixed;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
`

const ScrollZoomText = styled.div`
    position: relative;
    z-index: 10;
    background: transparent;
    display: flex;
    align-items: center;
    justify-content: center;

    // transform: translate3d(0, 0, 0);
    padding: 20px;

    width: 100%;
    height: 100vh;
`

const ScrollZoomVideo = styled.div`
    position: fixed;
    z-index: 11;
    left: 0;
    right: 0;
    height: 100vh;
    width: 100vw;
`

const ScrollZoomTypewriterTitle = styled(typography.BodyM).attrs({
    $fontFamily: 'serif',
})`
    text-align: left;
`

const Logo = styled.div``

const LogoWrapper = styled.div`
    svg {
        width: 100%;
        height: auto;
    }
`

const LogoSticky = styled.div`
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 2vw;

    pointer-events: none;
    transform: translateY(100%);
`

export const ScrollZoomStyles = {
    ScrollZoom,
    ScrollViewport,
    ScrollContent,
    ScrollZoomText,
    ScrollZoomVideo,
    ScrollZoomTypewriterTitle,
    Logo,
    LogoWrapper,
    LogoSticky,

    MediaText: styled(typography.BodyM)`
        margin-top: 50px;
        text-align: center;
        transform: scale(2);
    `,
    Button: styled.div`
        cursor: pointer;

        &:hover {
            background: var(--accent);
            color: black;
            border-color: var(--accent);
            transition: all 0.15s ease 0s;
        }
        border-radius: 50px;
        position: absolute;
        top: calc(50% - 140px);
        left: 50%;
        transform: translate(-50%, -50%) scale(2);
        border: 1px solid white;
        color: black;
        padding: 10px 20px;
        background: white;
        svg {
            vertical-align: middle;
            margin-left: 10px;
            * {
                stroke: black;
            }
        }
    `,
}
