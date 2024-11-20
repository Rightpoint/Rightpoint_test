import { NextPage } from 'next'
import { useRouter } from 'next/router'
import {
    BackgroundColors,
    CardsList,
    LinkProps,
    RootComponent,
    type CardProps,
    type MultiMediaProps,
} from '@rightpoint/core/components'
import { ComponentPropsWithMeta } from '@rightpoint/core/next-contentful'
import { WorkDetailHeader } from './components/WorkDetailHeader'
import { Components } from '@rightpoint/core/next-contentful-renderer'
import { Seo } from '../seo/Seo/Seo.component'
import { ReactNode } from 'react'
import { Document } from '@contentful/rich-text-types'
import { AllPageProps } from '../../next-contentful/mappers/all-mappers/mapper.interface'

export type WorkDetailPageProps = {
    title: string

    multiMediaProps: MultiMediaProps
    tagline: string

    intro: ReactNode // can't be done until refactor
    introDocument: Document

    headerLinksProps?: LinkProps[]

    componentsProps: ComponentPropsWithMeta[]
    backgroundColor: string

    relatedWorksProps?: CardProps[]
}

export const WorkDetailPage: NextPage<AllPageProps<WorkDetailPageProps>> = ({
    seoProps,
    pageProps,
}) => {
    const router = useRouter()

    if (router.isFallback) {
        return <>Generating...</>
    }

    const inheritBackgroundColor = (rootProps) => ({
        ...rootProps,
        background: {
            backgroundColor: pageProps.backgroundColor,
        },
    })

    const { relatedWorksProps, componentsProps } = pageProps

    return (
        <>
            {seoProps && <Seo {...seoProps} />}
            <WorkDetailHeader {...pageProps} />
            <Components
                componentsProps={componentsProps}
                transformers={{
                    workDetailMedia: {
                        transformRootProps: inheritBackgroundColor,
                    },
                    componentQuote: {
                        transformRootProps: inheritBackgroundColor,
                    },
                    workDetailImpact: {
                        transformRootProps: inheritBackgroundColor,
                    },
                    componentWorkDetailText: {
                        transformRootProps: (rootProps, props) => {
                            const hasBackground =
                                rootProps.background?.backgroundColor ===
                                'Inherit'
                            return hasBackground
                                ? inheritBackgroundColor(rootProps)
                                : rootProps
                        },
                    },
                }}
            />

            {relatedWorksProps && (
                <RootComponent
                    container={true}
                    background={{
                        backgroundColor: BackgroundColors.Black,
                    }}
                >
                    <CardsList
                        cardsProps={relatedWorksProps}
                        layout="Offset"
                        headerProps={{
                            variant: 'Header3',
                            title: 'Related Work',
                        }}
                    />
                </RootComponent>
            )}
        </>
    )
}
