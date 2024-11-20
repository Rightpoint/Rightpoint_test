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
    top: 80px;
`

const Title = styled(typography.FoundersB100).attrs({
    $fontWeight: FontWeights.Normal,
})`
    ${cssVarsTypography.textColor};
`

const Subtitle = styled(typography.FoundersB100)`
    ${cssVarsTypography.textAltColor};
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
