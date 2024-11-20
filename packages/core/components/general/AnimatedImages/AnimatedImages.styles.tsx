import styled, { css } from 'styled-components'

/**
 * Note: the root element is what may be positioned by a parent AspectWrapper
 */
const AnimatedImages = styled.div`
    position: relative;
    background-color: #f5f5f5;
`

const AnimatedImage = styled.div<{ isActive?: boolean; isPrevious?: boolean }>`
    width: 100%;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;

    img {
        position: absolute;
        inset: 0;
        width: 100% !important;
        height: 100% !important; // some video adds hard coded styles
        object-fit: cover;
        object-position: center;
    }
`

const Debug = styled.div`
    position: absolute;
    top: 0;
    z-index: 1;
`

export const AnimatedImagesStyles = {
    AnimatedImages,
    AnimatedImage,
    Debug,
}
