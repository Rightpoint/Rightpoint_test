import styled, { css } from 'styled-components'
import { cssVarsTypography, media, typography } from '@rightpoint/core/styles'
import { QuoteVariants } from './Quote.component'

export const QuoteStyles = {
    Quote: styled.div`
        text-align: center;
    `,
    Eyebrow: styled(typography.FoundersB100)`
        margin-bottom: 30px;
        ${cssVarsTypography.linkColor}
        ${media('md')} {
            margin-bottom: 60px;
        }
    `,

    Text: styled.div<{ $variant?: QuoteVariants }>`
        ${cssVarsTypography.textColor}

        ${({ $variant }) => {
            switch ($variant) {
                case 'Large': {
                    return css`
                        ${typography.RecklessH500Css}
                    `
                }
                default: {
                    return css`
                        ${typography.RecklessH500StaticCss}
                    `
                }
            }
        }}

        ${media('xs', 'md')} {
            font-size: 2.5rem;
            line-height: 1.2;
            padding: 0 20px;
        }
    `,
    Name: styled(typography.FoundersB100)`
        margin-top: 30px;
        ${media('md')} {
            margin-top: 60px;
        }
        ${cssVarsTypography.textColor}
    `,
    JobTitle: styled(typography.FoundersB200)`
        ${cssVarsTypography.textColor}
    `,
    Link: styled.div`
        margin-top: 30px;
        ${media('md')} {
            margin-top: 60px;
        }
    `,
}
