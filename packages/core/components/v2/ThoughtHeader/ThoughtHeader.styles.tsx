import styled, { css } from 'styled-components'
import {
    cssVarNames,
    cssVarsTypography,
    media,
    typography,
} from '@rightpoint/core/styles'
import { CardStyles } from '../../general/Card/Card.styles'
import { colors } from '@rightpoint/core/variables'
import { AspectWrapperStyles } from '../../utils/AspectWrapper/AspectWrapper.styles'
import { ContentColors } from '../../layout/RootComponent/background-color'

const mediaStacked = media('xs', 'lg')
const mediaHorizontal = media('lg')

export const ThoughtHeaderStyles = {
    ThoughtHeader: styled.div`
        position: relative;

        // let the background image clip out of the container
        overflow: hidden;
        margin-bottom: var(--spacing-vertical);

        // default to white; but allow fot content authors to provide a ContentColor
        color: var(${cssVarNames.content.colorText}, ${colors.white});
    `,
    MaxWidth: styled.div`
        max-width: 1600px;
        margin: 0 auto;
        padding: 150px 0;
        justify-content: space-between;
        ${mediaStacked} {
            display: flex;
            flex-direction: column;
            padding-bottom: 50px;
            gap: 30px;
        }

        ${mediaHorizontal} {
            display: flex;
            gap: 50px;
        }
    `,
    Content: styled.div`
        max-width: 900px;
    `,
    EyeBrow: styled(typography.FoundersB100Static)``,
    Title: styled.h1`
        ${typography.FoundersH400Css}
        margin-top: 0.3em;
        margin-bottom: 0.35em;
    `,
    Authors: styled(typography.FoundersB100Static)`
        margin-top: 0.1em;
    `,
    Body: styled(typography.FoundersB100Static)`
        margin-top: 1.5em;
    `,
    Card: styled.div`
        ${media('xs', 'lg')} {
            --aspect-wrapper-padding: 45%;
        }

        ${media('lg')} {
            min-width: 220px;
        }

        ${media('xl')} {
            margin-top: 0;
            min-width: 300px;
        }
        ${media('xxl')} {
            margin-top: 0;
            min-width: 350px;
        }

        ${CardStyles.Caption},
        ${CardStyles.Link} {
            display: none;
        }
    `,
    Background: styled.div<{
        $isInView?: boolean
        $treatmentLevel?: string
        $contentColor?: ContentColors
        $shouldBlurBackground?: boolean
    }>`
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        z-index: -1;

        // override default behavior of image component

        img {
            width: 100%;
            height: 100% !important;
            object-fit: cover;

            ${({ $shouldBlurBackground, $isInView }) =>
                $shouldBlurBackground &&
                css`
                    filter: blur(30px);
                    transform: scale(3);

                    transition: transform 6s ease;
                    ${
                        ``
                        // this is expensive in safari.
                        // $isInView &&
                        // css`
                        //     transform: scale(3.5);
                        // `
                    }
                `}
        }

        // prevent aspect wrapper from enforcing aspect
        // this is a "background-image" like element
        > * {
            height: 100%;
        }

        ${AspectWrapperStyles.AspectWrapper} {
            position: static;
        }

        ${({ $treatmentLevel, $contentColor, $isInView }) => {
            // this is expensive in safari.
            // if (!$isInView) {
            //     return ``
            // }
            if (!$treatmentLevel) {
                return css`
                    filter: saturate(1.5) // s
                        contrast(0.9) // c
                        brightness(
                            ${$contentColor === ContentColors.Dark ? 1 : 1}
                        ); // b
                `
            }
            switch ($treatmentLevel) {
                case 'Subtle':
                    return css`
                        filter: saturate(2) // s
                            contrast(0.7) // c
                            brightness(
                                ${$contentColor === ContentColors.Dark
                                    ? 1.1
                                    : 0.9}
                            ); // b
                    `
                case 'Normal':
                    return css`
                        filter: saturate(3) // s
                            contrast(0.7) // c
                            brightness(
                                ${$contentColor === ContentColors.Dark
                                    ? 1.3
                                    : 0.7}
                            ); // b
                    `
                case 'Strong':
                    return css`
                        filter: saturate(4) // s
                            contrast(0.6) // c
                            brightness(
                                ${$contentColor === ContentColors.Dark
                                    ? 1.3
                                    : 0.7}
                            ); // b
                    `
                default:
                    return ``
            }
        }}
    `,
}

/**
 * this animation is very expensive in safari
 */
const removed = css<any>`
    ${({ $treatmentLevel, $contentColor }) => {
        return $contentColor === ContentColors.Dark
            ? // dark content initial
              css`
                  transition: all 2s ease-in-out;
                  filter: saturate(0.7) contrast(1) brightness(1);
              `
            : // light content initial
              css`
                  transition: all 2s ease-in-out;
                  filter: saturate(0.7) contrast(1) brightness(1);
              `
    }}
`
