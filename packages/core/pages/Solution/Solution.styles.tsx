import styled, { css } from 'styled-components'
import { cssVarNames } from '../../styles'
import { colors } from '../../variables'

export const SolutionPageStyles = {
    LandingRelatedSolutions: styled.div`
        margin-top: 100px;
        margin-bottom: -50px;
    `,

    OverlappedMedia: styled.div<{ $color?: string }>`
        position: relative;

        &:after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 50%;
            background: var(
                ${cssVarNames.content.background},
                ${({ $color }) => $color}
            );
            width: 100vw;
            margin-left: calc(-50vw + 50%);
            z-index: -1;
        }
    `,
}
