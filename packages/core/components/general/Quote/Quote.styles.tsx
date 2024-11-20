import styled, { css } from 'styled-components'
import {
    cssVarsTypography,
    cssVarsTypographyValues,
    FontWeights,
    media,
    typography,
} from '@rightpoint/core/styles'
import { QuoteVariants } from './Quote.component'

const Text = styled.div`
    ${cssVarsTypography.textColor}
`

const Quote = styled.div<{ $variant?: QuoteVariants }>`
    text-align: center;

    ${Text} {
        ${({ $variant }) => {
            switch ($variant) {
                case 'Large': {
                    return css`
                        ${typography.RecklessH500Css}
                    `
                }
                default: {
                    return css`
                        ${typography.RecklessH500Css}
                    `
                }
            }
        }}

        ${media('xs', 'md')} {
            font-size: 2.5rem;
            line-height: 1.2;
        }
    }
`

const Name = styled(typography.FoundersB100)`
    margin-top: 60px;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    margin-bottom: 0.25em;

    ${cssVarsTypography.textColor}
`

const JobTitle = styled(typography.FoundersB200)`
    ${cssVarsTypography.textColor}
`

export const QuoteStyles = {
    Quote,
    Text,
    Name,
    JobTitle,
}
