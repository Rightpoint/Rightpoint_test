import styled, { css } from 'styled-components'
import { typography } from '@rightpoint/core/styles'
import { ContentColors } from '../RootComponent/background-color'
import { backgroundColorTreatment } from './background-color-treatment'
import { AspectWrapperStyles } from '../../utils/AspectWrapper/AspectWrapper.styles'

export const BackgroundMediaStyles = {
    BackgroundMedia: styled.div<{
        $isInView?: boolean
        $treatmentLevel?: string
        $contentColor?: ContentColors
        $shouldBlurBackground?: boolean
    }>`
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 100%;
        z-index: -1;
        overflow: hidden;

        transition: filter 0.5s ease;

        ${({ $isInView, $contentColor, $treatmentLevel }) =>
            backgroundColorTreatment({
                $isInView,
                $contentColor,
                $treatmentLevel,
            })}

        // override default behavior of image component
        img {
            width: 100%;
            height: 100% !important;
            object-fit: cover;

            ${({ $shouldBlurBackground, $isInView }) =>
                $shouldBlurBackground
                    ? // blurred background + in view transition
                      css`
                          filter: blur(30px);
                          transform: scale(3);

                          transition: transform 6s ease;
                          ${$isInView &&
                          css`
                              transform: scale(3.5);
                          `}
                      `
                    : // not blurred
                      css`
                          transition: transform 6s ease;
                          ${$isInView &&
                          css`
                              transform: scale(1.1);
                          `}
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
    `,
}
