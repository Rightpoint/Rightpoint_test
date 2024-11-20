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
        color: ${cssVarsTypographyValues.getTextColor()};
        padding-top: 140px;
        padding-bottom: 360px;
        padding-left: var(--container-padding);
        padding-right: var(--container-padding);
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
        font-size: 22.4rem;
        margin-top: 30px;
        margin-bottom: 140px;
        ${cssVarsTypography.textColor};
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
        // max-width: 800px;
    `,
    BodyAndLinks: styled.div`
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
        > a {
            text-decoration: none;
        }
    `,
}
