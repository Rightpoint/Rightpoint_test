import styled, { css } from 'styled-components'
import { cssVarNames, media, resetByTag, resets } from '@rightpoint/core/styles'

const zIndexes = {
    preview: 2,
    poster: 3,
    controls: 4,
    playButton: 5,
}

const Video = styled.div`
    width: 100%;
    height: 100%;
    position: relative;

    // use background fallback on aspect sizer instead
    // background: #f5f5f5;
`

const Preview = styled.div<{ $visible: boolean }>`
    position: absolute;
    inset: 0;
    z-index: ${zIndexes.preview}};
    transition: all 0.5s ease 0.5s;

    ${({ $visible }) =>
        !$visible &&
        css`
            opacity: 0;
            pointer-events: none;
        `}
`

const PlayButtonOverlay = styled.div<{ $visible: boolean }>`
    position: absolute;
    inset: 0;

    z-index: ${zIndexes.playButton};
    cursor: pointer;

    transition: all 0.3s ease 0s;

    ${({ $visible }) =>
        !$visible &&
        css`
            opacity: 0;
            pointer-events: none;
        `}
`

const PlayButton = styled.button`
    position: absolute;

    ${resetByTag.button}

    --size: 100px;

    ${media('xs', 'sm')} {
        --size: 70px;
        font-size: 0.8em;
    }

    width: var(--size);
    height: var(--size);

    transition: all 0.3s ease 0s;
    background: var(${cssVarNames.colors.accent});
    border-radius: 100%;
    text-align: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    outline: none;
    cursor: pointer;
`

const PosterImage = styled.div<{ $visible: boolean }>`
    position: absolute;
    inset: 0;
    z-index: ${zIndexes.poster};

    transition: all 0.3s ease 0s;
    ${({ $visible }) =>
        !$visible &&
        css`
            opacity: 0;
            pointer-events: none;
        `}
`

const ControlsOverlay = styled.div`
    position: absolute;
    inset: 0;
    z-index: ${zIndexes.controls};

    display: flex;
    justify-content: center;
    align-items: center;

    opacity: 0;

    button {
        pointer-events: none;
    }

    transition: opacity 0.6s ease 0.3s;

    &:hover {
        transition: opacity 0.6s ease;
        opacity: 1;
        button {
            pointer-events: initial;
        }
    }

    cursor: pointer;
`

const ControlsOverlayBottomBar = styled.div`
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;

    display: flex;
    justify-content: space-between;
    align-items: center;

    cursor: default;
`

const ControlsOverlayBarSpacer = styled.div`
    flex-grow: 1;
`

const ControlsOverlayButton = styled.button`
    ${resets.button}
    color: white;

    display: flex;
    align-items: center;
    justify-content: center;

    --size: 50px;
    font-size: 1.8rem;

    ${media('xs', 'sm')} {
        --size: 40px;
        font-size: 1.6rem;
    }

    width: var(--size);
    height: var(--size);

    &:first-child {
        padding-left: 20px;
    }

    &:last-child {
        padding-right: 20px;
    }

    cursor: pointer;

    transition: opacity 0.3s ease;

    &:hover {
        opacity: 0.75;
    }
`

export const VideoStyles = {
    Video,
    Preview,
    PlayButton,
    PlayButtonOverlay,
    PosterImage,
    ControlsOverlay,
    ControlsOverlayBottomBar,
    ControlsOverlayBarSpacer,
    ControlsOverlayButton,
}
