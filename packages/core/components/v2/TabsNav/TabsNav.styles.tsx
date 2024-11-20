import styled, { css } from 'styled-components'
import { media, resets, typography } from '@rightpoint/core/styles'
import { colors } from '@rightpoint/core/variables'

export const TabsNavStyles = {
    TabsNav: styled.div`
        display: flex;
        border-bottom: 1px solid ${colors.stone};
    `,
    Inner: styled.div`
        display: flex;
        flex-wrap: wrap;
        row-gap: 10px;
    `,
    Item: styled.div`
        ${typography.FoundersB100RCss}

        display: block;

        cursor: pointer;
        padding-right: 30px;

        ${media('xs', 'md')} {
            padding-right: 20px;
        }

        &:last-child {
            padding-right: 0;
        }
        > * {
            padding-bottom: 5px;
        }
        a {
            display: block;
            height: 100%;
        }
    `,

    /**
     * This element serves to position the active underline
     * without space between items to not trigger mouseleave
     */
    ActivePositioner: styled.div`
        position: relative;
    `,

    Item__Active: styled.div<{
        $hover?: boolean
    }>`
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        transition: border-color 0.4s ease;
        border-bottom: 2px solid ${colors.black};
    `,
}
