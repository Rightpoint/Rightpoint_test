import { AspectWrapperStyles } from '@rightpoint/core/components'
import styled, { css } from 'styled-components'
import {
    cssVarNames,
    cssVarsTypography,
    media,
    typography,
} from '@rightpoint/core/styles'
import { GridLayouts, SimpleGridVariants } from './SimpleGrid.component'

export const SimpleGridStyles = {
    Layout: styled.div<{
        $layout?: GridLayouts | undefined
        $variant?: SimpleGridVariants
        $hasHeader?: boolean
    }>`
        ${({ $hasHeader }) =>
            $hasHeader &&
            css`
                margin-top: 30px;
            `}
        padding: 40px 0;
    `,
    Title: styled(typography.FoundersH600).attrs({})`
        margin-bottom: 0.2em;
        ${cssVarsTypography.textColor};
    `,
    Body: styled(typography.FoundersB200)`
        ${cssVarsTypography.textColor};
        & > *:first-child {
            margin-top: 0;
        }
        & > *:last-child {
            margin-bottom: 0;
        }
    `,
    Image: styled.div`
        position: relative;
        img {
            width: 100%;
        }
    `,
    Item: styled.div`
        ${media('lg')} {
            max-width: 320px;
        }
    `,
    Cta: styled.div`
        margin-top: 20px;
    `,

    // this still throws errors; resolve later.
}
export const SimpleGridOffsetStyles = {
    Layout: styled(SimpleGridStyles.Layout)`
        ${media('xs', 'md')} {
            ${SimpleGridStyles.Title} {
                ${typography.FoundersMH400Css}
            }
        }
        ${media('lg')} {
            padding-bottom: 100px;
        }
    `,
    Row: styled.div<{ $row: number }>`
        ${media('xs', 'lg')} {
            padding-left: 25px;
        }

        ${media('lg')} {
            display: flex;
            gap: 120px;

            margin-left: ${({ $row }) => `${$row * 5}%`};

            &:not(:last-child) {
                margin-bottom: 150px;
            }
        }

        ${media('xxl')} {
            gap: 160px;
            margin-left: ${({ $row }) => `${$row * 15}%`};
        }
    `,
    Item: styled.div<{ $count: number }>`
        position: relative;

        ${SimpleGridStyles.Title} {
            position: relative;
            &:after {
                ${typography.FoundersMB100Css};
                content: '0${({ $count }) => $count}';
                position: absolute;
                transform: translateX(-100%);

                bottom: 6px;

                left: -7px;
                ${media('lg')} {
                    left: -15px;
                }
                ${media('xl')} {
                    left: -20px;
                }
            }
        }

        ${SimpleGridStyles.Body} {
            ${typography.FoundersB200StaticCss};
            ${media('md')} {
                ${typography.FoundersB100StaticCss};
            }
        }

        ${media('xs', 'lg')} {
            margin-bottom: 80px;
        }
    `,
}
