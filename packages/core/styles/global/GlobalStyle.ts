import { createGlobalStyle } from 'styled-components'
import { defaultCssVarValues } from '../css-vars/var-values'
import { media } from '../responsive/media-queries'
import { focusCss } from './focus-styling'
import { htmlBodyCss } from './html-body'

/**
 * Global styles for the application consumed in storybook, next.js, and future applications
 */
export const GlobalStyle = createGlobalStyle`
    * {
        box-sizing: border-box;
    }
    :root {
        ${defaultCssVarValues}

        // containers
        --container-padding: 30px;
        ${media('lg')} {
            --container-padding: 120px;
        }

        --spacing-vertical: 60px;
        ${media('lg')} {
            --spacing-vertical: 120px;
        }
        
    }

    // :where(a) {
    //     text-underline-offset: .2em;
    //     transition: all .3s ease 0s;
    //     &:hover {
    //         text-underline-offset: .4em;
    //     }
    // //     text-decoration: none;
    // }

    // html & body
    ${htmlBodyCss}


    main {
        // do not prevent overflow; stops all sticky
    }

    // focus what-intent
    ${focusCss}

    [data-cursor-text] {
        // cursor: pointer;
    }

`
