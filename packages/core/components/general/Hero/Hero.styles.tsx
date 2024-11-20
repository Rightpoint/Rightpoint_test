import {
    cssVarsTypography,
    cssVarNames,
    media,
    responsive,
    typography,
} from '@rightpoint/core/styles'
import styled, { css } from 'styled-components'
import { HeroContentWidths } from './Hero.component'

const sizeVarName = '--hero-font-size'

/**
 * The hero component requires stacking arbitrary content below it
 * with a specific negative overlap.
 *
 * - TODO: Need a solution to dynamically detect overlaps and adjust global font sizes
 * for this component
 */
const heroFontSizeMin = 6.8
const heroFontSizeMax = 22.7
const heroFontSizeRange = heroFontSizeMax - heroFontSizeMin
const heroFontSizes: {
    [k in keyof typeof responsive.Breakpoints]: number | string
} = {
    [responsive.Breakpoints.xs]: heroFontSizeMin,
    [responsive.Breakpoints.sm]: (
        heroFontSizeMin +
        0.2 * heroFontSizeRange
    ).toFixed(2),
    [responsive.Breakpoints.md]: (
        heroFontSizeMin +
        0.4 * heroFontSizeRange
    ).toFixed(2),
    [responsive.Breakpoints.lg]: (
        heroFontSizeMin +
        0.5 * heroFontSizeRange
    ).toFixed(2),
    [responsive.Breakpoints.xl]: (
        heroFontSizeMin +
        0.8 * heroFontSizeRange
    ).toFixed(2),
    [responsive.Breakpoints.xxl]: (1 * heroFontSizeMax).toFixed(2),
}

interface HeroProps {
    $contentWidth?: keyof typeof HeroContentWidths
    $titleSticky?: boolean
    $edgeToEdge?: boolean
}
const Hero = styled.div<HeroProps>`
    // this is used to manage sticky positions of child titles
    position: relative;

    // DO NOT apply styles that cascade.
    // This component contains arbitrary children.
    ${({ $contentWidth }) =>
        css`
            ${sizeVarName}: 6.8rem;

            ${media('sm')} {
                // ${sizeVarName}: 11vw;
                ${sizeVarName}: ${heroFontSizes['sm']}rem;
            }
            ${media('md')} {
                ${sizeVarName}: ${heroFontSizes['md']}rem;
            }
            ${media('lg')} {
                ${sizeVarName}: ${heroFontSizes['lg']}rem;
            }
            ${media('xl')} {
                ${sizeVarName}: ${heroFontSizes['xl']}rem;
            }
            ${media('xxl')} {
                ${sizeVarName}: ${heroFontSizes['xxl']}rem;
            }
        `}

    ${({ $contentWidth }) => css`
        ${media('md')} {
            ${ContentRow} {
                margin-left: auto;
                margin-right: auto;
                ${handleContentWidth($contentWidth)}
            }
        }
    `}

    ${({ $edgeToEdge }) =>
        $edgeToEdge &&
        css`
            width: 100vw;
            margin-left: calc(50% - 50vw);
        `}
`

const Title = styled.div<{
    $isStickyPlaceholder?: boolean
    $overlap?: boolean
}>`
    ${typography.utils.typographyBase}
    ${cssVarsTypography.textColor}
    ${typography.utils.getFontFamily('sans')}
    margin: 0;
    font-size: var(${sizeVarName});
    font-weight: 300;
    line-height: 1.1;
    text-align: center;

    white-space: nowrap;

    // hero titles always stack left.
    width: 100%; // 100vw causes overflow with scrollbar
    overflow: hidden;

    // if it's sticky placeholder, calculate height but make invisible
    ${({ $isStickyPlaceholder }) =>
        $isStickyPlaceholder &&
        css`
            opacity: 0;
        `}

    ${({ $overlap }) =>
        $overlap &&
        css`
            margin-bottom: calc(
                ${CONTENT_OVERLAP_AMOUNT} * var(${sizeVarName})
            );
        `}
`

/* 
Sticky animation
- sticky elements require parents that define the sticky context  
- the element to be sticky
- and the element styled as child
- and extra space at the bottom to land
*/
const StickyTitlePositioner = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
`

const StickyTitle = styled.div`
    position: sticky;
    top: 40%; // center visually
    z-index: 0;
`

const Subtitle = styled(typography.Subtitle).attrs({
    $fontFamily: 'serif',
})`
    ${cssVarsTypography.textColor}

    margin-top: 0.32em;
    text-align: center;
    padding: 0 40px;
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;

    ${() => css`
        ${ContentRow} + & {
            margin-top: 1.45em;
        }
    `}
`

const CONTENT_OVERLAP_AMOUNT = -0.27
/**
 * ContentRow is constrained by parent
 */
const ContentRow = styled.div`
    z-index: 1;
`

/**
 * This should use a grid system?
 */
const handleContentWidth = (contentWidth) => {
    switch (contentWidth) {
        case HeroContentWidths.FullBleed:
            return ``
        case HeroContentWidths.FullWidth:
            return `width: 100%;`
        case HeroContentWidths.Large:
            return 'width: 80%;'
        case HeroContentWidths.Medium:
            return `width: 70%;`
        case HeroContentWidths.Small:
            return `width: 60%;`
        default:
            return handleContentWidth(HeroContentWidths.Large)
    }
}

const ContentComponent = styled.div<{ $legacyMediaInContent: boolean }>`
    ${({ $legacyMediaInContent }) =>
        !$legacyMediaInContent &&
        css`
            margin-top: 50px;
        `}
`

export const HeroStyles = {
    Hero,
    Title,
    Subtitle: Subtitle,

    StickyTitlePositioner,
    StickyTitle,

    ContentRow,
    ContentComponent,
    RichText: styled.div``,
    Cta: styled.div`
        margin-top: 50px;
        text-align: center;
    `,
}
