import styled, { css } from 'styled-components'
import { cssVarNames, resetByTag } from '@rightpoint/core/styles'

const zIndexes = {
    preview: 2,
    poster: 3,
    playButton: 4,
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

    transition: all 0.3s ease 0s;
    background: var(${cssVarNames.colors.accent});
    width: 100px;
    height: 100px;
    border-radius: 100%;
    text-align: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    outline: none;
    cursor: pointer;

    &:hover {
        transform: translate(-50%, -50%) scale(1.1);
    }
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

export const VideoStyles = {
    Video,
    Preview,
    PlayButton,
    PlayButtonOverlay,
    PosterImage,
}
