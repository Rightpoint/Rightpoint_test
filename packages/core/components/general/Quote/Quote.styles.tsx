import styled, { css } from 'styled-components'
import {
    cssVarsTypography,
    cssVarsTypographyValues,
    FontWeights,
    media,
    typography,
} from '@rightpoint/core/styles'
import { QuoteVariants } from './Quote.component'

const Text = styled(typography.H2)`
    ${cssVarsTypography.textColor}
`

const Quote = styled.div<{ $variant?: QuoteVariants }>`
    text-align: center;

    ${Text} {
        ${({ $variant }) => {
            switch ($variant) {
                case 'Large': {
                    return typography.H2Css
                }
                default: {
                    return css`
                        ${typography.H4Css}
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

const Name = styled(typography.BodySSans)`
    margin-top: 60px;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    margin-bottom: 0.25em;

    ${cssVarsTypography.textColor}
`

const JobTitle = styled(typography.BodyS).attrs({
    $fontWeight: FontWeights.Bold,
})`
    ${cssVarsTypography.linkColor}
`

export const QuoteStyles = {
    Quote,
    Text,
    Name,
    JobTitle,
}
