import styled, { css } from 'styled-components'
import {
    cssVarNames,
    cssVarsTypography,
    cssVarsTypographyValues,
    hexToRgba,
    media,
    typography,
} from '@rightpoint/core/styles'
import { AspectWrapperStyles } from '../../utils/AspectWrapper/AspectWrapper.styles'
import {
    BackgroundColors,
    ContentColors,
} from '../../layout/RootComponent/background-color'
import { colors } from '@rightpoint/core/variables'

export const PageHeaderStyles = {
    PageHeader: styled.div<{ $noMainPadding?: boolean }>`
        position: relative;
        color: ${cssVarsTypographyValues.getTextColor()};
        padding-top: 100px;
        padding-bottom: 100px;

        ${media('lg')} {
            padding-bottom: 150px;
        }
        ${media('xl')} {
            padding-bottom: 300px;
        }

        ${({ $noMainPadding }) =>
            $noMainPadding &&
            css`
                ${PageHeaderStyles.Main} {
                    padding-top: 0;
                }
            `}
    `,

    /**
     * Header
     */
    Above: styled.div``,

    AboveContent: styled.div``,

    Eyebrow: styled(typography.FoundersB100)`
        position: absolute;
        top: 40px;

        ${media('lg')} {
            top: 80px;
        }
    `,

    /**
     * Main
     */
    Main: styled.div`
        padding-top: 350px;
    `,

    Title: styled.h1`
        ${typography.FoundersH100Css}
        margin-top: 30px;
        // margin-bottom: 140px;
        ${cssVarsTypography.textColor};
        margin-bottom: 0.65em;
    `,
    AboveBackground: styled.div`
        z-index: 1;
        position: relative;
    `,
    IntroEyebrow: styled(typography.FoundersB100)`
        margin-bottom: 1.9em;
    `,

    Subtitle: styled(typography.RecklessH500)`
        margin-bottom: 1em;
        max-width: 1100px;
        ${media('lg')} {
            padding-right: 10%;
        }
        ${media('xxl')} {
            max-width: 1100px;
        }
    `,
    BodyAndLinks: styled.div`
        ${media('lg')} {
            display: flex;
            justify-content: space-between;
            gap: 100px;
        }
    `,

    Introduction: styled.div`
        ${typography.FoundersB100Css}
        max-width: 750px;

        ${media('xxl')} {
            max-width: 900px;
        }

        > *:first-child {
            margin-top: 0;
        }
        > *:last-child {
            margin-bottom: 0;
        }
    `,
    OverlappedMediaStyles: {
        /**
         * This is the component that overlaps the header by 50%
         * visually
         */
        OverlappedMedia: styled.div<{ $color?: string }>`
            overflow: hidden;
            position: relative;
            z-index: 2;
            &:after {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 50%;

                ${({ $color }) =>
                    $color &&
                    css`
                        background: ${$color};
                    `}
                width: 100vw;
                margin-left: calc(-50vw + 50%);
                z-index: -1;
            }
        `,
    },
    Background: styled.div<{
        $isInView?: boolean
        $treatmentLevel?: string
        $contentColor?: ContentColors
        $backgroundColorHex?: string
        $shouldBlurBackground?: boolean
        $legacyBackgroundFallback?: boolean
    }>`
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 100%;

        &:before {
            position: absolute;
            width: 100%;
            content: '';
            top: 0;
            left: 0;
            right: 0;
            z-index: 10;
        }

        &:after {
            position: absolute;
            width: 100%;
            content: '';
            bottom: 0;
            left: 0;
            right: 0;
            z-index: 10;
        }

        transition: filter 0.5s ease;

        ${({ $treatmentLevel, $contentColor, $isInView }) => {
            return ``
            // this is a problem; changing saturation on this bg causes the next element that overlaps to not have the same color.
            if (!$isInView) {
                return ``
            }
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

        /// if legacy, shorten content to not overlap with text and add gradients.
        ${({
            $legacyBackgroundFallback,
            $contentColor,
            $backgroundColorHex,
        }) => {
            /**
             * Set the gradients at the top and bottom of the background asset.
             */

            const topGradientHex =
                $contentColor === ContentColors.Dark
                    ? colors.white
                    : colors.black
            return $legacyBackgroundFallback
                ? css`
                      // don't overlap text
                      height: 600px;

                      // before element should try to make the top of text/navbar more visible
                      &:before {
                          height: 120px;
                          background: linear-gradient(
                              180deg,
                              ${hexToRgba(topGradientHex, 1)} 0%,
                              ${hexToRgba(topGradientHex, 0)} 100%
                          );
                      }

                      &:after {
                          height: 200px;
                          z-index: 10;
                          background: linear-gradient(
                              0deg,
                              ${hexToRgba($backgroundColorHex, 1)} 0%,
                              ${hexToRgba($backgroundColorHex, 0.7)} 50%,
                              ${hexToRgba($backgroundColorHex, 0)} 100%
                          );
                      }
                  `
                : css`
                      // if full background, use a taller gradient
                      &:before {
                          height: 120px;
                          background: linear-gradient(
                              180deg,
                              ${hexToRgba(topGradientHex, 1)} 0%,
                              ${hexToRgba(topGradientHex, 0)} 100%
                          );
                      }

                      &:after {
                          height: 150px;
                          z-index: 10;
                          background: linear-gradient(
                              0deg,
                              ${hexToRgba($backgroundColorHex, 1)} 0%,
                              ${hexToRgba($backgroundColorHex, 0.7)} 50%,
                              ${hexToRgba($backgroundColorHex, 0)} 100%
                          );
                      }
                  `
        }}

        z-index: 1;

        // override default behavior of image component
        img {
            width: 100%;
            height: 100% !important;
            object-fit: cover;
        }

        // prevent aspect wrapper from enforcing aspect
        // this is a "background-image" like element
        > * {
            height: 100%;
        }

        ${AspectWrapperStyles.AspectWrapper} {
            position: static;
        }
    `,
}
