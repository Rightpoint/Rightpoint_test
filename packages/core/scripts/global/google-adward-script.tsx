import { FC } from 'react'
import Script from 'next/script'

export const GoogleAdwardScript: FC<{}> = ({}) => {
    return (
        <>
            <div className="container">
                <Script
                    src="https://www.googletagmanager.com/gtag/js?id=AW-1072707079"
                    strategy="afterInteractive"
                />
                <Script id="google-analytics" strategy="afterInteractive">
                    {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'AW-1072707079');
        `}
                </Script>
            </div>
        </>
    )
}
