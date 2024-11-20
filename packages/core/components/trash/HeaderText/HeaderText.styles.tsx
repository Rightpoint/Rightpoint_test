import styled, { css } from 'styled-components'
import {
    cssVarsTypography,
    FontWeights,
    media,
    typography,
} from '@rightpoint/core/styles'
import { HeaderVariants } from './HeaderText.types'

const handleVariant = (variant: HeaderVariants) => {
    switch (variant) {
        case HeaderVariants.Typewriter:
            return css`
                ${Title} {
                    ${typography.utils.getFontFamily('sans')}
                }
            `
        case HeaderVariants.CaseStudy:
            return css`
                ${Title} {
                    ${typography.utils.getFontFamily('serif')};
                    ${typography.utils.fontFeatureSettings.recklessHeader};
                    ${media('xs', 'md')} {
                        font-size: 2.4rem;
                    }
                }
            `
        default:
            return css``
    }
}

const Header = styled.div<{ $variant?: any }>`
    text-align: center;
    ${({ $variant }) => handleVariant($variant)}
    ${cssVarsTypography.textColor}
`

const Title = styled(typography.H3).attrs({
    $fontWeight: FontWeights.Light,
    $fontFamily: 'sans', // only serif on case study
})<{ $creditsMargin: boolean }>`
    ${media('xs', 'sm')} {
        ${typography.H4Css}
    }

    ${({ $creditsMargin }) =>
        $creditsMargin &&
        css`
            margin-bottom: 1em;
            ${media('md')} {
                margin-bottom: 0.9em;
            }
        `}
`

const TextWrapper = styled.div`
    margin-left: auto;
    margin-right: auto;

    padding: 0 40px;

    ${media('md', 'sm')} {
        max-width: 700px;
        padding: 0;
    }
`

const Credit = styled(typography.BodyS)``

const CreditName = styled.div`
    ${typography.utils.getFontFamily('sans')};
    text-transform: uppercase;
    letter-spacing: 0.1em;

    margin-bottom: 1px;
    ${media('md')} {
        margin-bottom: 0.5em;
    }
`

const CreditTitle = styled.div``

const CreditLink = styled(typography.LinkS)``

const Cta = styled(typography.BodyM).attrs({
    $fontFamily: 'serif',
    $reset: 'a',
})`
    display: inline-block;
    text-decoration: underline;
    margin-top: 20px;
    ${media('md')} {
        margin-top: 45px;
    }
`

export const HeaderTextStyles = {
    Header,
    Title,
    TextWrapper,
    Credit,
    CreditName,
    CreditTitle,
    CreditLink,

    Cta,
}
