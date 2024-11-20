import styled, { css } from 'styled-components'
import { colors } from '@rightpoint/core/variables'
import { cssVarNames } from './var-names'
import { cssVarUtils } from './var-utils'

/**
 * Utils to get css typography vars with fallback values.
 *
 * Use to apply colors dependent on background.
 */
export const cssVarsTypographyValues = {
    getAccentColor: () =>
        cssVarUtils.withFallback(
            cssVarNames.content.colorAccent,
            cssVarNames.colors.accent
        ),
    getTextColor: ({ fallback = '' } = {}) =>
        cssVarUtils.withFallback(
            cssVarNames.content.colorText,
            cssVarNames.colors.black
        ),
    getTextAltColor: ({ fallback = '' } = {}) =>
        cssVarUtils.withFallback(
            cssVarNames.content.colorTextAlternate,
            cssVarNames.colors.black
        ),
    getLinkColor: () => cssVarsTypographyValues.getAccentColor(),

    getRichTextColor: () =>
        `var(${cssVarNames.content.colorText}, ${colors.richTextBlack})`,

    getDividerColor: () =>
        cssVarUtils.withFallback(
            cssVarNames.content.colorDivider,
            cssVarNames.colors.divider
        ),

    getButtonBgColor: () =>
        cssVarUtils.withFallback(
            cssVarNames.content.colorButton,
            cssVarNames.colors.black
        ),

    getButtonTextColor: () =>
        cssVarUtils.withFallback(
            cssVarNames.content.colorButtonText,
            cssVarNames.colors.white
        ),
}

/**
 * CSS fragments to get typography vars with fallback values.
 *
 * Use directly in `css` blocks: css`${typographyColorsCss.textColor}`
 */
export const cssVarsTypography = {
    textColor: css`
        color: ${cssVarsTypographyValues.getTextColor()};
    `,
    textAltColor: css`
        color: ${cssVarsTypographyValues.getTextAltColor()};
    `,
    richTextColor: css`
        color: ${cssVarsTypographyValues.getRichTextColor()};
    `,
    linkColor: css`
        color: ${cssVarsTypographyValues.getLinkColor()};
    `,
    backgroundColor: css``,
    buttonBgColor: css`
        background: ${cssVarsTypographyValues.getButtonBgColor()};
    `,
    buttonTextColor: css`
        color: ${cssVarsTypographyValues.getButtonTextColor()};
    `,
}

export const cssVarsTypographyWrappers = {
    textColor: styled.div`
        ${cssVarsTypography.textColor}
    `,
    linkColor: styled.div`
        ${cssVarsTypography.linkColor}
    `,
}
