import { NextPage } from 'next'
import { useRouter } from 'next/router'
import {
    LinkProps,
    WorkDetailMediaProps,
    type CardProps,
    type MultiMediaProps,
} from '@rightpoint/core/components'
import { ComponentPropsWithMeta } from '@rightpoint/core/next-contentful'
import { WorkDetailHeader } from './components/WorkDetailHeader'
import { WorkDetailRelated } from './components/WorkDetailRelated'
import { Components } from '@rightpoint/core/next-contentful-renderer'
import { Seo } from '../common/Seo/Seo.component'
import { ReactNode } from 'react'
import { Document } from '@contentful/rich-text-types'
import { AllPageProps } from '../../next-contentful/mappers/all-mappers/mapper.interface'

export type WorkDetailPageProps = {
    title: string

    multiMediaProps: MultiMediaProps
    tagline: string

    intro: ReactNode // can't be done until refactor
    introDocument: Document

    componentsProps: ComponentPropsWithMeta[]
    backgroundColor: string

    relatedWorksProps?: CardProps[]

    industryLinkProps?: LinkProps
    workCategoryLinkProps?: LinkProps
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

    return (
        <>
            {seoProps && <Seo {...seoProps} />}
            <WorkDetailHeader {...pageProps} />
            <Components
                componentsProps={pageProps.componentsProps}
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
            {pageProps.relatedWorksProps && (
                <WorkDetailRelated
                    relatedWorksProps={pageProps.relatedWorksProps}
                />
            )}
        </>
    )
}
