import styled, { css } from 'styled-components'
import {
    cssVarsTypographyValues,
    media,
    resets,
    typography,
} from '@rightpoint/core/styles'

export const VerticalTabsStyles = {
    VerticalTabs: styled.div<{ $hasHeader?: boolean }>`
        ${({ $hasHeader }) =>
            $hasHeader &&
            css`
                padding-top: 20px;
                margin-top: var(--spacing-vertical);
            `}
    `,
    Tabs: styled.div`
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
    `,
    Tab: styled.button<{ $active: boolean; $inView?: boolean }>`
        ${resets.button}

        cursor: pointer;

        transition: opacity 0.3s ease;
        opacity: 0.6;

        ${({ $active }) =>
            $active &&
            css`
                opacity: 1;
            `}

        ${media('xs', 'md')} {
            transition: opacity 0.7s ease 0s;
            ${({ $inView }) =>
                $inView &&
                css`
                    opacity: 1;
                `};
        }
    `,
    Tab__Title: styled.h4`
        margin: 0;
        color: ${cssVarsTypographyValues.getTextColor()};

        ${media('xs', 'lg')} {
            ${typography.FoundersMH400Css}
            margin-bottom: 14px;
        }

        ${media('lg')} {
            ${typography.FoundersH400Css}
            margin-bottom: 5px;
        }
    `,
    Tab__Body: styled.div`
        color: ${cssVarsTypographyValues.getTextColor()};

        & > *:first-child {
            margin-top: 0;
        }
        & > *:last-child {
            margin-bottom: 0;
        }

        ${media('xs', 'lg')} {
            ${typography.FoundersMB100Css}
        }

        ${media('lg')} {
            ${typography.FoundersB100Css}
        }
    `,
    MediaContent: styled.div`
        height: 100%;
        position: relative;
    `,
    /**
     * This is the component that contains each image
     */
    MediaContent__Item: styled.div<{ $active: boolean }>`
        & > * {
            width: 100%;
            // the image component
            position: sticky;
            top: 100px;
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
    `,
}
