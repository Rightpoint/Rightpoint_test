import { NextPage } from 'next'
import { useRouter } from 'next/router'
import {
    BackgroundColors,
    CardsList,
    ContentColors,
    LinkProps,
    PageHeader,
    RootComponent,
    type CardProps,
    type MultiMediaProps,
} from '@rightpoint/core/components'
import { ComponentPropsWithMeta } from '@rightpoint/core/next-contentful'
import { Components } from '@rightpoint/core/next-contentful-renderer'
import { Seo } from '../seo/Seo/Seo.component'
import { Document } from '@contentful/rich-text-types'
import { AllPageProps } from '../../next-contentful/mappers/all-mappers/mapper.interface'
import { WorkDetailPageStyles as s } from './WorkDetailPage.styles'

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
