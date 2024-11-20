import { AspectWrapperStyles } from '@rightpoint/core/components'
import styled, { css } from 'styled-components'
import { cssVarNames, media } from '@rightpoint/core/styles'

const Grid = styled.div`
    img {
        max-width: 100%;
    }
    padding: 0 20px;

    ${media('xs', 'md')} {
        padding: 0;
        ${cssVarNames.components.card.contentPadding}: 15px;
    }
`

const Layout = styled.div``

export const GridStyles = {
    Grid,
    Layout,
}
