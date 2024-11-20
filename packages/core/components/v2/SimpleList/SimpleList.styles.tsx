import styled, { css } from 'styled-components'
import {
    cssVarsTypography,
    media,
    resets,
    typography,
} from '@rightpoint/core/styles'
import { LinkStyles } from '../../links/Link/Link.styles'

const mediaStacked = media('xs', 'md')
const mediaUnstacked = media('md')

export const SimpleListStyles = {
    SimpleList: styled.div`
        margin-top: 5em;
        ${mediaUnstacked} {
            display: flex;
        }
        ${cssVarsTypography.textColor}
    `,
    Left: styled.div`
        ${mediaUnstacked} {
            flex-basis: 30%;
        }
    `,
    Right: styled.div``,
    Title: styled(typography.FoundersB100R)`
        margin-bottom: 1em;
    `,
    Items: styled.ul`
        ${resets.list}
    `,
    Item: styled.li`
        ${typography.FoundersH600Css}

        ${LinkStyles.NextLinkStyled} {
            text-underline-offset: 0.1em;
            &:hover {
                text-underline-offset: 0.05em;
            }
        }
        ${mediaStacked} {
            &:first-child {
                margin-top: 1em;
            }
            margin-bottom: 1em;
        }
    `,
}
