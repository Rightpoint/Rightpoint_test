import styled, { css } from 'styled-components'
import { cssVarsTypographyValues, typography } from '@rightpoint/core/styles'
import { colors } from '../../../variables'

export const WorkDetailHeaderStyles = {
    BottomSection: styled.div`
        display: flex;
        justify-content: space-between;
    `,
    Introduction: styled.div`
        ${typography.FoundersB100Css}
        max-width: 750px;

        > *:first-child {
            margin-top: 0;
        }
        > *:last-child {
            margin-bottom: 0;
        }
    `,
    LinksHeader: styled.div`
        ${typography.FoundersB100Css}
        margin-bottom: .7em;
    `,
    Links: styled.div``,
    Link: styled.div`
        padding: 15px 0;
        border-top: 1px solid ${colors.iron};
        border-bottom: 1px solid ${colors.iron};
        &:not(:last-child) {
            border-bottom: none;
        }
        min-width: 200px;
    `,
}
