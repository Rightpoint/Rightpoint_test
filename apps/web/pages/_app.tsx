import Head from 'next/head'
import { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { useScrollToTextWithHash } from '@rightpoint/core/utils'
import { store } from '@rightpoint/core/redux'
import { LayoutWithNavbar } from '@rightpoint/core/components'
import {
    GlobalStyle,
    configureAtomicLayout,
    theme,
} from '@rightpoint/core/styles'
import {
    GlobalContext,
    GlobalContextDefaultValue,
    type GlobalContextProps,
} from '@rightpoint/core/context'
import { ThemeProvider } from 'styled-components'
// global css imports can only appear in app.tsx
import '@rightpoint/web/public/fonts/riforma/stylesheet.css'
import '@rightpoint/web/public/fonts/reckless/stylesheet.css'
import '@rightpoint/web/public/fonts/founders-grotesk/stylesheet.css'
import { AppPreviewLinks } from '../app-document/app/AppPreviewLinks'
import { AllPageProps } from '@rightpoint/core/next-contentful/mappers/all-mappers/mapper.interface'
// import { PreloadFonts } from '../head/PreloadFonts'

configureAtomicLayout()

type CustomAppProps = AllPageProps<any> & AppProps

const CustomApp = ({ Component, pageProps }: CustomAppProps) => {
    useScrollToTextWithHash()

    return (
        <>
            <GlobalStyle />
            <Head>
                <title>Rightpoint</title>
            </Head>
            <ThemeProvider theme={theme}>
                <GlobalContext.Provider
                    value={
                        pageProps.pageGlobalsProps || GlobalContextDefaultValue
                    }
                >
                    <Provider store={store}>
                        <AppPreviewLinks pageProps={pageProps} />
                        <LayoutWithNavbar>
                            <Component {...pageProps} />
                        </LayoutWithNavbar>
                    </Provider>
                </GlobalContext.Provider>
            </ThemeProvider>
        </>
    )
}

export default CustomApp
