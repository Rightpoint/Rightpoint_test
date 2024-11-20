import { css } from 'styled-components'
import { media } from '@rightpoint/core/styles'

export type MarginSizes = 'small' | 'medium' | 'large'

export enum VerticalSpacings {
    None = 'None',
    Small = 'Small',
    Medium = 'Medium',
    Large = 'Large',
}

export const verticalSpacing = {
    // get spacing css var name
    varNames: {
        large: '--vertical-spacing-large',
        medium: '--vertical-spacing-medium',
        small: '--vertical-spacing-small',
    },

    css: {
        large: {
            top: css`
                margin-top: 200px;
                ${media('lg')} {
                    margin-top: 220px;
                }
            `,
            bottom: css`
                margin-bottom: 200px;
                ${media('lg')} {
                    margin-bottom: 220px;
                }
            `,
        },
        medium: {
            top: css`
                margin-top: 80px;
                ${media('lg')} {
                    margin-top: 160px;
                }
            `,
            bottom: css`
                margin-bottom: 80px;
                ${media('lg')} {
                    margin-bottom: 160px;
                }
            `,
        },
        small: {
            top: css`
                margin-bottom: 40px;
                ${media('lg')} {
                    margin-bottom: 80px;
                }
            `,
            bottom: css`
                margin-bottom: 40px;
                ${media('lg')} {
                    margin-bottom: 80px;
                }
            `,
        },
    },
}
