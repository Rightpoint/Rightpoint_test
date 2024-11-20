import styled, { css } from 'styled-components'
import {
    cssVarNames,
    cssVarsTypography,
    media,
    typography,
} from '@rightpoint/core/styles'
import { HeroStyles } from '../../../Hero/Hero.styles'

const UnstackerItem = styled.div<{ $hasHero: boolean }>`
    ${HeroStyles.Hero} {
        margin-top: calc(-1 * var(--hero-font-size));
    }

    ${media('xs', 'sm')} {
        margin-top: -250px;
    }
    ${media('sm', 'md')} {
        margin-top: -100px;
    }
    ${media('md', 'lg')} {
        margin-top: -100px;
    }
    ${media('lg')} {
    }

    // if no hero, then we need to move the content upwards to fill in the whitespace
    ${({ $hasHero }) =>
        $hasHero
            ? css`
                  ${media('xs', 'sm')} {
                      margin-top: -120px;
                  }

                  ${media('sm', 'md')} {
                      margin-top: 0px;
                  }
              `
            : // no hero
              css`
                  margin-top: -300px;
              `}
`

const MediaWrapper = styled.div`
    width: 320px;

    ${media('sm')} {
        width: 450px;
    }

    ${media('md')} {
        width: 600px;
    }
    ${media('lg')} {
        width: 800px;
    }
    margin: 0 auto;
    z-index: 1;
    position: relative;
`

const TextWrapper = styled.div`
    text-align: center;
    max-width: 750px;
    margin: 0 auto;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
`

const Title = styled(typography.H2).attrs({
    $fontFamily: 'serif',
})`
    margin-top: 0.3em;
    margin-bottom: 0.3em;
    ${cssVarsTypography.textColor}
`
const Body = styled(typography.BodyM)`
    margin-top: 1em;
    ${cssVarsTypography.textColor}

    && {
        a {
            color: var(
                ${cssVarNames.content.colorAccent},
                var(${cssVarNames.colors.accent})
            );
        }
    }
`

const Cta = styled.div`
    margin-top: 30px;
`

export const UnstackerItemStyles = {
    UnstackerItem,
    MediaWrapper,
    TextWrapper,
    Title,
    Body,
    Cta,
}
