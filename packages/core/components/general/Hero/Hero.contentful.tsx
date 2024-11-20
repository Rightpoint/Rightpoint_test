import dynamic from 'next/dynamic'
import { get } from 'lodash'
import { makeConfig } from '@rightpoint/core/next-contentful/configs/make-config'
import type { EntryFields, Entry, Asset } from 'contentful'
import type { HeroProps } from './Hero.component'

export type HeroContentWidths = 'FullWidth' | 'Large' | 'Medium' | 'Small'

export type HeroEntryFields = {}

export type HeroEntry = Entry<HeroEntryFields>

export const HeroDynamic = dynamic(() =>
    import('./Hero.component').then((mod) => mod.Hero)
)

type HeroEntryPropsWithExtra = Partial<HeroProps> & {
    contentComponentContentTypeId?: string
}

/**
 * @deprecated by new designs
 */
export const heroMapperConfig = makeConfig<HeroEntry, HeroEntryPropsWithExtra>({
    __mapperType: 'component',
    contentTypeId: 'heroComponent',
    component: (props) => <HeroDynamic {...props} />,
    entryToRootProps: async ({ entry, manager }) => {
        return {}
    },
    entryToProps: async ({ entry, manager }) => {
        return {}
    },
    prepareJsonUnsafeProps: ({ props, manager }) => {
        return {}
    },
})
