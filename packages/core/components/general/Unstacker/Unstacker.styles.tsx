import styled, { css } from 'styled-components'
import { cssVarNames, media, typography } from '@rightpoint/core/styles'

/**
 * The unstacker takes an array of react components,
 * stacks them on top of each other,
 * and on scroll, unstacks them onto the page, depositing them to their natural target positions
 */
interface UnstackerProps {
    $itemCount: number
    $itemHeight: string
    $debug?: boolean
}
const Unstacker = styled.div<UnstackerProps>`
    position: relative;

    margin-bottom: 300px;
    opacity: 0;

    ${({ $itemCount, $itemHeight }) => css`
        height: calc(${$itemCount} * ${$itemHeight});
    `}

    ${({ $debug }) =>
        $debug &&
        css`
            ${Item} {
                outline: 1px dashed #aaa;
            }
            ${ItemPlaceholder} {
                border-bottom: 1px dotted #aaa;
            }
        `}
`

const Item = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    top: 0;
    left: 0;
    right: 0;
    height: 100vh;
`

const ItemPlaceholder = styled.div``

const Navigation = styled.div`
    position: fixed;
    left: 5px;
    ${media('md')} {
        left: 15px;
    }
    top: 0;
    bottom: 0;
    z-index: 10;
    display: flex;
    flex-direction: column;
    justify-content: center;
`

const NavigationDotClickable = styled.div<{ $active: boolean }>`
    padding: 7px;
    ${media('md')} {
        padding: 10px;
    }

    cursor: pointer;
    position: relative;
    &:hover {
        ${() => css`
            ${NavigationDot} {
                opacity: 0.9;
                background: var(
                    ${cssVarNames.colors.accent},
                    var(${cssVarNames.content.colorAccent})
                );
            }

            ${NavigationText} {
                opacity: 1;
            }
        `}
    }
    ${({ $active }) =>
        $active &&
        css`
            ${NavigationDot} {
                background: var(
                    ${cssVarNames.colors.accent},
                    var(${cssVarNames.content.colorAccent})
                );
            }
        `}
`

const NavigationDot = styled.div`
    border-radius: 100%;
    width: 5px;
    height: 5px;
    background: black;
    transition: background 0.3s ease 0s;
    ${media('md')} {
        width: 8px;
        height: 8px;
    }
`

const NavigationText = styled(typography.BodySSans)`
    position: absolute;
    left: 30px;
    top: 5px;
    white-space: nowrap;
    opacity: 0;
    transition: opacity 0.3s ease 0s;
`

export const UnstackerStyles = {
    Unstacker,
    Item,
    ItemPlaceholder,
    Navigation,
    NavigationDot,
    NavigationDotClickable,
    NavigationText,
}
