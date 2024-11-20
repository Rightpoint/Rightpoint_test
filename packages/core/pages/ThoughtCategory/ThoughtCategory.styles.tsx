import styled from 'styled-components'
import { media } from '@rightpoint/core/styles'

export const ThoughtCategoryStyles = {
    Header: styled.div`
        margin-bottom: 80px;

        ${media('md')} {
            margin-bottom: 100px;
        }
        ${media('lg')} {
            margin-bottom: 150px;
        }
    `,
}
