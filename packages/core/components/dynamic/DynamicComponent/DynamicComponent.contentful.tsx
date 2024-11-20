import dynamic from 'next/dynamic'
import type { EntryFields, Entry, Asset } from 'contentful'
import { makeConfig } from '@rightpoint/core/next-contentful/configs/make-config'
import { DynamicComponentProps } from './DynamicComponent.component'
import { DynamicComponentType } from './DynamicComponent.all-dynamic-component-map'
import { Document } from '@contentful/rich-text-types'
import { HeaderEntry } from '../../trash/HeaderOld/HeaderOld.contentful'

/**
 * Contentful entry types
 */
export type DynamicComponentEntryFields = {
    internalName: EntryFields.Text
    header?: HeaderEntry
    type: EntryFields.Text
    content: Document
    title: EntryFields.Text
    references: Entry<unknown>[]
    json: Record<string, unknown>
    backgroundColor: EntryFields.Text
    container: EntryFields.Boolean
}

export type DynamicComponentEntry = Entry<DynamicComponentEntryFields>

/**
 * Dynamic import chunks runtime components
 */
export const DynamicComponentDynamic = dynamic(() =>
    import('./DynamicComponent.component').then((mod) => mod.DynamicComponent)
)

/**
 * Type from CMS should have a more stable name + label
 * Allow some kind of delimiter to be used to separate the type from the payload
 *
 * Such as <Label>:Type
 */
const stripLabel = (type: string) => {
    return type.split(':').slice(-1)[0]
}
const isValidComponentType = (type: string): type is DynamicComponentType => {
    return type in DynamicComponentType
}

/**
 * Dynamically import the component type maps (which themselves have a payload),
 * then return the matching type
 */
const getDynamicComponent = async (type: DynamicComponentType) => {
    const dynamicComponents = await import(
        './DynamicComponent.all-dynamic-component-map'
    ).then((mod) => mod.dynamicComponents)
    return dynamicComponents[type]
}

const getMapperLazy = async (type: string) => {
    if (isValidComponentType(type)) {
        // if it's a valid component type, get the mapper for that component and transform the payload
        const component = await getDynamicComponent(type)
        if (component?.lazyGetMapper) {
            const mapper = await component.lazyGetMapper()
            return mapper
        }
    }
    return null
}

export const dynamicComponentMapperConfig = makeConfig<
    DynamicComponentEntry,
    DynamicComponentProps
>({
    __mapperType: 'component',
    component: DynamicComponentDynamic,
    contentTypeId: 'dynamicComponent' as const,
    /**
     * Dynamic components proxy all of their entryToProps behavior to the lazy/dynamic child
     * and call mappers lazily, and safely catching exceptions.
     *
     * Dynamic components are liable to fail as they are less tightly coupled with the CMS.
     */
    entryToProps: async ({ entry, manager }) => {
        let { type, header } = entry.fields
        type = stripLabel(type)
        if (isValidComponentType(type)) {
            const lazyMapper = await getMapperLazy(type)
            try {
                const componentProps =
                    (await lazyMapper?.entryToProps?.({ entry, manager })) ?? {}

                return {
                    type,
                    headerProps: await manager.getProps(header),
                    ...componentProps,
                }
            } catch (ex) {
                console.error('dynamic entryToProps exception', ex)
                /**
                 * If there's an exception in a dynamic component lazy getter,
                 * return a mapper exception component that outputs details to the page.
                 *
                 * Why: dynamic components may be difficult to debug due to their "all exceptions caught" nature.
                 */
                return {
                    type: DynamicComponentType.MapperException,
                    error: JSON.stringify(ex, Object.getOwnPropertyNames(ex)),
                }
            }
        }
        return {
            type: DynamicComponentType.Invalid,
        }
    },
    entryToRootProps: async ({ entry, manager }) => {
        let { type, container, backgroundColor } = entry.fields
        type = stripLabel(type)
        if (isValidComponentType(type)) {
            try {
                const mapper = await getMapperLazy(type)

                /**
                 * Set defaults if no custom root prop transformer found, such as the root component container.
                 */
                const defaultRootProps = {
                    container,
                    background: {
                        backgroundColor,
                    },
                }

                /**
                 * If the dynamic component contains an `entryToRootProps`, prefer its implementation.
                 */
                const componentRootProps =
                    (await mapper?.entryToRootProps?.({
                        entry,
                        manager,
                    })) ?? defaultRootProps

                return {
                    ...componentRootProps,
                }
            } catch (ex) {
                console.log('dynamic entryToRootProps', type, ex)
            }
        }
        return {}
    },
    entryToMapperProps: async ({ entry, manager }) => {
        let { type } = entry.fields
        type = stripLabel(type)
        const mapper = await getMapperLazy(type)
        return mapper?.entryToMapperProps?.({ entry, manager }) ?? {}
    },
})
