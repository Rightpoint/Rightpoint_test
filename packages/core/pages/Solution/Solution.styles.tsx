import styled, { css } from 'styled-components'
import { cssVarNames, media } from '@rightpoint/core/styles'

export const SolutionPageStyles = {
    LandingRelatedSolutions: styled.div`
        margin-top: 100px;
    `,
    LandingAnimation: styled.div``,

    DetailPageRelatedSolutionsSpacer: styled.div`
        height: 100px;

        ${media('lg')} {
            height: 300px;
        }
    `,
}
