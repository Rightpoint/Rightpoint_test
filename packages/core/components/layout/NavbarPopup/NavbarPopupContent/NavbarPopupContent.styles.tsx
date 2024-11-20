import styled, { css } from 'styled-components'
import { FontWeights, media, typography } from '@rightpoint/core/styles'
import { LinkStyles } from '../../../general/Link/Link.styles'

const NavbarPopupContent = styled.div`
    ${LinkStyles.Anchor} {
        display: inline-block;
        transition: color 0.15s ease 0s;
        &:hover {
            color: ${(props) => props.theme.colors.accent};
        }
    }
`

const SolutionsHeader = styled(typography.H4).attrs({
    $fontWeight: FontWeights.Light,
    $fontFamily: 'sans',
})`
    ${media('xs', 'md')} {
        font-size: 3.4rem;
    }

    @media screen and (max-height: 700px) {
        margin-top: 50px;
    }
`

const SolutionColumn = styled.div`
    ${media('xs', 'md')} {
        margin-bottom: 50px;
    }
`

const SolutionTitle = styled(typography.BodyM).attrs({
    $fontWeight: FontWeights.Bold,
    $fontFamily: 'sans',
})`
    margin-bottom: 0.5em;
    color: rgba(255, 255, 255, 0.6);

    ${media('xs', 'md')} {
        font-size: 1.8rem;
        font-weight: ${FontWeights.Normal};
    }
`

const SolutionItem = styled(typography.BodyM).attrs({
    $fontWeight: FontWeights.Light,
    $fontFamily: 'sans',
})`
    a {
        ${typography.utils.getFontFamily('sans')};

        text-decoration: none;
    }
    ${media('xs', 'md')} {
        margin-left: 30px;
        font-size: 1.8rem;
    }
`
const Tier1Item = styled(typography.H4).attrs({
    $fontWeight: FontWeights.Light,
    $fontFamily: 'sans',
})`
    ${media('xs', 'md')} {
        font-size: 3.4rem;
    }
`

const Divider = styled.div`
    border-top: 1px solid white;
    margin-bottom: 20px;
`

export const NavbarPopupContentStyles = {
    NavbarPopupContent,
    Divider,
    SolutionsHeader,
    SolutionColumn,
    SolutionTitle,
    SolutionItem,
    Tier1Item,
}
