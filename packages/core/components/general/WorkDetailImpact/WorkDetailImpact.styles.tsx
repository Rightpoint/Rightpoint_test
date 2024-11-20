import styled, { css } from 'styled-components'
import {
    cssVarsTypography,
    FontWeights,
    media,
    typography,
} from '@rightpoint/core/styles'

export const WorkDetailImpactStyles = {
    WorkDetailImpact: styled.div``,
    BigText: styled(typography.RecklessH300)``,
    Impact: styled(typography.FoundersB200)`
        ${cssVarsTypography.textColor}
        text-align: left;
    `,
    Description: styled(typography.FoundersB200)`
        margin-top: 1em;
        max-width: 450px;
    `,

    Grid: styled.div`
        display: flex;
        gap: 140px;
        flex-direction: column;

        ${media('md')} {
            flex-direction: row;
            gap: 70px;
        }

        flex-wrap: wrap;
        align-items: space-between;
        justify-content: flex-start;
    `,

    StickyHeader: styled.div`
        position: sticky;
        top: 80px;
    `,
    RichTextContent: styled.div`
        ${cssVarsTypography.textColor};
    `,
    Title: styled(typography.FoundersB100)`
        ${cssVarsTypography.textColor};
    `,
    Subtitle: styled(typography.FoundersB100)`
        ${cssVarsTypography.textAltColor};
    `,
}
