import styled, { css } from 'styled-components'
import { cssVarsTypography, media, typography } from '@rightpoint/core/styles'
import { IconEyebrowStyles } from '../IconEyebrow/IconEyebrow.styles'

/**
 * Header padding should be applied to all headers,
 * but it may be overridden by a css var
 */
const headerPadding = css`
    padding-top: var(--header-padding, 30px);
    padding-bottom: var(--header-padding, 30px);

    ${media('lg')} {
        padding-top: var(--header-padding, 60px);
        padding-bottom: var(--header-padding, 60px);
    }
`

export const HeaderStyles = {
    Header: styled.div``,

    Header1: {
        Header: styled.div`
            ${cssVarsTypography.textColor}
            ${headerPadding}
        `,
        Eyebrow: styled.div`
            margin-bottom: 40px;
        `,
        Title: styled(typography.FoundersH100)`
            margin-bottom: 0.15em;
        `,
        Body: styled(typography.FoundersH600)`
            ${media('lg')} {
                width: 60%;
            }
        `,
    },

    Header2: {
        Header: styled.div`
            --header-padding: 100px;

            ${cssVarsTypography.textColor}
            ${headerPadding}

            ${media('lg')} {
                display: flex;
                justify-content: space-between;
                gap: 50px;
            }
        `,
        Title: styled(typography.FoundersH200)`
            margin-bottom: 0.15em;

            ${media('lg')} {
                flex-grow: 2;
            }
        `,
        Right: styled.div`
            ${media('lg')} {
                flex-shrink: 1;
                flex-basis: 45%;
            }
        `,
        Body: styled(typography.FoundersB100)`
            margin-top: 1em;
        `,
    },

    Header3: {
        Header: styled.div`
            ${cssVarsTypography.textColor}
            ${headerPadding}
        `,
        Title: styled(typography.RecklessH500)`
            margin-top: 0.4em;
        `,
    },
    Header4: {
        Header: styled.div`
            ${cssVarsTypography.textColor}
            ${headerPadding}
        `,
        Body: styled.div`
            margin-top: 1em;

            ${media('xs', 'lg')} {
                ${typography.FoundersMH700Css}
            }
            ${media('lg')} {
                ${typography.FoundersH600StaticCss}
                margin-top: 0.5em;
                width: 70%;
            }
            > *:first-child {
                margin-top: 0;
            }
        `,
        Cta: styled.div`
            margin-top: 30px;
        `,
    },

    Header5: {
        Header: styled.div`
            ${cssVarsTypography.textColor}
            ${headerPadding}

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
        `,
    },

    HeaderText: {
        Header: styled.div`
            ${cssVarsTypography.textColor}
            ${headerPadding}
            text-align: center;
        `,
        Body: styled(typography.FoundersH600)`
            margin: 0 auto;
            max-width: 700px;
        `,
    },
}
