import styled, { css } from 'styled-components'
import { typography } from '@rightpoint/core/styles'

const MidArticleCta = styled.div`
    text-align: center;
`

const Title = styled(typography.H2).attrs({
    $fontFamily: 'serif',
})`
    max-width: 800px;
    margin: 0 auto;
`

const Subtitle = styled(typography.BodyL).attrs({
    $fontFamily: 'serif',
})`
    margin: 20px 0;
`

const Media = styled.div`
    max-width: 500px;
    margin: 0 auto;
    margin-top: -15px;
`

export const MidArticleCtaStyles = {
    MidArticleCta,
    Title,
    Subtitle,
    Media,
}
