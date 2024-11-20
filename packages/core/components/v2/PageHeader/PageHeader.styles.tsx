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
import { ContentColors } from '../../layout/RootComponent/background-color'
import { colors } from '@rightpoint/core/variables'

const toSmootherGradient = (hex: string) => {
    const [r, g, b] = hex.match(/\w\w/g).map((x) => parseInt(x, 16))
    return `
            rgba(${r}, ${g}, ${b}, 1) 0%,
            rgba(${r}, ${g}, ${b}, 0.738) 19%,
            rgba(${r}, ${g}, ${b}, 0.541) 34%,
            rgba(${r}, ${g}, ${b}, 0.382) 47%,
            rgba(${r}, ${g}, ${b}, 0.278) 56.5%,
            rgba(${r}, ${g}, ${b}, 0.194) 65%,
            rgba(${r}, ${g}, ${b}, 0.126) 73%,
            rgba(${r}, ${g}, ${b}, 0.075) 80.2%,
            rgba(${r}, ${g}, ${b}, 0.042) 86.1%,
            rgba(${r}, ${g}, ${b}, 0.021) 91%,
            rgba(${r}, ${g}, ${b}, 0.008) 95.2%,
            rgba(${r}, ${g}, ${b}, 0.002) 98.2%,
            rgba(${r}, ${g}, ${b}, 0) 100%
    `
}

export const PageHeaderStyles = {
    PageHeader: styled.div<{ $noMainPadding?: boolean }>`
        position: relative;
        color: ${cssVarsTypographyValues.getTextColor()};
        padding-top: 100px;
        padding-bottom: 100px;

        ${media('lg')} {
            padding-bottom: 150px;
        }

        ${({ $noMainPadding }) =>
            $noMainPadding &&
            css`
                ${PageHeaderStyles.main.Root} {
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
     * Main title area
     */
    main: {
        Root: styled.div<{ $noMarginBelow?: boolean }>`
            padding-top: 350px;
        `,
        /**
         * Small text area above title
         */
        Above: styled(typography.FoundersB100)`
            max-width: 470px;
            ${media('xs', 'md')} {
                padding-right: 10%;
                margin-bottom: 50px;
            }
        `,

        Title: styled.h1<{ $noMarginBelow?: boolean; $smallerText?: boolean }>`
            ${typography.FoundersH100Css}
            ${cssVarsTypography.textColor};
            margin-top: 0.32em;
            margin-bottom: 0.65em;

            ${({ $noMarginBelow }) =>
                $noMarginBelow &&
                css`
                    margin-bottom: 0;
                `}

            ${({ $smallerText }) =>
                $smallerText &&
                css`
                    ${typography.FoundersH300Css}
                    max-width: 1000px;
                `}
        `,
    },

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
        max-width: 700px;

        ${media('xxl')} {
            max-width: 700px;
        }

        > *:first-child {
            margin-top: 0;
        }
        > *:last-child {
            margin-bottom: 0;
        }
    `,

    Cta: styled.div`
        margin-top: 20px;
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
        img {
            ${({ $treatmentLevel, $contentColor, $isInView }) => {
                /**
                 * If we add a treatment level, use the standard function from the utility function
                 * to maintain treatment levels.
                 *
                 * Designs use a static 30% darkening.
                 */
                if (!$treatmentLevel) {
                    return css`
                        filter: brightness(
                            ${$contentColor === ContentColors.Dark ? 1 : 0.7}
                        ); // b
                    `
                }
            }}
        }

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
                    ? 'rgba(255, 255, 255, .2'
                    : colors.black
            return $legacyBackgroundFallback
                ? css`
                      // don't overlap text
                      height: 800px;

                      // before element should try to make the top of text/navbar more visible
                      &:before {
                          height: 120px;

                          background: linear-gradient(
                              180deg,
                              ${toSmootherGradient($backgroundColorHex)}
                          );
                      }

                      &:after {
                          height: 200px;
                          z-index: 10;
                          background: linear-gradient(
                              0deg,
                              ${toSmootherGradient($backgroundColorHex)}
                          );
                      }
                  `
                : /**
                   * NOT legacy fallback;
                    if full background, use a taller gradient
                   */
                  css`
                      &:before {
                          opacity: 0.7;
                          height: 120px;
                          background: linear-gradient(
                              180deg,
                              ${toSmootherGradient(colors.black)}
                          );
                      }

                      &:after {
                          height: 300px;
                          z-index: 10;
                          background: linear-gradient(
                              0deg,
                              ${toSmootherGradient(colors.black)}
                          );
                      }
                  `
        }}
        max-height: 600px;

        ${media('lg')} {
            max-height: 800px;
        }
        ${media('xl')} {
            max-height: 950px;
        }

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
