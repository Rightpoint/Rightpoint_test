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

import '@rightpoint/web/public/fonts/reckless/stylesheet.css'
import '@rightpoint/web/public/fonts/founders-grotesk/stylesheet.css'

import { AppPreviewLinks } from '../app-document/app/AppPreviewLinks'
import { AllPageProps } from '@rightpoint/core/next-contentful/mappers/all-mappers/mapper.interface'
import { GoogleAdwordsScript } from '@rightpoint/core/scripts'
import TagManager from 'react-gtm-module'
import { Fragment, useEffect } from 'react'
import { AppInsightsProvider } from '@rightpoint/app-insights'
import Modal from 'react-modal'

import whatInput from 'what-input'
import { Favicons } from '../app-document/head/Favicons'
import { Analytics as VercelAnalytics } from '@vercel/analytics/react'
import { ContentfulLivePreviewInPreviewMode } from '../app-document/app/ContentfulLivePreview'

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

        // initialize Google Tag Manager.
        // note: this respects OneTrust cookie consent and does not inject on Opt-In countries
        // TagManager.initialize({ gtmId: 'GTM-NSQPLFD' })
    }, [])

    return (
        <>
            <GlobalStyle />
            <Head>
                <title>Rightpoint</title>
                <Favicons key="favicons" />
            </Head>
            <AppInsightsProvider>
                <ThemeProvider theme={theme}>
                    <GlobalContext.Provider
                        value={
                            pageProps.pageGlobalsProps ||
                            GlobalContextDefaultValue
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

                            {/* enables live preview mode */}
                            <ContentfulLivePreviewInPreviewMode />
                        </Provider>
                    </GlobalContext.Provider>
                    {/* 
                        End of global context provider.
                        Anything relying on GlobalContext should be above here.                        
                    */}
                </ThemeProvider>
            </AppInsightsProvider>

            <VercelAnalytics />
        </>
    )
}

export default CustomApp
