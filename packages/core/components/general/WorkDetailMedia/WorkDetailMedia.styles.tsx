import styled, { css } from 'styled-components'
import { typography } from '@rightpoint/core/styles'

const WorkDetailMedia = styled.div`
    // this is a fix due to how next/image v13 removes width/height based aspect ratio providers
    img {
        width: 100% !important;
        height: auto !important;
    }
`

const VerticalOffsetShadowWrapper = styled.div`
    > * {
        filter: drop-shadow(20px 20px 40px rgba(0, 0, 0, 0.15));
    }
`

export const WorkDetailMediaStyles = {
    WorkDetailMedia,
    VerticalOffsetShadowWrapper,
}
