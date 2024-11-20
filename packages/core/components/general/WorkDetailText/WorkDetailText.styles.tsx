import styled, { css } from 'styled-components'
import {
    cssVarsTypography,
    FontWeights,
    media,
    typography,
} from '@rightpoint/core/styles'

const WorkDetailText = styled.div``

const StickyHeader = styled.div`
    position: sticky;
    top: 100px;
`

const Title = styled(typography.H4Sans).attrs({
    $fontWeight: FontWeights.Normal,
})`
    ${cssVarsTypography.textColor};
`

const Subtitle = styled(typography.H4)`
    ${cssVarsTypography.textColor};
`

const RichTextContent = styled.div`
    ${cssVarsTypography.textColor};
`

export const WorkDetailTextStyles = {
    WorkDetailText,
    StickyHeader,
    RichTextContent,
    Title,
    Subtitle,
}
