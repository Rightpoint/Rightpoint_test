import { NextPage } from 'next'
import { useRouter } from 'next/router'
import {
    BackgroundColors,
    Button,
    contentfulRichTextToReact,
    FallbackLoading,
    Header,
    RichText,
    RootComponent,
} from '@rightpoint/core/components'
import { Asset } from 'contentful'
import { FC, ReactNode } from 'react'
import { getConfigsManager } from '../../next-contentful/mappers/registry/all-configs'
import { Document } from '@contentful/rich-text-types'
import { Components } from '../../next-contentful-renderer'
import { PardotThankYouStyles as s } from './PardotThankYou.styles'
import { Seo } from '../common/Seo/Seo.component'
import { GetPardotThankYouStaticProps } from './PardotThankYou.server'
import { ComponentPropsWithMeta } from '../../next-contentful'

export type PardotThankYouProps = {
    landingPageTitle?: string
    successPageText?: ReactNode
    successPageDocument?: Document
    successComponents?: ComponentPropsWithMeta[]
    files: Asset[]
}

export const PardotThankYou: NextPage<GetPardotThankYouStaticProps> = ({
    pageProps,
    seoProps,
    landingPageProps,
}) => {
    const router = useRouter()
    if (router.isFallback) {
        return (
            <>
                <FallbackLoading />
            </>
        )
    }
    return (
        <s.PardotThankYou>
            {seoProps && <Seo {...seoProps} />}
            <Header
                backgroundColor={BackgroundColors.Coral}
                headerTextProps={{
                    typewriterProps: {
                        texts: [
                            'Thanks for your interest!',
                            'Your download is ready...',
                        ],
                    },

                    title: 'Please click the download link below',
                }}
                backgroundPosition={'top'}
                multiMediaProps={landingPageProps.pageProps.multiMediaProps}
                renderContentBelow={() => (
                    <>{landingPageProps.pageProps.title}</>
                )}
            />
            {pageProps.files ? (
                <RootComponent>
                    <DownloadButton
                        cta={'Download Files'}
                        files={pageProps.files}
                    />
                </RootComponent>
            ) : (
                <div>No files found. Please contact administrators.</div>
            )}
            {/* This should be handled via prepareUnsafeJsonProps
            but automatic handling doesn't exist on the page level. */}
            <RichText
                body={contentfulRichTextToReact(
                    pageProps.successPageDocument,
                    getConfigsManager()
                )}
                style={{
                    textAlign: 'center',
                }}
            />
            <Components componentsProps={pageProps.successComponents} />
        </s.PardotThankYou>
    )
}

interface DownloadButtonProps {
    cta?: string
    files: Asset[]
}
const DownloadButton: FC<DownloadButtonProps> = ({ cta, files }) => {
    return (
        <>
            {files.map((file, index) => {
                const url = file.fields.file.url
                return (
                    <Button
                        buttonProps={{
                            as: 'a',
                            download: '',
                            href: url,
                            target: '_blank',
                            rel: 'noopener noreferrer',
                        }}
                        key={index}
                    >
                        Download File
                    </Button>
                )
            })}
        </>
    )
}
