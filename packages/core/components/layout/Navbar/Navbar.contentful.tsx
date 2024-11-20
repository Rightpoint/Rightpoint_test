import dynamic from 'next/dynamic'
import { EntryFields, Entry } from 'contentful'
import { fetchEntries } from '@rightpoint/contentful'
import { LinkProps } from '../../links/Link/Link.component'
import { getConfigsManager } from '../../../next-contentful/mappers/registry/all-configs'

export type NavBarFields = {
    internalName: EntryFields.Text
    link: Entry<any>
    navbarPosition: any[]
    subMenu: Entry<any>[]
    Mainlink: LinkProps
    subMenuLink: LinkProps[]
    isContactCircled: boolean
    fieldOrder: number
    showSubMenu: any[]
    subMenuName: string
}

export type NavBarWrapper = {
    navbar: any[]
}

export type NavBarEntry = Entry<NavBarWrapper>

/**
 * Dynamic import chunks runtime components
 */
export const NavBarDynamic = dynamic(() =>
    import('./Navbar.component').then((mod) => mod.Navbar)
)

import { NavbarItemProps, NavbarItemWrapperProps } from './Navbar.component'

export async function getNavbarProps(): Promise<NavbarItemProps[]> {
    // Fetch all wrapper entries from Contentful
    const entries = await fetchEntries<NavBarEntry>({
        content_type: 'componentNavbarWrapper',
        include: 2,
    })

    if (!entries) {
        return []
    }

    // Loop through `navbar` fields inside the wrapper entries
    const navbarItems = entries.flatMap((entry) => entry.fields.navbar)

    // Filter navbar items based on position and submenu visibility
    const filteredEntries = navbarItems.filter((navbarItem) =>
        navbarItem.fields.navbarPosition.includes('Header')
    )

    // Resolve the filtered entries to the correct props format
    const resolvedNavbarItems = await Promise.all(
        filteredEntries.map(async (navbarItem) => {
            const {
                internalName,
                link,
                subMenu,
                isContactCircled,
                showSubMenu,
            } = navbarItem.fields

            // Resolve subMenu links if applicable
            const resolvedSubMenu =
                subMenu &&
                subMenu.length > 0 &&
                showSubMenu &&
                showSubMenu.includes('Show In Header')
                    ? await Promise.all(
                          subMenu.map(async (subMenuEntry) => ({
                              href: await getConfigsManager().getUrl(
                                  subMenuEntry
                              ),
                              text:
                                  subMenuEntry.fields.subMenuName ??
                                  subMenuEntry.fields.title,
                          }))
                      )
                    : []

            // Resolve the main link
            const resolvedLink = link
                ? {
                      href: await getConfigsManager().getUrl(link),
                      text: internalName, // Use internalName for main link text
                  }
                : null

            return {
                linkProps: resolvedLink, // Main link props
                dropdownLinksProps: resolvedSubMenu, // SubMenu links props
                isContactCircled: isContactCircled, // Handle contact circle flag
            }
        })
    )

    resolvedNavbarItems.push({
        linkProps: {
            href: '/contact',
            text: 'Contact',
        },
        dropdownLinksProps: [],
        isContactCircled: true,
    })

    return resolvedNavbarItems
}
