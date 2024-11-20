import Script from 'next/script'

export const GoogleUAScript = () => {
    /**
     * This product will be sunset in June/July 2023
     */
    const UNIVERSAL_ANALYTICS_ID = 'UA-2890028-2'
    return (
        <>
            <Script
                src={`https://www.googletagmanager.com/gtag/js?id=${UNIVERSAL_ANALYTICS_ID}`}
                strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
                {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){window.dataLayer.push(arguments);}
                gtag('js', new Date());

                gtag('config', '${UNIVERSAL_ANALYTICS_ID}');
            `}
            </Script>
        </>
    )
}
