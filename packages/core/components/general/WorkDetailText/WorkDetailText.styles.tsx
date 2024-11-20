import styled, { css } from 'styled-components'
import {
    cssVarsTypography,
    FontWeights,
    media,
    typography,
} from '@rightpoint/core/styles'

export const WorkDetailTextStyles = {
    WorkDetailText: styled.div``,
    StickyHeader: styled.div`
        position: sticky;
        top: 50px; // aligns with logo
    `,
    RichTextContent: styled.div`
        ${cssVarsTypography.textColor};
    `,
    Title: styled(typography.FoundersB100).attrs({
        $fontWeight: FontWeights.Normal,
    })`
        ${cssVarsTypography.textColor};
    `,
    Subtitle: styled(typography.FoundersB100)`
        ${cssVarsTypography.textAltColor};
    `,
}
