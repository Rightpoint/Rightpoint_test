import dynamic from 'next/dynamic'
import type { EntryFields, Entry, Asset } from 'contentful'
import { makeConfig } from '@rightpoint/core/next-contentful/configs/make-config'
import type { ComponentGroupProps } from './ComponentGroup.component'
import { containerTypeUtils } from '../RootComponent/container-type-utils'
import { backgroundTypeUtils } from '../RootComponent/background-color-type-utils'
import { JobManager } from '../../dynamic/DynamicComponent/dynamic-components/JobsList/JobsList.parser'

export type ComponentGroupEntryFields = {
    internalName: EntryFields.Text
    components: Entry<any>[]
    container: EntryFields.Text
    backgroundColor: EntryFields.Text
    removeFirstComponentSpacing: boolean
    removeLastComponentSpacing: boolean
}

export type ComponentGroupEntry = Entry<ComponentGroupEntryFields>

export const ComponentGroupDynamic = dynamic(() =>
    import('./ComponentGroup.component').then((mod) => mod.ComponentGroup)
)

export const componentGroupMapperConfig = makeConfig<
    ComponentGroupEntry,
    ComponentGroupProps
>({
    __mapperType: 'component',
    component: ComponentGroupDynamic,
    contentTypeId: 'componentGroup',
    entryToProps: async ({ entry, manager }) => {
        const { components } = entry.fields
        const {
            container,
            backgroundColor,
            removeFirstComponentSpacing,
            removeLastComponentSpacing,
        } = entry.fields
        const componentsProps = await manager.getAllComponentsProps(components)
        return {
            componentsProps,

            /**
             * Choices from this component transform child components container and background rules.
             */
            container: containerTypeUtils.getContainerWidth(container),
            backgroundColor:
                backgroundTypeUtils.getBackgroundColor(backgroundColor),

            /**
             * Control spacing between components in this group
             */
            removeFirstComponentMargin: removeFirstComponentSpacing,
            removeLastComponentMargin: removeLastComponentSpacing,
        }
    },
    entryToRootProps: async ({ entry, manager }) => {
        return {
            noRootComponent: true,
        }
    },
})
