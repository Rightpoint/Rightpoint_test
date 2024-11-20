import styled, { css } from 'styled-components'
import { colors } from '../../variables'
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
    getLinkColor: () => cssVarsTypographyValues.getAccentColor(),

    getRichTextColor: () =>
        `var(${cssVarNames.content.colorText}, ${colors.richTextBlack})`,

    getDividerColor: () =>
        cssVarUtils.withFallback(
            cssVarNames.content.colorDivider,
            cssVarNames.colors.divider
        ),

    getButtonColor: () =>
        cssVarUtils.withFallback(
            cssVarNames.content.colorButton,
            cssVarNames.colors.coral
        ),

    getButtonTextColor: () =>
        cssVarUtils.withFallback(
            cssVarNames.content.colorButtonText,
            cssVarNames.colors.black
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
    richTextColor: css`
        color: ${cssVarsTypographyValues.getRichTextColor()};
    `,
    linkColor: css`
        color: ${cssVarsTypographyValues.getLinkColor()};
    `,
    backgroundColor: css``,
    buttonColor: css`
        background: ${cssVarsTypographyValues.getButtonColor()};
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
