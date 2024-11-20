import styled, { css } from 'styled-components'
import { FontWeights, media, typography } from '@rightpoint/core/styles'

const WhatWeDeliver = styled.div`
    padding-top: 100px;
    padding-bottom: 150px;
    border-top: 1px solid #bfbfbf;
    border-bottom: 1px solid #bfbfbf;

    margin: 100px 0;
`

const Title = styled(typography.BodyL).attrs({
    $fontWeight: FontWeights.Normal,
    $fontFamily: 'sans',
})`
    text-align: center;
    margin-bottom: 60px;
`

const Item = styled.div`
    ${media('xs', 'sm')} {
        text-align: center;
    }
`

const Grid = styled.div`
    max-width: 1000px;
    margin: 0 auto;
`

export const WhatWeDeliverStyles = {
    WhatWeDeliver,
    Grid,
    Title,
    Item,
}
