import styled, { css } from 'styled-components'
import { media, typography } from '@rightpoint/core/styles'
import { dataAttributes } from '@rightpoint/core/variables'

export interface RootComponentStyleProps {
    $addPadding?: boolean
    $addMargin?: boolean
    $noOverflow?: boolean
    $marginSize?:
        | any
        | {
              top?: any
              bottom?: any
          }
}

/**
 * Size factor
 */
const fragments = {
    marginTopScale: css``,
    marginBottomScale: css``,
    padding: css`
        padding-top: 75px;
        padding-bottom: 75px;

        ${media('lg')} {
            padding-top: 150px;
            padding-bottom: 150px;
        }
    `,
    margin: css`
        margin-top: 100px;
        margin-bottom: 100px;
        ${media('lg')} {
            margin-top: 150px;
            margin-bottom: 150px;
        }
        ${media('xl')} {
            margin-top: 150px;
            margin-bottom: 150px;
        }
    `,
}
const noMarginCollapseSelector = `[${dataAttributes.marginStrategy.attribute}="no-margin-collapse"]`
export const RootComponentStyles = {
    RootComponent: styled.section<RootComponentStyleProps>`
        position: relative;
        ${({ $noOverflow }) => $noOverflow && 'overflow: hidden;'}
        ${({ $addPadding }) => $addPadding && fragments.padding}
        ${({ $addMargin, $marginSize }) => $addMargin && fragments.margin}

        &${noMarginCollapseSelector} + &${noMarginCollapseSelector} {
            display: inline-block;
            width: 100%;
        }
    `,
}
