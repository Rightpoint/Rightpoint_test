import { makeConfig } from '@rightpoint/core/next-contentful/configs/make-config'
import type { EntryFields, Entry, Asset } from 'contentful'
import { backgroundTypeUtils } from '../../../../layout/RootComponent/background-color-type-utils'
import { DynamicComponentEntryFields } from '../../DynamicComponent.contentful'
import type { SolutionsAnimationProps } from './SolutionsAnimation.component'
import { SolutionsAnimationDynamic } from './SolutionsAnimation.component.dynamic'

export interface SolutionsAnimationEntryFields
    extends DynamicComponentEntryFields {
    //
}

export type SolutionsAnimationEntry = Entry<SolutionsAnimationEntryFields>

export const SolutionsAnimationMapperConfig = makeConfig<
    SolutionsAnimationEntry,
    SolutionsAnimationProps
>({
    __mapperType: 'component',
    component: SolutionsAnimationDynamic,
    contentTypeId: 'SolutionsAnimation',
    // entryToProps: async ({ entry, manager }) => {
    //     const {} = entry.fields
    //     return {}
    // },
    entryToRootProps: async ({ entry, manager }) => {
        const { backgroundColor } = entry.fields
        return {
            container: true,
            noPadding: true,
            noMargins: true,
            background: {
                backgroundColor:
                    backgroundTypeUtils.getBackgroundColor(backgroundColor),
            },
        }
    },
})
