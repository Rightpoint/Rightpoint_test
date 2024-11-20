import styled, { css } from 'styled-components'
import {
    cssVarNames,
    media,
    resetByTag,
    typography,
} from '@rightpoint/core/styles'

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
    pointer-events: none;

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

    pointer-events: none;

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
    ${typography.BodySCss}

    transition: all 0.3s ease 0s;
    background: var(${cssVarNames.colors.accent});
    width: 75px;
    height: 75px;
    opacity: 0.95;
    border-radius: 100%;
    text-align: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(1);
    outline: none;
    cursor: pointer;
    &:hover {
        transform: translate(-50%, -50%) scale(1.2);
        opacity: 1;
    }
    ${media('xs', 'md')} {
        width: 60px;
        height: 60px;
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
    ClickOverlay: styled.button`
        ${resetByTag.button}
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 2;
        cursor: pointer;
    `,
}
