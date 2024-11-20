import dynamic from 'next/dynamic'
import { EntryFields, Entry } from 'contentful'
import { fetchEntries } from '@rightpoint/contentful'
import { LinkProps } from '../../links/Link/Link.component'
import { getConfigsManager } from '../../../next-contentful/mappers/registry/all-configs'
import { FooterProps } from './Footer.component'
import { pardotUrls } from '../../../variables'
import { Link } from '../../links/Link/Link.component'

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
    import('./Footer.component').then((mod) => mod.Footer)
)

export async function getNavbarProps(): Promise<FooterProps> {
    // Fetch all wrapper entries from Contentful
    const entries = await fetchEntries<NavBarEntry>({
        content_type: 'componentNavbarWrapper',
        include: 2,
    })

    // Initialize the return structure
    const navbarProps: FooterProps = {
        offices: [], // Static value or fetched from Contentful if needed
        contactContent: [], // Static value
        policies: [], // Static value
        mainLinks: [],
    }

    // Early return if no entries are found
    if (!entries || entries.length === 0) {
        return navbarProps
    }

    // Loop through `navbar` fields inside the wrapper entries
    const navbarItems = entries.flatMap((entry) => entry.fields.navbar)

    // Filter navbar items based on position and submenu visibility
    const filteredEntries = navbarItems.filter((navbarItem) =>
        navbarItem.fields.navbarPosition.includes('Footer')
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
                showSubMenu.includes('Show In Footer')
                    ? await Promise.all(
                          subMenu.map(async (subMenuEntry) => ({
                              text:
                                  subMenuEntry.fields.subMenuName ??
                                  subMenuEntry.fields.title,
                              href: await getConfigsManager().getUrl(
                                  subMenuEntry
                              ),
                              cursor: { text: 'Explore' },
                          }))
                      )
                    : []

            // Resolve the main link
            const resolvedLink = link
                ? {
                      text: internalName, // Use internalName for main link text
                      href: await getConfigsManager().getUrl(link),
                      cursor: { text: 'Explore' }, // Static cursor value
                      links:
                          resolvedSubMenu.length > 0
                              ? resolvedSubMenu
                              : undefined, // Submenu links
                  }
                : null

            return resolvedLink
        })
    )

    // Filter out null entries and populate mainLinks
    navbarProps.mainLinks = mainLinks as FooterProps['mainLinks']

    navbarProps.contactContent = [
        <p>
            <Link
                href="/contact"
                text="Contact Us"
                cursorProps={{
                    text: "Let's Talk",
                }}
                asButton={{
                    outlined: false,
                }}
                pardotProps={{
                    embedUrl: pardotUrls.CONTACT_FORM,
                }}
            />
        </p>,
    ]
    navbarProps.policies = [
        {
            text: 'Website Privacy Notice',
            href: '/website-privacy-notice-and-cookie-policy',
        },
        {
            text: 'Cookie Preference Center',
            href: '#',
            nextProps: {
                onClick: (ev) => {
                    ;(window as any)?.Optanon?.ToggleInfoDisplay()
                    ev.preventDefault()
                    return false
                },
            },
        },
        {
            text: 'Terms of Use',
            href: '/terms-of-use',
        },
    ]
    navbarProps.offices = [
        {
            title: 'Atlanta',
            href: '#',
        },
        {
            title: 'Bengaluru',
            href: '#',
        },
        {
            title: 'Boston',
            href: '#',
        },

        {
            title: 'Chicago HQ',
            href: '#',
        },
        {
            title: 'Dallas',
            href: '#',
        },

        {
            title: 'Detroit',
            href: '#',
        },

        {
            title: 'Jaipur',
            href: '#',
        },
        {
            title: 'London',
            href: '#',
        },
        {
            title: 'New York',
            href: '#',
        },
        {
            title: 'Salt Lake City',
            href: '#',
        },
    ]

    // Return the complete navbarProps
    return navbarProps
}
