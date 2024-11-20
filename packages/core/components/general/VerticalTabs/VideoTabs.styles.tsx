import styled, { css } from 'styled-components'
import {
    cssVarsTypographyValues,
    media,
    typography,
} from '@rightpoint/core/styles'

const Tabs = styled.div`
    display: flex;
    flex-direction: column;
    gap: 105px;

    ${media('xs', 'lg')} {
        margin-top: 50px;
    }

    ${media('lg')} {
        justify-content: center;
        height: 100%;
        gap: 80px;
    }
`

const Tab = styled.div<{ $active: boolean }>`
    cursor: pointer;

    transition: opacity 0.3s ease;
    opacity: 0.4;

    ${({ $active }) =>
        $active &&
        css`
            opacity: 1;
        `}
`

const TabTitle = styled.h4`
    margin: 0;
    color: ${cssVarsTypographyValues.getTextColor()};

    ${media('xs', 'lg')} {
        ${typography.FoundersMH400Css}
        margin-bottom: 14px;
    }

    ${media('lg')} {
        ${typography.FoundersH400Css}
    }
`

const TabDescription = styled.div`
    color: ${cssVarsTypographyValues.getTextColor()};

    ${media('xs', 'lg')} {
        ${typography.FoundersMB100Css}
    }

    ${media('lg')} {
        ${typography.FoundersB100Css}
    }
`

const MediaContent = styled.div`
    height: 100%;
    position: relative;
`

const MediaContentItem = styled.div<{ $active: boolean }>`
    & > * {
        width: 100%;
    }

    transition: opacity 0.3s ease;

    ${media('xs', 'lg')} {
        ${({ $active }) =>
            $active
                ? css``
                : css`
                      display: none;
                  `}
    }

    ${media('lg')} {
        position: absolute;
        inset: 0;

        height: 100%;
        width: 100%;

        display: flex;
        align-items: flex-start;
        justify-content: center;

        ${({ $active }) =>
            $active
                ? css`
                      opacity: 1;
                      z-index: 1;
                  `
                : css`
                      opacity: 0;
                      pointer-events: none;
                  `}
    }
`

export const VideoTabsStyles = {
    Tabs,
    Tab,
    TabTitle,
    TabDescription,
    MediaContent,
    MediaContentItem,
}
