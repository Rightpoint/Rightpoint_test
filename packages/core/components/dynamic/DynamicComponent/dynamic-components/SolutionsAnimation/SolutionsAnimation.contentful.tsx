import { makeConfig } from '@rightpoint/core/next-contentful/configs/make-config'
import type { EntryFields, Entry, Asset } from 'contentful'
import type { SolutionsAnimationProps } from './SolutionsAnimation.component'
import { SolutionsAnimationDynamic } from './SolutionsAnimation.component.dynamic'

export type SolutionsAnimationEntryFields = {
    internalName: EntryFields.Text
}

export type SolutionsAnimationEntry = Entry<SolutionsAnimationEntryFields>

export const SolutionsAnimationMapperConfig = makeConfig<
    SolutionsAnimationEntry,
    SolutionsAnimationProps
>({
    __mapperType: 'component',
    component: SolutionsAnimationDynamic,
    contentTypeId: 'SolutionsAnimation',
    entryToProps: async ({ entry, manager }) => {
        const {} = entry.fields
        return {}
    },
})
