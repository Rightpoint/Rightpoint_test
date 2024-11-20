import styled, { css } from 'styled-components'
import { typography } from '@rightpoint/core/styles'

const width = 100

const Cursor = styled.div`
    position: fixed;
    top: 0;
    left: 0;

    pointer-events: none;

    z-index: ${({ theme }) => theme.zIndexes.cursor};

    // border: 2px solid red;
    width: ${width}px;
    height: ${width}px;
`

const IS_STORYBOOK = Boolean(process.env.IS_STORYBOOK)

const Circle = styled.div<{
    $isVisible: boolean
}>`
    pointer-events: none;
    display: flex;
    align-items: center;
    justify-content: center;
    width: ${width}px;
    height: ${width}px;

    transform: translate3d(-50%, -50%, 0)
        ${({ $isVisible }) => css`
        scale(${$isVisible ? 1 : 0.7});
    `};

    ${({ $isVisible }) => css`
        opacity: ${$isVisible ? 1 : 0};
    `}

    background: rgba(0, 0, 0, 0.05);
    backdrop-filter: blur(20px) opacity(1);
    border-radius: 100%;

    transition: all 0.2s ease;
`

/**
 * Path circle generation
 * https://stackoverflow.com/questions/5737975/circle-drawing-with-svgs-arc-path
 * 
 * <circle cx="100" cy="100" r="75" />
 * can be generated with:
 * <path 
        d="
        M 100, 100
        m -75, 0
        a 75,75 0 1,0 150,0
        a 75,75 0 1,0 -150,0
        "
  />
 */
const generateCirclePath = (
    circle = {
        cx: 100,
        cy: 100,
        r: 75,
    }
) => {
    return `
        path(
            'M ${circle.cx},${circle.cy}
            m -${circle.r}, 0
            a ${circle.r},${circle.r} 0 1,0 ${circle.r * 2},0
            a ${circle.r},${circle.r} 0 1,0 -${circle.r * 2},0'
        );
    `
}

const perLetterSpace = '3%'
const CircleText = styled.div`    
    border-radius: 100%;
    width: ${width}px;
    height: ${width}px;
    font-size: 1.2rem;
    font-weight: 700;
    overflow: hidden;

    animation: spin 30s linear infinite;

    @keyframes spin {
        100% {
            transform: rotate(360deg);
        }
    }
  
    .char,
    .whitespace {
        // --i: calc(100% / (var(--char-total) + 1));
        --i: ${perLetterSpace};
        position: absolute;
        text-transform: uppercase;
        offset-path:${generateCirclePath({
            cx: width / 2,
            cy: width / 2,
            r: width / 2 - 20,
        })}
        offset-distance: calc(var(--i) * var(--char-index));
        offset-rotate: auto;
        /*  offset-anchor: top; FF only */
    }

`

const RegularText = styled(typography.FoundersB200Static)`
    color: white;
    text-align: center;
    padding: 20px;
    // text-transform: uppercase;
`

export const CursorStyles = {
    Cursor,
    Circle,
    CircleText,
    RegularText,
}
