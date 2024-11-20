import styled, { css } from 'styled-components'

export const MockupImage = styled.div<{
    width?: number
    height?: number
    aspectRatio?: number
    blend?: boolean
}>`
    display: inline-block;

    background-color: #d1d1d1;

    ${({ width = 640, height = 480, aspectRatio }) => css`
        width: ${width}px;
        height: ${aspectRatio
            ? ((1 / aspectRatio) * width).toFixed(0)
            : height}px;
    `}

    ${({ blend }) =>
        blend &&
        css`
            background-color: #777;
            opacity: 0.35;
            mix-blend-mode: multiply;
        `}
`
