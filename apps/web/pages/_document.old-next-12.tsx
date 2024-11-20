/* eslint-disable react/display-name */
import { ReactElement } from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'
// import { PreloadFonts } from '../app-document/head/PreloadFonts'

export default class CustomDocument extends Document<{
    styleTags: ReactElement[]
}> {
    /**
     * Ensure styled-components works with SSR
     */
    static async getInitialProps(ctx) {
        const sheet = new ServerStyleSheet()
        const originalRenderPage = ctx.renderPage
        try {
            ctx.renderPage = () =>
                originalRenderPage({
                    enhanceApp: (App) => (props) =>
                        sheet.collectStyles(<App {...props} />),
                })
            const initialProps = await Document.getInitialProps(ctx)
            return {
                ...initialProps,
                styles: (
                    <>
                        {initialProps.styles}
                        {sheet.getStyleElement()}
                    </>
                ),
            }
        } finally {
            sheet.seal()
        }
    }

    render() {
        return (
            <Html>
                <Head>
                    {this.props.styleTags}
                    {/* 
                        Font preload requires webpack modification.
                        See comment:
                        <PreloadFonts /> 
                    */}
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}
