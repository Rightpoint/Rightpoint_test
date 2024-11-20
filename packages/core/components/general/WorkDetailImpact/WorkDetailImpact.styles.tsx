import styled, { css } from 'styled-components'
import {
    cssVarsTypography,
    FontWeights,
    media,
    typography,
} from '@rightpoint/core/styles'

const WorkDetailImpact = styled.div`
    padding-bottom: 100px;
`

const Title = styled(typography.BodyLSans).attrs({
    $fontWeight: FontWeights.Normal,
})`
    ${cssVarsTypography.textColor}
    text-align: center;
    margin-bottom: 80px;
`

const Impact = styled.div`
    ${cssVarsTypography.textColor}
    text-align: center;
`

const BigText = styled.div`
    font-size: 7.2rem;
    ${media('md')} {
        font-size: 14rem;
    }
`

const Description = styled.div``

export const WorkDetailImpactStyles = {
    WorkDetailImpact,
    Impact,
    BigText,
    Title,
    Description,

    Grid: styled.div`
        display: flex;
        gap: 40px;
        flex-direction: column;

        ${media('md')} {
            flex-direction: row;
        }

        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
    `,
}
