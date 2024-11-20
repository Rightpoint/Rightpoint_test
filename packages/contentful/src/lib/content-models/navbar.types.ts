import { EntryFields, Entry } from 'contentful'
import { NavbarTier1Entry } from './navbar-tier1-item.types'

export const NavbarLocations = {
    'Main Navbar': 'Main Navbar',
} as const

export type NavbarEntryFields = {
    name: EntryFields.Text
    popupTier1Links: EntryFields.Link<NavbarTier1Entry>[]
}

export type NavbarEntry = Entry<NavbarEntryFields>
