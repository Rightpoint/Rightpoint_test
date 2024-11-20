import styled, { css } from 'styled-components'
import {
    cssVarsTypography,
    media,
    resets,
    typography,
    verticalSpacing,
} from '@rightpoint/core/styles'
import { IconEyebrowStyles } from '../IconEyebrow/IconEyebrow.styles'

/**
 * Header padding should be applied to all headers,
 * but it may be overridden by a css var
 */

const fragments = {
    /**
     * Headers may conditionally become H1
     */
    common: css`
        h1 {
            ${resets.heading}
        }
    `,
    margin: css`
        margin-top: var(--header-padding, 30px);
        margin-bottom: var(--header-padding, 30px);

        ${media('lg')} {
            margin-top: var(--header-padding, 60px);
            margin-bottom: var(--header-padding, 60px);
        }
    `,
}

export const HeaderStyles = {
    /**
     * Any header can be a page header
     * - Which should make its title an H1
     * - And add a large top margin
     */
    Header: styled.div<{ $isPageHeader: boolean }>`
        ${({ $isPageHeader }) =>
            $isPageHeader &&
            css`
                ${verticalSpacing.css.large.top}
            `}
    `,

    Header1: {
        Header: styled.div`
            ${fragments.common}
            ${cssVarsTypography.textColor}
        `,
        Eyebrow: styled.div`
            margin-bottom: 40px;
        `,
        Title: styled(typography.FoundersH100)`
            margin-bottom: 0.15em;
        `,
        Body: styled(typography.FoundersH600)`
            ${media('lg')} {
                width: 70%;
            }
        `,
    },

    Header2: {
        Header: styled.div`
            --header-padding: 100px;
            ${fragments.common}
            ${verticalSpacing.css.small.bottom}
            ${cssVarsTypography.textColor}

            display: flex;
            flex-direction: column;
            justify-content: space-between;
            gap: 30px;

            ${media('xl')} {
                flex-direction: row;
                gap: 50px;
            }
        `,
        Title: styled(typography.FoundersH200)`
            margin-bottom: 0.15em;

            ${media('xl')} {
                flex-grow: 2;
            }
        `,
        Right: styled.div`
            ${IconEyebrowStyles.IconEyebrow} {
                margin-bottom: 1em;
            }
            ${media('xl')} {
                flex-shrink: 1;
                flex-basis: 45%;
            }
        `,
        Body: styled(typography.FoundersB100)`
            ${typography.utils.clearRichMargin}
        `,
    },

    Header3: {
        Header: styled.div`
            ${fragments.common}
            ${fragments.margin}
            ${cssVarsTypography.textColor}
        `,
        Title: styled(typography.RecklessH500)`
            margin-top: 0.4em;
        `,
    },
    Header4: {
        Header: styled.div`
            ${fragments.common}
            ${fragments.margin}
            ${cssVarsTypography.textColor}
        `,
        Body: styled.div`
            margin-top: 1em;
            ${typography.utils.clearRichMargin}
            ${media('xs', 'lg')} {
                ${typography.FoundersMH700Css}
            }
            ${media('lg')} {
                ${typography.FoundersH600StaticCss}
                margin-top: 0.5em;
                width: 70%;
            }
        `,
        Cta: styled.div`
            margin-top: 30px;
        `,
    },

    Header5: {
        Header: styled.div`
            ${fragments.common}
            ${fragments.margin}
            ${cssVarsTypography.textColor}

            ${media('lg')} {
                display: flex;
                justify-content: space-between;
                gap: 60px;
            }
            ${media('xl')} {
                gap: 100px;
            }
        `,
        Left: styled.div`
            ${media('lg')} {
                min-width: 200px;
            }
        `,
        Right: styled.div`
            ${media('lg')} {
                flex-grow: 1;
                padding-right: 10%;
            }
        `,

        Title: styled(typography.FoundersH300)`
            margin-bottom: 0.15em;

            ${media('xs', 'lg')} {
                margin-top: 0.25em;
            }
        `,
        Body: styled(typography.FoundersB100)`
            margin-top: 1em;
            ${typography.utils.clearRichMargin}
        `,
    },

    HeaderText: {
        Header: styled.div`
            ${fragments.margin}
            ${cssVarsTypography.textColor}
            text-align: center;
        `,
        Body: styled(typography.FoundersH600)`
            margin: 0 auto;
            max-width: 700px;
        `,
    },

    Header6: {
        Header: styled.div`
            --header-padding: 100px;
            ${fragments.common}
            ${fragments.margin}
            ${cssVarsTypography.textColor}
        `,
        Title: styled(typography.FoundersH200)<{ $isPageHeader?: boolean }>`
            margin-bottom: 0.1em;
            ${media('lg')} {
                flex-grow: 2;
            }
        `,

        Cta: styled.div`
            margin-top: 30px;

            ${media('xl')} {
                margin-top: 20px;
            }
        `,

        Below: styled.div`
            ${media('xl')} {
                display: flex;
                justify-content: space-between;
                gap: 50px;
            }
        `,

        Left: styled(typography.FoundersH600)`
            ${media('xs', 'xl')} {
                margin-top: 40px;
                margin-bottom: 40px;
            }
            ${media('xs', 'xl')} {
                ${() => css`
                    ${HeaderStyles.Header6.Cta} {
                        display: none;
                    }
                `}
            }
            ${media('xl')} {
                max-width: 620px;
            }
        `,

        Subtitle: styled(typography.FoundersH600)`
            ${typography.utils.clearRichMargin}
        `,

        Right: styled.div`
            ${media('lg')} {
                flex-shrink: 1;
                flex-basis: 45%;
            }
            ${media('xl')} {
                ${() => css`
                    ${HeaderStyles.Header6.Cta} {
                        display: none;
                    }
                `}
            }
        `,
        Body: styled(typography.FoundersB100)`
            ${typography.utils.clearRichMargin}
        `,
    },

    HeaderContact: {
        Header: styled.div`
            ${fragments.common}
            ${cssVarsTypography.textColor}

            margin-top: 150px;

            ${media('md')} {
                margin-top: 60px;
            }

            ${media('xxl')} {
                display: flex;
                justify-content: space-between;
                gap: 50px;
            }
        `,
        Title: styled(typography.FoundersH200)<{ $isPageHeader?: boolean }>`
            margin-bottom: 0.5em;
            ${media('lg')} {
                flex-grow: 2;
            }
        `,

        Cta: styled.div`
            margin-top: 20px;
        `,

        Left: styled(typography.FoundersH600)`
            ${media('xs', 'xxl')} {
                margin-top: 40px;
                margin-bottom: 100px;
            }
            ${media('xxl')} {
                max-width: 620px;
            }
        `,

        Subtitle: styled(typography.FoundersH600)`
            ${typography.utils.clearRichMargin}
            margin-top: .75em;
            max-width: 700px;
            margin-bottom: 1em;
        `,

        Right: styled.div`
            display: grid;
            grid-template-columns: 1fr 1fr;
            grid-row-gap: 30px;

            ${media('xs', 'sm')} {
                grid-template-columns: 1fr;
            }

            ${media('lg')} {
                grid-row-gap: 50px;
                flex-shrink: 1;
                flex-basis: 45%;
            }
        `,

        GridItem: styled.div``,

        GridItem__Title: styled(typography.FoundersB100)`
            ${typography.utils.cssVarsTypography.textColor}
            margin-bottom: .5em;
        `,

        GridItem__Body: styled(typography.FoundersB200)`
            ${typography.utils.cssVarsTypography.textAltColor}
            ${typography.utils.clearRichMargin}
            a {
                text-decoration: none;
            }
        `,

        Body: styled(typography.FoundersB100)`
            ${typography.utils.clearRichMargin}
        `,
    },
}
