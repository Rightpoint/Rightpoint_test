import styled, { css } from 'styled-components'

const Root = styled.div.attrs({
    className: 'ScrollBasedAnimationContainer__Root',
})`
    overflow: hidden;
`

const ScrollContainer = styled.div.attrs({
    className: 'ScrollBasedAnimationContainer__ScrollContainer',
})`
    position: relative;
`

const ScrollViewport = styled.div.attrs({
    className: 'ScrollBasedAnimationContainer__ScrollViewport',
})<{ $debug?: boolean }>`
    ${(props) => props.$debug && `border: 6px solid red;`}

    top: 0;
    position: sticky;
    transform: translateZ(0);
    overflow: hidden;
`

const ScrollContent = styled.div.attrs({
    className: 'ScrollBasedAnimationContainer__ScrollContent',
})`
    display: fixed;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
`

export const ScrollBasedAnimationContainerStyles = {
    Root,
    ScrollContainer,
    ScrollViewport,
    ScrollContent,
}
