import styled, { css } from 'styled-components'
import { cssVarsTypography, media, typography } from '@rightpoint/core/styles'

const HeaderText = styled(typography.BodyL).attrs({
    $fontFamily: 'serif',
})`
    max-width: 1000px;
    margin: 0 auto;
    line-height: 1.5;
    ${media('xs', 'md')} {
        padding: 0 30px;
    }
`

const HeaderLink = styled(typography.BodySSans)<{
    $align?: 'left' | 'right'
}>`
    position: absolute;
    top: 50%;
    display: none;
    ${media('md')} {
        display: block;
    }
    ${cssVarsTypography.textColor};

    ${({ $align }) => {
        if ($align === 'left') {
            return css`
                left: 25px;
                transform: rotate(-90deg);
                transform-origin: top left;
                ${Position} {
                    transform: translateX(-50%);
                }
            `
        }
        if ($align === 'right') {
            return css`
                right: 25px;
                transform: rotate(90deg);
                transform-origin: top right;
                ${Position} {
                    transform: translateX(50%);
                }
            `
        }
    }}
`

const Position = styled.div`
    transform: translateY(50%);
`

const WorkDetailRelated = styled.div`
    display: grid;
`

const RelatedItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: white;
    text-align: center;
    &:before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.7);

        z-index: 0;
    }
    > * {
        position: relative;
        z-index: 1;
    }
`

const Title = styled(typography.H4).attrs({
    $fontFamily: 'sans',
})`
    margin-top: 0.45em;
    margin-bottom: 0.1em;
`

const Subtitle = styled(typography.BodyL)`
    padding: 0 40px;
`

export const WorkDetailPageStyles = {
    WorkDetailRelated,
    RelatedItem,
    HeaderText,
    Title,
    Subtitle,
    HeaderLink,
    Position,
}
