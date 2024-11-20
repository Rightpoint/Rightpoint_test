import { createGlobalStyle } from 'styled-components'
import { defaultCssVarValues } from '../css-vars/var-values'
import { media } from '../responsive/media-queries'
import { typography } from '../typography/typography'
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
    // html & body
    ${htmlBodyCss}

    // focus what-intent
    ${focusCss}

    [data-cursor-text] {
        // cursor: pointer;
    }

`
