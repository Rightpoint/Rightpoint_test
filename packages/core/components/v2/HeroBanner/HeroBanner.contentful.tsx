import dynamic from 'next/dynamic'
import { makeConfig } from '@rightpoint/core/next-contentful/configs/make-config'
import { ContentColors } from '../../layout/RootComponent/background-color'
import { BackgroundTreatmentLevels } from '../../layout/BackgroundMedia/BackgroundMedia.component'

import type { EntryFields, Entry, Asset } from 'contentful'
import type { HeroBannerProps } from './HeroBanner.component'
import type { Document } from '@contentful/rich-text-types'
import type { LinkEntry } from '../../links/Link/Link.contentful'
import type { MultiMediaEntry } from '../../general/MultiMedia/MultiMedia.contentful'
import type { MultiMediaProps } from '../../general/MultiMedia/MultiMedia.component'
import type { CardProps } from '../../general/Card/Card.component'

/**
 * Contentful entry types
 */
export type HeroBannerEntryFields = {
    internalTitle: EntryFields.Text
    eyebrow: EntryFields.Text
    title: EntryFields.Text
    subtitle: EntryFields.Text
    body: Document
    ctaLink: LinkEntry
    cardReference: Entry<any> // page

    // background

    contentColor: EntryFields.Text
    backgroundMedia: MultiMediaEntry
    backgroundTreatmentLevel: EntryFields.Text
}

export type HeroBannerEntry = Entry<HeroBannerEntryFields>

/**
 * Dynamic import chunks runtime components
 */
export const HeroBannerDynamic = dynamic(() =>
    import('./HeroBanner.component').then((mod) => mod.HeroBanner)
)

export const heroBannerMapperConfig = makeConfig<
    HeroBannerEntry,
    HeroBannerProps
>({
    __mapperType: 'component',
    component: HeroBannerDynamic,
    contentTypeId: 'componentHeroBanner',
    entryToProps: async ({ entry, manager }) => {
        const { eyebrow, title, subtitle, body, ctaLink, cardReference } =
            entry.fields
        const { contentColor, backgroundMedia, backgroundTreatmentLevel } =
            entry.fields
        const cardProps = await manager.getPageCardProps(cardReference)
        return {
            eyebrow,
            title,
            subtitle,
            ctaProps: await manager.getLinkProps(ctaLink),
            cardProps,

            /**
             * Cannot call `manager.getProps` on `backgroundMedia` from entryToRootProps helper
             * without circular import.
             *
             * This is a warning to remove async capabilities from entryToRootProps.
             */
            rootProps: {
                container: true,
                background: {
                    contentColor: getContentColor(contentColor),
                    media: {
                        multiMediaProps: await getBackgroundMultiMediaProps(
                            cardProps
                        ),
                        // if there is a background image, don't blur.
                        // if there is no background image but card media, use it and blur it
                        blur: false,
                        treatmentLevel: getTreatmentLevel(
                            backgroundTreatmentLevel
                        ),
                    },
                },
            },
        }

        async function getBackgroundMultiMediaProps(
            cardProps: CardProps
        ): Promise<MultiMediaProps> {
            // there is a background image, use it
            if (backgroundMedia) {
                return await manager.getProps(backgroundMedia)
            }
            // otherwise, use card props (or null)
            return cardProps?.multiMediaProps
        }
        function getContentColor(color) {
            const isValid = (color: string): color is ContentColors => {
                return color in ContentColors
            }
            return isValid(color) ? color : null
        }
        function getTreatmentLevel(value) {
            const isValid = (
                value: string
            ): value is BackgroundTreatmentLevels => {
                return value in BackgroundTreatmentLevels
            }
            return isValid(value) ? value : null
        }
    },
})
