import dynamic from 'next/dynamic'
import { makeConfig } from '@rightpoint/core/next-contentful/configs/make-config'
import type { EntryFields, Entry, Asset } from 'contentful'
import type { NavbarPopupProps } from './NavbarPopup.component'

export type NavbarPopupEntryFields = {
    internalName: EntryFields.Text
}

export type NavbarPopupEntry = Entry<NavbarPopupEntryFields>

export const NavbarPopupDynamic = dynamic(() =>
    import('./NavbarPopup.component').then((mod) => mod.NavbarPopup)
)

export const navbarPopupMapperConfig = makeConfig<
    NavbarPopupEntry,
    NavbarPopupProps
>({
    __mapperType: 'component',
    contentTypeId: 'NavbarPopupForm',
    component: NavbarPopupDynamic,
    entryToProps: async ({ entry, manager }) => {
        return {
            tbd: 123,
        } as any
    },
})
