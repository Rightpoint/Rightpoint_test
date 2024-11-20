import styled, { css } from 'styled-components'
import { typography } from '@rightpoint/core/styles'

const WorkDetailMedia = styled.div``

const VerticalOffsetShadowWrapper = styled.div`
    > * {
        filter: drop-shadow(20px 20px 40px rgba(0, 0, 0, 0.15));
    }
`

export const WorkDetailMediaStyles = {
    WorkDetailMedia,
    VerticalOffsetShadowWrapper,
}
