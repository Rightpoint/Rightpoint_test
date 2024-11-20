import dynamic from 'next/dynamic'
import { get } from 'lodash'
import { makeConfig } from '@rightpoint/core/next-contentful/configs/make-config'
import type { MultiMediaEntry } from '../MultiMedia/MultiMedia.contentful'
import type { EntryFields, Entry, Asset } from 'contentful'
import type { HeroProps } from './Hero.component'
import type { LinkEntry } from '../Link/Link.contentful'
import type { LinkProps } from '../Link/Link.component'
import type { MultiMediaProps } from '../MultiMedia/MultiMedia.component'
import { Document } from '@contentful/rich-text-types'
import { contentfulRichTextDocumentToJsonSafe } from '../RichText/contentful-rich-text-to-json-safe'

export type HeroContentWidths = 'FullWidth' | 'Large' | 'Medium' | 'Small'

export type HeroEntryFields = {
    title: EntryFields.Text
    image: EntryFields.Link<Asset>

    media?: MultiMediaEntry
    content?: MultiMediaEntry
    contentWidth?: HeroContentWidths
    subtitle: EntryFields.Text
    disableTitleOverlap?: EntryFields.Boolean
    // animated
    animated?: EntryFields.Boolean
    backgroundColor: EntryFields.Text
    backgroundColorType: EntryFields.Text

    titleSticky: EntryFields.Boolean

    link?: LinkEntry

    contentRichText: Document
    ctaButtonText: EntryFields.Text
}

export type HeroEntry = Entry<HeroEntryFields>

export const HeroDynamic = dynamic(() =>
    import('./Hero.component').then((mod) => mod.Hero)
)

type HeroEntryPropsWithExtra = Partial<HeroProps> & {
    contentComponentContentTypeId?: string
}

export const heroMapperConfig = makeConfig<HeroEntry, HeroEntryPropsWithExtra>({
    __mapperType: 'component',
    contentTypeId: 'heroComponent',
    component: (props) => <HeroDynamic {...props} />,
    entryToRootProps: async ({ entry, manager }) => {
        const { backgroundColor } = entry.fields
        return {
            background: {
                backgroundColor,
            },
            a11y: {
                label: entry.fields.title,
            },
        }
    },
    entryToProps: async ({ entry, manager }) => {
        const {
            title,
            media,
            animated: isAnimated,
            contentWidth,
            subtitle,
            disableTitleOverlap,
            link,
            contentRichText,
            ctaButtonText,
        } = entry.fields

        const props: Partial<HeroProps> = {
            title,
            isAnimated,
            contentWidth,
            subtitle,
            titleOverlap: !disableTitleOverlap,
            multiMediaProps: (await manager.getProps(media)) as MultiMediaProps,
            linkProps: (await manager.getProps(link)) as LinkProps,
            content: await contentfulRichTextDocumentToJsonSafe(
                contentRichText,
                manager
            ),
            ctaButtonText,
        }

        if (entry.fields.content) {
            const mapper = manager.getComponentMapper(entry.fields.content)
            return {
                ...props,
                contentProps: await mapper.getProps(),
                contentComponentContentTypeId: mapper.contentTypeId,
            }
        }
        return props
    },
    prepareJsonUnsafeProps: ({ props, manager }) => {
        /**
         * The hero component can render other components inside it.
         * Load them dynamically, if content props provided.
         */
        const mapper = manager.getComponentMapper(
            props.contentComponentContentTypeId
        )

        return {
            ...props,
            contentProps:
                props.contentComponentContentTypeId === 'multiMedia'
                    ? {
                          ...props.contentProps,
                          aspectWrapperRatio: get(
                              props,
                              'contentProps.aspectWrapperRatio',
                              16 / 9
                          ),
                      }
                    : props.contentProps,
            contentComponent: props.contentProps ? mapper.Component : null,
        }
    },
    // entryToMapperProps: async ({ entry }) => {
    //     return {
    //         storybook: {
    //             path: '?path=/story/components-hero--image',
    //         },
    //     }
    // },
})
