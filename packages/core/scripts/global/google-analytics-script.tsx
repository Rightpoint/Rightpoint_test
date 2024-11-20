import { FC } from 'react'
import Script from 'next/script'

export const GoogleAnalyticScript: FC<{}> = ({}) => {
    return (
        <>
            <div className="container">
                <Script id="analytics" strategy="afterInteractive">
                    {`
                      var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-2890028-2']);
_gaq.push(['_trackPageview']);
(function ()
{ var ga = document.createElement('script'); ga.type = 'text/javascript';ga.className = "optanon-category-C0002"; ga.async = true; ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js'; var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s); }
)();
                    `}
                </Script>
            </div>
        </>
    )
}
