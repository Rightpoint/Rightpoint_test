import Head from 'next/head'
import { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { useScrollToTextWithHash } from '@rightpoint/core/utils'
import { store } from '@rightpoint/core/redux'
import { LayoutWithNavbar } from '@rightpoint/core/components'
import { GlobalStyle, theme } from '@rightpoint/core/styles'
import {
    GlobalContext,
    GlobalContextDefaultValue,
} from '@rightpoint/core/context'
import { ThemeProvider } from 'styled-components'
// global css imports can only appear in app.tsx

import '@rightpoint/web/public/fonts/reckless/stylesheet.css'
import '@rightpoint/web/public/fonts/founders-grotesk/stylesheet.css'

import { AppPreviewLinks } from '../app-document/app/AppPreviewLinks'
import { AllPageProps } from '@rightpoint/core/next-contentful/mappers/all-mappers/mapper.interface'
import { OneTrustScript, GoogleAdwardScript } from '@rightpoint/core/scripts'
import TagManager from 'react-gtm-module'
import { useEffect } from 'react'
import { AppInsightsProvider } from '@rightpoint/app-insights'

import Modal from 'react-modal'

import whatInput from 'what-input'
import { Favicons } from '../app-document/head/Favicons'

type CustomAppProps = AllPageProps<any> & AppProps

/**
 * Set modal app element, to hide
 */
try {
    Modal.setAppElement('#main')
} catch (ex) {
    console.error('Error setting modal app root', ex)
}

const CustomApp = ({ Component, pageProps }: CustomAppProps) => {
    useScrollToTextWithHash()

    useEffect(() => {
        // enable what-input to detect keyboard vs mouse
        whatInput.ask()

        // initialize Google Tag Manager
        TagManager.initialize({ gtmId: 'GTM-NSQPLFD' })
    }, [])

    return (
        <AppInsightsProvider>
            <GlobalStyle />
            <Head>
                <title>Rightpoint</title>
                <Favicons key="favicons" />
            </Head>
            <OneTrustScript />
            <GoogleAdwardScript />
            <ThemeProvider theme={theme}>
                <GlobalContext.Provider
                    value={
                        pageProps.pageGlobalsProps || GlobalContextDefaultValue
                    }
                >
                    <Provider store={store}>
                        <AppPreviewLinks pageProps={pageProps} />
                        <LayoutWithNavbar>
                            {/* the Next.js Page */}
                            <Component {...pageProps} />
                        </LayoutWithNavbar>
                        {/* this is for accessibility -- modals get injected here */}
                        <div id="modals"></div>
                    </Provider>
                </GlobalContext.Provider>
            </ThemeProvider>
        </AppInsightsProvider>
    )
}

export default CustomApp
