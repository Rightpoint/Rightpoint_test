import styled, { css } from 'styled-components'
import { cssVarNames } from '@rightpoint/core/styles'

const vars = cssVarNames.components.scroller

const fakeDraggerHeight = 15 // increase clickable area of dragger

export interface ScrollerStyleProps {
    withScrollbar?: boolean
    cssVars?: string
}

const withScrollbarCss = css`
    // unselectable, room for scrollbar
    .swiper-wrapper {
        padding-bottom: 70px;
        user-select: none;
    }

    .swiper-horizontal > .swiper-scrollbar {
        // "fake" the scrollbar width to match site margins to appear on-grid
        left: var(${cssVarNames.siteMargin});
        width: calc(100% - var(${cssVarNames.siteMargin}) * 2);

        right: auto;
        height: 1px;
        bottom: ${fakeDraggerHeight}px;
    }
    .swiper-scrollbar-drag {
        top: ${fakeDraggerHeight / -2}px;
        height: ${fakeDraggerHeight}px;
        position: relative;

        border-radius: 0;
        background: transparent;

        &:after {
            content: '';
            position: absolute;
            top: ${fakeDraggerHeight / 2 - 1}px;
            left: 0;
            right: 0;
            height: 3px;
            background: var(${cssVarNames.colors.accent});
        }
    }

    .swiper-slide:first-of-type {
        margin-left: var(${cssVarNames.siteMargin});
    }
    .swiper-slide:last-child {
        margin-right: var(${cssVarNames.siteMargin});
    }
`

const Scroller = styled.div<ScrollerStyleProps>`
    .swiper-slide {
        width: var(${vars.width}, 400px);
    }
    ${({ cssVars }) => cssVars}
    ${({ withScrollbar }) => withScrollbar && withScrollbarCss}
`

export const ScrollerStyles = {
    Scroller,
}
