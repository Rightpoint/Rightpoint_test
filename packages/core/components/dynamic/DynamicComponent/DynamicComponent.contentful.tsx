import dynamic from 'next/dynamic'
import type { EntryFields, Entry, Asset } from 'contentful'
import { makeConfig } from '@rightpoint/core/next-contentful/configs/make-config'
import { DynamicComponentProps } from './DynamicComponent.component'
import { DynamicComponentType } from './DynamicComponentType'
import { Document } from '@contentful/rich-text-types'

/**
 * Contentful entry types
 */
export type DynamicComponentEntryFields = {
    internalName: EntryFields.Text
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

const isValidComponentType = (type: string): type is DynamicComponentType => {
    const isValid = type in DynamicComponentType
    return isValid
}

/**
 * Dynamically import the component type maps (which themselves have a payload),
 * then return the matching type
 */
const getDynamicComponent = async (type: DynamicComponentType) => {
    const dynamicComponents = await import('./DynamicComponentType').then(
        (mod) => mod.dynamicComponents
    )
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
     *
     * Dynamic components proxy all of their entryToProps behavior
     * to the lazy/dynamic child
     */
    entryToProps: async ({ entry, manager }) => {
        const { type } = entry.fields
        if (isValidComponentType(type)) {
            const mapper = await getMapperLazy(type)
            try {
                const props =
                    (await mapper.entryToProps({ entry, manager })) ?? {}
                return {
                    type,
                    ...props,
                }
            } catch (ex) {
                console.log('dynamic entryToProps', ex)
                return {
                    type: DynamicComponentType.MapperException,
                    error: JSON.stringify(ex, Object.getOwnPropertyNames(ex)),
                }
            }
        }
        return {
            type: DynamicComponentType.Fallback,
        }
    },
    entryToRootProps: async ({ entry, manager }) => {
        const { type, container } = entry.fields
        if (isValidComponentType(type)) {
            try {
                const mapper = await getMapperLazy(type)

                /**
                 * Set defaults if no custom root prop transformer found, such as the root component container.
                 */
                const defaultRootProps = {
                    container,
                }

                /**
                 * If the dynamic component contains an `entryToRootProps`, prefer its implementation.
                 */
                const componentRootProps =
                    (await mapper.entryToRootProps?.({
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
        const { type } = entry.fields
        const mapper = await getMapperLazy(type)
        return mapper?.entryToMapperProps?.({ entry, manager }) ?? {}
    },
})
