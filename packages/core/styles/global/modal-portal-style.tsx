import { css } from 'styled-components'
import { zIndexes } from '../misc/z-indexes'
import { media } from '../responsive/media-queries'

export const modalPortalStyleCss = css`
    .PardotModalPortal {
        .ReactModal__Overlay {
            transition: opacity 0.3s ease-in-out;
            opacity: 0;
            &.ReactModal__Overlay--after-open {
                opacity: 1;
                .ReactModal__Content {
                    opacity: 1;
                }
            }
            &.ReactModal__Overlay--before-close {
                opacity: 0;
                .ReactModal__Content {
                    opacity: 0;
                }
            }
        }
        .ReactModal__Content {
            opacity: 0;
            transition: opacity 0.4s ease-in-out;
            transition-delay: 0.2s;
            inset: 20px !important;
            ${media('xs', 'mobileXs')} {
                inset: 5px !important;
            }
            ${media('md')} {
                inset: 40px !important;
            }

            ${media('lg')} {
                inset: 80px !important;
            }
            ${media('xxl')} {
                inset: 100px !important;
            }
        }
    }
    .PardotModalPortal,
    .ReactPortal {
        > * {
            z-index: ${zIndexes.modal};
        }
    }
    .NavbarPopupPortal {
        > * {
            z-index: ${zIndexes.navbarPopupModal};
        }
    }
`
