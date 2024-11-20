import styled, { css } from 'styled-components'
import {
    cssVarNames,
    media,
    typography,
    zIndexes,
} from '@rightpoint/core/styles'

const height = 64

const mediaSmall = media('xs', 'sm')

const HeightPlaceholder = styled.div`
    height: ${height}px;
`
const NavigationBar = styled.div<{ $isSticky: boolean }>`
    height: ${height}px;
    overflow: hidden;

    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    margin-top: -1px;
    border-bottom: 1px solid var(--divider);
    border-top: 1px solid var(--divider);
    background: white;
    gap: 5px;
    ${mediaSmall} {
        gap: 0;
    }
    ${({ $isSticky }) =>
        $isSticky &&
        css`
            position: fixed;
            top: 64px;
            left: 0;
            right: 0;
            z-index: ${zIndexes.stickyNavigationBar};

            // on mobile, shrink it
            ${media('xs', 'sm')} {
                top: 64px;
                height: 30px;
            }
        `}

    ${mediaSmall} {
        padding: 0;
        height: 40px
        text-align: center;
        transition: all .5s ease 0s;
    }
`
const Item = styled(typography.BodyM).attrs({
    $fontFamily: 'sans',
    $reset: 'button',
    as: 'button',
})`
    color: var(${cssVarNames.content.colorText}, inherit);
    &:hover {
        color: ${({ theme }) => theme.colors.coral};
        transition: color 0.15s ease;
        cursor: pointer;
    }
    && {
        padding: 0 10px;

        ${mediaSmall} {
            padding: 0 5px;
        }
    }
`

const ItemPositioner = styled.div`
    position: relative;
`

const ItemActiveUnderline = styled.div`
    height: 1px;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    background: ${({ theme }) => theme.colors.coral};
`

export const NavigationBarStyles = {
    NavigationBar,
    Item,
    ItemPositioner,
    ItemActiveUnderline,
    HeightPlaceholder,
}
