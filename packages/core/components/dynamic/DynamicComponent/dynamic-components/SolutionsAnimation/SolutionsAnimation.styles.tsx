import styled from 'styled-components'
import { media } from '@rightpoint/core/styles'

export const SolutionsAnimationStyles = {
    SolutionsAnimation: styled.div`
        margin: 0 auto;
        max-width: 650px;

        ${media('xs', 'sm')} {
            max-width: 500px;
        }
    `,
}
