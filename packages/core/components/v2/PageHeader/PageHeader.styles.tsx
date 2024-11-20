import styled, { css } from 'styled-components'
import {
    cssVarNames,
    cssVarsTypography,
    cssVarsTypographyValues,
    media,
    typography,
} from '@rightpoint/core/styles'
import { AspectWrapperStyles } from '../../utils/AspectWrapper/AspectWrapper.styles'
import { ContentColors } from '../../layout/RootComponent/background-color'
import { colors } from '@rightpoint/core/variables'

export const PageHeaderStyles = {
    PageHeader: styled.div`
        position: relative;

        position: absolute;
        inset: 0;

        color: ${cssVarsTypographyValues.getTextColor()};
        padding-top: 100px;
        padding-bottom: 100px;
        padding-left: var(--container-padding);
        padding-right: var(--container-padding);
        ${media('lg')} {
            padding-bottom: 150px;
        }
        ${media('xl')} {
            padding-bottom: 300px;
        }
    `,

    /**
     * Header
     */
    Above: styled.div`
        display: flex;
        justify-content: flex-end;
        padding-bottom: 200px;
    `,

    Eyebrow: styled(typography.FoundersB100)`
        position: absolute;
        top: 0;
        left: 0;
    `,

    /**
     * Main
     */
    Main: styled.div`
        margin-top: 200px;
    `,

    Title: styled.h1`
        ${typography.FoundersH100Css}
        margin-top: 30px;
        margin-bottom: 140px;
        ${cssVarsTypography.textColor};
    `,
    Background: styled.div<{
        $isInView?: boolean
        $treatmentLevel?: string
        $contentColor?: ContentColors
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
        ${({ $legacyBackgroundFallback, $contentColor }) =>
            $legacyBackgroundFallback
                ? css`
                      // don't overlap text
                      height: 600px;

                      &:before {
                          height: 120px;
                          background: linear-gradient(
                              180deg,
                              rgba(33, 33, 33, 1) 0%,
                              rgba(33, 33, 33, 0) 100%
                          );
                      }

                      &:after {
                          height: 200px;
                          z-index: 10;
                          background: linear-gradient(
                              0deg,
                              rgba(33, 33, 33, 1) 0%,
                              rgba(33, 33, 33, 0.7) 50%,
                              rgba(33, 33, 33, 0) 100%
                          );
                      }
                  `
                : css`
                      // if full background, use a taller gradient
                      &:before {
                          height: 120px;
                          background: linear-gradient(
                              180deg,
                              rgba(33, 33, 33, 1) 0%,
                              rgba(33, 33, 33, 0) 100%
                          );
                      }

                      &:after {
                          height: 100px;
                          z-index: 10;
                          background: linear-gradient(
                              0deg,
                              rgba(33, 33, 33, 1) 0%,
                              rgba(33, 33, 33, 0.7) 50%,
                              rgba(33, 33, 33, 0) 100%
                          );
                      }
                  `}

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
    AboveBackground: styled.div`
        z-index: 1;
        position: relative;
    `,
    IntroEyebrow: styled(typography.FoundersB100)`
        margin-bottom: 1.9em;
    `,
    Subtitle: styled(typography.RecklessH500)`
        margin-bottom: 1em;
        ${media('lg')} {
            padding-right: 10%;
        }
        max-width: 1200px;
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

        > *:first-child {
            margin-top: 0;
        }
        > *:last-child {
            margin-bottom: 0;
        }
    `,
}
