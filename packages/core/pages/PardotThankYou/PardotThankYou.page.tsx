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
    ThoughtHeader,
} from '@rightpoint/core/components'
import { Asset } from 'contentful'
import { FC, ReactNode } from 'react'
import { getConfigsManager } from '../../next-contentful/mappers/registry/all-configs'
import { Document } from '@contentful/rich-text-types'
import { Components } from '../../next-contentful-renderer'
import { PardotThankYouStyles as s } from './PardotThankYou.styles'
import { Seo } from '../seo/Seo/Seo.component'
import { GetPardotThankYouStaticProps } from './PardotThankYou.server'
import { ComponentPropsWithMeta } from '../../next-contentful'
import { typography } from '@rightpoint/core/styles'

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
    const { files } = pageProps
    return (
        <s.PardotThankYou>
            {seoProps && <Seo {...seoProps} />}
            <s.Message>
                <typography.FoundersH300 as={'h1'}>
                    Thanks for your interest!
                </typography.FoundersH300>
                <typography.FoundersB100>
                    Your download {files.length > 1 ? 's are ' : ' is'} ready.
                </typography.FoundersB100>
            </s.Message>

            {/* <Header
                headerTextProps={{
                    typewriterProps: {
                        texts: [
                            'Thanks for your interest!',
                            'Your download is ready...',
                        ],
                    },

                    title: 'Please click the download link below',
                }}
                multiMediaProps={landingPageProps.pageProps.multiMediaProps}
                renderContentBelow={() => (
                    <>{landingPageProps.pageProps.title}</>
                )}
            /> */}

            {files ? (
                <RootComponent>
                    <DownloadButtons
                        cta={'Download Files'}
                        files={pageProps.files}
                    />
                </RootComponent>
            ) : (
                <div>No files found. Please contact administrators.</div>
            )}
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
const DownloadButtons: FC<DownloadButtonProps> = ({ cta, files }) => {
    return (
        <>
            {files.map((file, index) => {
                const url = file.fields?.file?.url
                return (
                    <s.Button key={index}>
                        {/* <div>{file.fields.title}</div>
                        <br /> */}
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
                )
            })}
        </>
    )
}
