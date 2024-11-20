import { EntryFields, Entry } from 'contentful'
import {
    Navigation,
    NavigationItemProps,
    NavigationProps,
} from './Navigation.component'
import { LinkEntry } from '../Link/Link.contentful'
import { makeConfig } from '@rightpoint/core/next-contentful/configs/make-config'
import { MapEntryTo } from '@rightpoint/core/next-contentful'

export type NavigationEntryFields = {
    internalTitle: EntryFields.Text
    links: LinkEntry[]
    a11yLabel: EntryFields.Text
}

export type NavigationEntry = Entry<NavigationEntryFields>

/**
 * Extract URL from Navigation entry.
 * If a reference is provided, try to resolve that URL.
 * Otherwise, if a text URL is provided, use that.
 */
const mapLinkEntryToProps: MapEntryTo<LinkEntry, NavigationItemProps> = async ({
    entry,
    manager,
}) => {
    const { title } = entry.fields
    return {
        linkProps: (await manager.getComponentMapper(entry).getProps()) as any,
        text: title,
    }
}

const mapEntryToProps: MapEntryTo<NavigationEntry, NavigationProps> = async ({
    entry,
    manager,
}) => {
    if (!entry) {
        return null
    }
    const { links } = entry.fields

    return {
        items: await Promise.all(
            links.map(async (linkEntry) =>
                mapLinkEntryToProps({
                    entry: linkEntry,
                    manager: manager,
                })
            )
        ),
    }
}

export const navigationMapperConfig = makeConfig({
    __mapperType: 'component',
    contentTypeId: 'componentNavigation',
    component: Navigation,
    entryToProps: mapEntryToProps,
    entryToRootProps: async ({ entry, manager }) => {
        return {
            a11y: {
                label: entry.fields.a11yLabel || 'Navigation',
            },
        }
    },
})
