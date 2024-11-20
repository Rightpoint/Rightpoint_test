import { NavbarEntry } from '../content-models/navbar.types'
import { fetchEntry } from './generic-fetchers'

const getNavbar = async () => {
    return await fetchEntry<NavbarEntry>({
        content_type: 'page',
        'fields.slug': 'navbar-1',
        include: 5,
    })
}

export const fetchNavbar = async () => {
    return await getNavbar()
}

export type GlobalStaticProps = {
    navbarEntry: NavbarEntry | null
}
