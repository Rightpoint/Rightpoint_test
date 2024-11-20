import dynamic from 'next/dynamic'
import { EntryFields, Entry } from 'contentful'
import { fetchEntries } from '@rightpoint/contentful'
import { NavbarPopupProps } from '../NavbarPopup.component'
import { LinkProps } from '../../../links/Link/Link.component'
import { getConfigsManager } from '../../../../next-contentful/mappers/registry/all-configs'
import { NavbarSideBarProps } from './NavbarPopupContent.component'

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
    import('./NavbarPopupContent.component').then(
        (mod) => mod.NavbarPopupContent
    )
)

export async function getNavbarProps(): Promise<NavbarSideBarProps[]> {
    // Fetch all wrapper entries from Contentful
    const entries = await fetchEntries<NavBarEntry>({
        content_type: 'componentNavbarWrapper',
        include: 2,
    })

    // Early return if no entries are found
    if (!entries || entries.length === 0) {
        return []
    }

    // Loop through `navbar` fields inside the wrapper entries
    const navbarItems = entries.flatMap((entry) => entry.fields.navbar)

    // Filter navbar items based on position and submenu visibility
    const filteredEntries = navbarItems.filter((navbarItem) =>
        navbarItem.fields.navbarPosition.includes('Sidebar')
    )

    // Map through the filtered navbar items to create the correct structure
    const mainLinks = await Promise.all(
        filteredEntries.map(async (navbarItem) => {
            const { internalName, link, subMenu, showSubMenu } =
                navbarItem.fields

            // Resolve subMenu links if applicable
            const resolvedSubMenu =
                subMenu &&
                subMenu.length > 0 &&
                showSubMenu &&
                showSubMenu.includes('Show In Sidebar')
                    ? await Promise.all(
                          subMenu.map(async (subMenuEntry) => ({
                              title:
                                  subMenuEntry.fields.subMenuName ??
                                  subMenuEntry.fields.title,
                              linkProps: {
                                  href: await getConfigsManager().getUrl(
                                      subMenuEntry
                                  ),
                              },
                          }))
                      )
                    : []

            // Resolve the main link
            const resolvedLink = {
                title: internalName, // Use internalName for main link text
                linkProps: {
                    href: await getConfigsManager().getUrl(link),
                },
                links: resolvedSubMenu.length > 0 ? resolvedSubMenu : undefined, // Submenu links
            }

            return resolvedLink
        })
    )
    mainLinks.push({
        title: 'Contact',
        linkProps: {
            href: '/contact',
        },
        links: [],
    })
    return mainLinks
}
