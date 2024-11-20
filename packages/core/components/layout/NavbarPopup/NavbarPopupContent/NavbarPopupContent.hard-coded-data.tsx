/**
 * This should come from CMS later, but is
 * a very minor issue right now.
 */
export const navbarPopupData = {
    links: [
        {
            title: 'Industries',
            linkProps: {
                href: '/industries',
            },
        },
        {
            title: 'Solutions',
            linkProps: {
                href: '/solutions',
            },
            links: [
                {
                    title: 'Customer Experience',
                    linkProps: { href: '/solutions/customer-experience' },
                },
                {
                    active: false,
                    title: 'Employee Experience',
                    linkProps: { href: '/solutions/employee-experience' },
                },
                {
                    title: 'Product Experience',
                    linkProps: { href: '/solutions/product-experience' },
                },
            ],
        },
        {
            title: 'Work',
            linkProps: {
                href: '/work/browse/by-solution',
            },
        },
        {
            title: 'About',
            linkProps: {
                href: '/inside-rightpoint',
            },
        },
        {
            title: 'Thinking',
            linkProps: {
                href: '/thought',
            },
        },
        {
            title: 'Careers',
            linkProps: {
                href: '/careers',
            },
        },
        {
            title: 'Contact',
            linkProps: {
                href: '/contact',
            },
        },
    ],
}
