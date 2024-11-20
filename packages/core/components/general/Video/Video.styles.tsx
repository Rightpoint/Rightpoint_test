import styled, { css } from 'styled-components'
import { cssVarNames, resetByTag } from '@rightpoint/core/styles'

const Video = styled.div`
    width: 100%;
    height: 100%;
    position: relative;

    // use background fallback on aspect sizer instead
    // background: #f5f5f5;
`

const VideoWithPreview = styled.div``

const Preview = styled.div<{ $isPlaying: boolean }>`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 2;
    transition: all 0.5s ease 0.5s;
    ${({ $isPlaying }) =>
        $isPlaying &&
        css`
            ${Play}, & {
                opacity: 0;
            }
        `}
`

const Play = styled.button`
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
`

export const VideoStyles = {
    Video,
    VideoWithPreview,
    Preview,
    Play,
}
