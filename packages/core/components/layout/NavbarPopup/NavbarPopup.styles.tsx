import styled, { css } from 'styled-components'
import {
    cssRemoveScrollbar,
    icons,
    media,
    resets,
    typography,
    zIndexes,
} from '@rightpoint/core/styles'
import { colors } from '@rightpoint/core/variables'
import { GrClose } from 'react-icons/gr'

const fragments = {
    overflow: css`
        ${media('xs', 'md')} {
            overflow: auto;
        }
        -webkit-overflow-scrolling: touch;
        overflow: scroll;
    `,
}

export const NavbarPopupStyles = {
    NavbarPopup: styled.div`
        position: fixed;
        top: 0;
        left: 0;
        right: 0;

        min-height: 100%;

        transform: translate3d(0, 0, 0); // set fixed context

        z-index: ${zIndexes.navbarPopup};

        --local-text-color: rgba(255, 255, 255, 0.4);
        --local-tier2-text-color: rgba(255, 255, 255, 0.4);
        --local-background-color: ${colors.black};
        background: var(--local-background-color);

        ${cssRemoveScrollbar}
        ${fragments.overflow}

        
        width: 100%;

        overflow-x: hidden;
        overflow-y: scroll;
        max-height: 100vh;
    `,
    Content: styled.div`
        max-width: 800px;
        height: 100%;
    `,
    ContentInner: styled.div`
        position: relative;
        display: flex;
        height: 100%;
    `,
    Close: styled.button`
        ${resets.button}
        ${typography.utils.getFontFamily('sans')}
    font-weight: 400;
        font-size: 1.4rem;
        line-height: 150%;

        position: fixed;
        top: 21px;
        right: 56px;
        cursor: pointer;
        z-index: 3;

        ${media('md')} {
            top: 49px;
            right: 51px;

            display: flex;
            align-items: center;
            justify-content: flex-end;

            &:hover {
                opacity: 0.5;
            }

            transition: opacity 0.3s ease;
        }
    `,
    CloseIcon: styled(GrClose)`
        ${media('xs', 'md')} {
            display: none;
        }
        margin-left: 16px;
        height: 17px;
        width: 17px;

        path {
            stroke: inherit;
        }
    `,
    Logo: styled(icons.Logo)``,
    LogoWrapper: styled.div`
        ${media('xs', 'md')} {
            display: none;
        }
        position: absolute;
        z-index: 1;
        top: 38px;
        left: 27px;
    `,
}
