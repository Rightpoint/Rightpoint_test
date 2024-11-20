import { NextPage } from 'next'
import { useRouter } from 'next/router'
import {
    Button,
    contentfulRichTextToReact,
    FallbackLoading,
    RichText,
    RootComponent,
} from '@rightpoint/core/components'
import { Asset } from 'contentful'
import { FC, ReactNode } from 'react'
import { Components } from '../../next-contentful-renderer'
import { PardotThankYouStyles as s } from './PardotThankYou.styles'
import { Seo } from '../seo/Seo/Seo.component'
import { typography } from '@rightpoint/core/styles'
import type { Document } from '@contentful/rich-text-types'
import type { GetPardotThankYouStaticProps } from './PardotThankYou.server'
import type { ComponentPropsWithMeta } from '../../next-contentful'

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
                    Your download{files.length > 1 ? 's are ' : ' is'} ready.
                </typography.FoundersB100>
            </s.Message>

            {/*
                
                <Header
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
                /> 
            
            */}

            {files ? (
                <>
                    <RootComponent>
                        <DownloadButtons
                            cta={'Download Files'}
                            files={pageProps.files}
                        />
                    </RootComponent>
                    <p>Notes:</p>
                    <p>Auto download TBD</p>
                    <p>
                        This page has access to all landing page data, to
                        populate recommended reading, work, etc.
                    </p>
                    <p>
                        Arbitrary components can be manually specified as well,
                        via Pardot Success Components
                    </p>
                </>
            ) : (
                <div>No files found. Please contact administrators.</div>
            )}
            <RichText
                body={contentfulRichTextToReact(pageProps.successPageDocument)}
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
