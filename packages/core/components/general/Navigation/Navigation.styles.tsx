import styled, { css } from 'styled-components'
import {
    cssVarNames,
    cssVarsTypography,
    cssVarsTypographyValues,
    cssVarUtils,
    FontWeights,
    media,
    typography,
} from '@rightpoint/core/styles'

const Navigation = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 100px 0;
`

const mediaStack = media('xs', 'sm')

const Link = styled(typography.H3).attrs({
    as: 'a',
    $reset: 'a',
    $fontFamily: 'sans',
    $fontWeight: FontWeights.Light,
    $fontSmoothing: 'subpixel-antialiased',
})`
    ${mediaStack} {
        font-size: 1.4rem;
        font-weight: ${FontWeights.Normal};
        letter-spacing: 0;
    }
    ${cssVarsTypography.textColor}
`

const ItemWrapper = styled.div`
    display: inline-block;

    ${mediaStack} {
        display: block;
    }

    &:not(:last-child) {
        margin-bottom: 2px;
    }
`

const Item = styled.div<{ isActive?: boolean }>`
    padding: 0.4em 1em;
    display: inline-block;
    position: relative;
    ${Link} {
        transition: color 0.3s ease 0s;
        &:hover {
            ${cssVarsTypography.linkColor}
        }
    }
    ${(props) =>
        props.isActive &&
        css`
            ${Link} {
                ${cssVarsTypography.linkColor}
            }
            &:after {
                content: '';
                position: absolute;
                bottom: 0.5em;
                left: 1.2em;
                right: 1.2em;
                height: 1px;
                background: ${cssVarsTypographyValues.getAccentColor()};
            }
        `}
`

const ItemActiveUnderline = styled.div`
    height: 1px;
    position: absolute;
    bottom: 0.4em;
    left: 20px;
    right: 20px;
    background: ${({ theme }) => theme.colors.coral};
`

const Container = styled.div`
    width: 100%;
    margin: 0 auto;

    ${media('md')} {
        width: 80%;
    }
`

const Divider = styled.div`
    ${typography.H3Css}
    font-weight: ${FontWeights.Light};
    display: inline-block;
    -webkit-font-smoothing: antialiased;

    ${cssVarsTypography.textColor}

    ${mediaStack} {
        display: none;
    }
`

export const NavigationStyles = {
    Navigation,
    Item,
    ItemWrapper,
    Link,
    Container,
    Divider,
    ItemActiveUnderline,
}
