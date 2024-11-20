import styled, { css } from 'styled-components'

const Background = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    // NOTE: this background color must be variable based on component context
    // background color is unknown outside css context
    background: var(--background-color, #eee);
`

const Sizer = styled.div.withConfig({ displayName: 'sizer' })<{
    $aspectRatioPadding: string
}>`
    padding-bottom: ${({ $aspectRatioPadding }) => $aspectRatioPadding};
`

const absoluteChild = css`
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
`

/**
 * The content should be fixed to sizer dimensions,
 * as well as its first child (likely an <img> or <iframe>)
 */
const Content = styled.div<{
    absoluteChild?: boolean
}>`
    overflow: hidden;
    // content is always absolute / sized by sizer
    & {
        ${absoluteChild}
    }
    ${(props) => props.absoluteChild && `> * { ${absoluteChild}}`}
`

interface AspectWrapperProps {
    hideOverflow?: boolean
    cssVars?: string
}
const AspectWrapper = styled.div<AspectWrapperProps>`
    position: relative;
    ${({ hideOverflow }) => hideOverflow && 'overflow: hidden'}
    ${({ cssVars }) => cssVars}
`

export const AspectWrapperStyles = {
    AspectWrapper,
    Background,
    Sizer,
    Content,
}
