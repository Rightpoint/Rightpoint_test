import { NextPage } from 'next'
import { useRouter } from 'next/router'
import {
    Button,
    FallbackLoading,
    Header,
    Link,
} from '@rightpoint/core/components'
import { Asset } from 'contentful'
import { FC, ReactNode } from 'react'
import { LandingPageThankYouStyles as s } from './LandingPageThankYou.styles'
import { Seo } from '../seo/Seo/Seo.component'

import type { GetLandingPageThankYouStaticProps } from './LandingPageThankYou.server'

export type LandingPageThankYouProps = {
    title: string
    file?: Asset
}

export const LandingPageThankYouPage: NextPage<
    GetLandingPageThankYouStaticProps
> = ({ pageProps, seoProps }) => {
    const router = useRouter()
    if (router.isFallback) {
        return (
            <>
                <FallbackLoading />
            </>
        )
    }
    const { file, title } = pageProps
    return (
        <s.LandingPageThankYou>
            {seoProps && <Seo {...seoProps} />}
            <s.Content>
                {file ? (
                    <>
                        <Header
                            variant="Header1"
                            eyebrow={`${title}`}
                            title="Thank you!"
                            body="Your download is ready."
                        />

                        <s.DownloadWrapper>
                            <DownloadButton file={pageProps.file} />
                        </s.DownloadWrapper>
                    </>
                ) : (
                    <>
                        <Header
                            variant="Header1"
                            eyebrow={`${title}`}
                            title="Thank you!"
                            body="Thank you for contacting us, we'll be reaching out soon."
                        />
                        <br />
                        <br />
                        <br />
                        <Link href="/solutions" asStyledLink>
                            While you're here, take a quick peek at our
                            solutions!
                        </Link>
                    </>
                )}
            </s.Content>
        </s.LandingPageThankYou>
    )
}

interface DownloadButtonProps {
    file: Asset
}
const DownloadButton: FC<DownloadButtonProps> = ({ file }) => {
    const url = file.fields?.file?.url
    return (
        <>
            <s.Button>
                <Button
                    buttonProps={{
                        as: 'a',
                        href: url,
                        target: '_blank',
                        rel: 'noopener noreferrer',
                    }}
                    data-cursor-text="Download"
                >
                    Download
                </Button>
            </s.Button>
        </>
    )
}
