import styled, { css } from 'styled-components'
import {
    icons,
    media,
    resets,
    typography,
    zIndexes,
} from '@rightpoint/core/styles'
import { colors } from '@rightpoint/core/variables'
import { GrClose } from 'react-icons/gr'

const NavbarPopup = styled.div`
    z-index: ${zIndexes.navbarPopup};

    transform: translate3d(0, 0, 0); // set fixed context
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    overflow-y: scroll;
    overflow-x: hidden;
    -webkit-overflow-scrolling: touch;

    color: ${colors.white};
`

const Blur = styled.div`
    // backdrop filter is expensive, and only in latest chrome, not in FF. It's a 2022 thing.
    // instead, inject a global style and apply filter on the entire site.

    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    background: rgba(0, 0, 0, 0.8);

    z-index: ${zIndexes.navbarPopup};
`

const Content = styled.div`
    max-width: 800px;
    height: 100%;
`

const ContentInner = styled.div`
    position: relative;
    display: flex;
    height: 100%;
`

const Close = styled.button`
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
`

const CloseIcon = styled(GrClose)`
    ${media('xs', 'md')} {
        display: none;
    }
    margin-left: 16px;
    height: 17px;
    width: 17px;

    path {
        stroke: inherit;
    }
`

const Logo = styled(icons.Logo)``

const LogoWrapper = styled.div`
    ${media('xs', 'md')} {
        display: none;
    }
    position: absolute;
    z-index: 1;
    top: 38px;
    left: 27px;
`
const CloseButtonContainer = styled.div`
    position: relative;
    margin: auto;
    width: 50px;
    height: 50px;
    margin-top: 100px;
    cursor: pointer;
`

const CloseButtonLeft = styled.div`
    height: 4px;
    width: 50px;
    position: absolute;
    margin-top: 24px;
    background-color: white;
    border-radius: 2px;
    transform: rotate(-45deg);
    transition: all 0.3s ease-in;
`
const CloseButtonRight = styled.div`
    height: 4px;
    width: 50px;
    position: absolute;
    margin-top: 24px;
    background-color: white;
    border-radius: 2px;
    transform: rotate(45deg);
    transition: all 0.3s ease-in;
`

export const NavbarPopupStyles = {
    NavbarPopup,
    Content,
    ContentInner,
    Close,
    Blur,
    CloseIcon,
    Logo,
    LogoWrapper,
    CloseButtonLeft,
    CloseButtonRight,
    CloseButtonContainer,
}
