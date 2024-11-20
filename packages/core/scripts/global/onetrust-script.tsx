import { FC } from 'react'
import Script from 'next/script'

export const OneTrustScript: FC<{}> = ({}) => {
    return (
        <>
            <Script
                id="OtAutoBlock"
                strategy="beforeInteractive"
                src="https://cdn.cookielaw.org/consent/05c6c5ec-e07e-4744-a3a7-8effc03fd03b-test/OtAutoBlock.js"
            />
            <Script
                id="OtAutoBlock2"
                strategy="beforeInteractive"
                src="https://cdn.cookielaw.org/scripttemplates/otSDKStub.js"
                data-charset="UTF-8"
                data-domain-script="05c6c5ec-e07e-4744-a3a7-8effc03fd03b-test"
            />
            <Script id="show-banner">{`function OptanonWrapper() { }`}</Script>
        </>
    )
}
