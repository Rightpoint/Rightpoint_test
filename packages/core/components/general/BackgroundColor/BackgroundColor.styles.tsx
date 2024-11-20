import styled, { css } from 'styled-components'
import { colors } from '@rightpoint/core/variables'
import { cssVarNames, zIndexes } from '@rightpoint/core/styles'

export enum BackgroundColors {
    None = 'None',
    Black = 'Black',
    DarkGrey = 'DarkGrey',
    Coral = 'Coral',
    Teal = 'Teal',
    Green = 'Green',
    LightGrey = 'LightGrey',
}

export type BackgroundColorDefinition = {
    backgroundColorCss: string
    text?: string
    textAlternateColor?: string
    accentColor?: string
    dividerColor?: string
}

type BackgroundColorDefinitions = {
    [key in BackgroundColors]: BackgroundColorDefinition
}

/**
 * Define what background colors can be used, and how it affects
 * child colors within the bg component
 */
export const backgroundColorDefinitions: BackgroundColorDefinitions = {
    [BackgroundColors.None]: {
        backgroundColorCss: 'transparent',
        text: 'black',
    },
    [BackgroundColors.Black]: {
        backgroundColorCss: '#000',
        text: 'white',
        dividerColor: '#333',
    },
    [BackgroundColors.Coral]: {
        backgroundColorCss: colors.coral,
        accentColor: colors.white,
        dividerColor: colors.black,
    },
    // these are for case studies.
    // we should probably separate content colors from the actual background color
    // so that we can specify more arbitrary BG + content color.
    [BackgroundColors.Teal]: {
        backgroundColorCss: colors.teal,
    },
    [BackgroundColors.Green]: {
        backgroundColorCss: colors.green,
    },
    [BackgroundColors.DarkGrey]: {
        backgroundColorCss: '#141317',
        text: 'white',
        dividerColor: '#333',
    },
    [BackgroundColors.LightGrey]: {
        backgroundColorCss: '#E5E5E5',
    },
}

const getDefinition = (color: BackgroundColors): BackgroundColorDefinition =>
    backgroundColorDefinitions[color] ||
    backgroundColorDefinitions[BackgroundColors.None]

const Occluder = styled.div<{ $backgroundColor: BackgroundColors }>`
    position: fixed;
    z-index: ${zIndexes.backgroundOccluder};
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    transition: background-color 0.3s ease 0s;
    pointer-events: none;
    ${({ $backgroundColor }) =>
        css`
            background: ${getDefinition($backgroundColor).backgroundColorCss};
        `}
`

const Content = styled.div``

const Half = styled.div<{ $direction?: 'top' | 'bottom' }>`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 50%;
    background: var(${cssVarNames.content.background});

    ${({ $direction }) => {
        if ($direction === 'top') {
            return css`
                top: 0;
                bottom: 50%;
                // hack: iframe renders a gap
                transform: translateY(-3px);
            `
        }
        if ($direction === 'bottom') {
            return css`
                top: 50%;
                bottom: 0;
                // hack: iframe renders a gap
                transform: translateY(3px);
            `
        }
    }}
`

export const BackgroundColorStyles = {
    Occluder,
    Content,
    Half,
}
