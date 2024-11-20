import Document, {
    DocumentContext,
    Html,
    Head,
    Main,
    NextScript,
} from 'next/document'
import { ServerStyleSheet } from 'styled-components'
import Script from 'next/script'

export default class MyDocument extends Document {
    /**
     * SSR styled-components
     */
    static async getInitialProps(ctx: DocumentContext) {
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
                styles: [initialProps.styles, sheet.getStyleElement()],
            }
        } finally {
            sheet.seal()
        }
    }
    render() {
        const nonce = 'test123'
        return (
            <Html lang="en">
                <Head />

                <body>
                    <Main />
                    <NextScript nonce={nonce} />
                    {/*  
                        WARNING: DO NOT MOVE
                        ---------------------
                        BeforeInteractive Scripts MUST be placed here.
                        Importing from another component will cause these scripts to fail or behave unexpectedly.

                        E.g. do not import a React component that outputs <Script strategy="beforeInteractive" />
                    */}
                    {/* 
                        OneTrust intercepts HTML before Next.js or React hydration.
                        WARNING: Altering DOM beforeInteractive will cause hydration failures forcing whole app re-render
                    */}
                    <Script
                        id="OtAutoBlock"
                        strategy="beforeInteractive"
                        nonce={nonce}
                        src="https://cdn.cookielaw.org/consent/05c6c5ec-e07e-4744-a3a7-8effc03fd03b/OtAutoBlock.js"
                    />
                    <Script
                        id="OtAutoBlock2"
                        strategy="beforeInteractive"
                        src="https://cdn.cookielaw.org/scripttemplates/otSDKStub.js"
                        data-charset="UTF-8"
                        nonce={nonce}
                        data-domain-script="05c6c5ec-e07e-4744-a3a7-8effc03fd03b"
                    />
                    {/* 
                        This is a function that is called when OneTrust changes.
                    */}
                    <Script
                        id="show-banner"
                        nonce={nonce}
                        strategy="beforeInteractive"
                    >{`
                        window.OptanonWrapper = function() {
                        }
                    `}</Script>
                </body>
            </Html>
        )
    }
}
