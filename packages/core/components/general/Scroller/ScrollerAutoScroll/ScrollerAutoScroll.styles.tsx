import styled, { css } from 'styled-components'

const ScrollerAutoScroll = styled.div<{ autoplaying?: boolean }>`
    ${(props) =>
        props.autoplaying &&
        css`
            .swiper-free-mode > .swiper-wrapper {
                transition-timing-function: linear;
            }
        `}
`

export const ScrollerAutoScrollStyles = {
    ScrollerAutoScroll,
}
