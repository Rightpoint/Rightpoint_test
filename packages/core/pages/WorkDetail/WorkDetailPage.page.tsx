import { NextPage } from 'next'
import { useRouter } from 'next/router'
import {
    BackgroundColors,
    CardsList,
    CardsListLayouts,
    ContentColors,
    LinkProps,
    PageHeader,
    RootComponent,
    type CardProps,
    type MultiMediaProps,
} from '@rightpoint/core/components'
import { Components } from '@rightpoint/core/next-contentful-renderer'
import { Seo } from '../seo/Seo/Seo.component'
import { WorkDetailPageStyles as s } from './WorkDetailPage.styles'
import type { Document } from '@contentful/rich-text-types'
import type { ComponentPropsWithMeta } from '@rightpoint/core/next-contentful'
import type { GetWorkDetailStaticProps } from './WorkDetailPage.server'

export type WorkDetailPageProps = {
    title: string
    backgroundMultiMediaProps?: MultiMediaProps
    multiMediaProps: MultiMediaProps
    backgroundTreatment?: string
    tagline: string
    introDocument: Document
    headerLinksProps?: LinkProps[]
    componentsProps: ComponentPropsWithMeta[]

    relatedWorksProps?: CardProps[]

    /**
     * @deprecated for now, its not in new designs
     */
    backgroundColor: string
}

export const WorkDetailPage: NextPage<GetWorkDetailStaticProps> = ({
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
            ...rootProps.background,
            backgroundColor: pageProps.backgroundColor,
        },
    })

    const {
        relatedWorksProps,
        componentsProps,
        title,
        tagline,
        multiMediaProps,
        backgroundMultiMediaProps,
        backgroundTreatment,

        backgroundColor,
        introDocument,
        headerLinksProps,
    } = pageProps

    return (
        <>
            {seoProps && <Seo {...seoProps} />}

            <PageHeader
                title={title}
                backgroundMultiMediaProps={
                    backgroundMultiMediaProps || multiMediaProps
                }
                backgroundTreatment={backgroundTreatment}
                // if no explicit background, use legacy safe mode
                legacyBackgroundFallback={!backgroundMultiMediaProps}
                eyebrow={tagline}
                introductionDocument={introDocument}
                contentColor={ContentColors.Light}
                backgroundColor={BackgroundColors.Black}
                linksHeader="Services"
                linksProps={headerLinksProps}
            />

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
                        layout={CardsListLayouts.Offset}
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
