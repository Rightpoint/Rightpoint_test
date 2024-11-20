import styled from 'styled-components'
import { CardStyles } from '../../Card.styles'
import { typography } from '@rightpoint/core/styles'

const Card3 = styled.article`
    ${CardStyles.DateLine} {
        ${typography.utils.getFontFamily('sans')}
    }
    ${CardStyles.Title} {
        ${typography.utils.getFontFamily('serif')}
    }
`

export const Card3Styles = {
    Card3,
}
