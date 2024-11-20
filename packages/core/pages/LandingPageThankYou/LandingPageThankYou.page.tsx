import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { Button, FallbackLoading, Header } from '@rightpoint/core/components'
import { Asset } from 'contentful'
import { FC, ReactNode } from 'react'

import { LandingPageThankYouStyles as s } from './LandingPageThankYou.styles'
import { Seo } from '../seo/Seo/Seo.component'
import { GetLandingPageThankYouStaticProps } from './LandingPageThankYou.server'

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
            <s.Message>
                <Header
                    variant="Header1"
                    eyebrow={`${title}`}
                    title="Thank you!"
                    body="Your download is ready."
                />
            </s.Message>

            {file ? (
                <>
                    <DownloadButton file={pageProps.file} />
                </>
            ) : (
                <div>No files found. Please contact administrators.</div>
            )}

            <div
                style={{
                    marginTop: 300,
                }}
            >
                <p>Notes:</p>
                <p>Auto download TBD</p>
                <p>
                    This page has access to all landing page data, to populate
                    recommended reading, work, etc.
                </p>
            </div>
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
                >
                    Download File
                </Button>
            </s.Button>
        </>
    )
}
