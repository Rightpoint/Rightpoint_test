/**
 * This should come from CMS later, but is
 * a very minor issue right now.
 */
export const linkData = {
    solutions: {
        title: 'Solutions',
        linkProps: {
            href: '/solutions',
        },
    },
    column1: {
        title: 'Our Expertise',
        items: [
            {
                title: 'Employee Experience',
                linkProps: {
                    href: '/solutions-employee-experience',
                },
            },

            {
                title: 'Digital Product',
                linkProps: {
                    href: '/solutions-digital-product',
                },
            },
            {
                title: 'Commerce',
                linkProps: {
                    href: '/solutions-commerce',
                },
            },
            {
                title: 'Customer Experience',
                linkProps: {
                    href: '/solutions-customer-experience',
                },
            },
        ],
    },
    column2: {
        title: 'Industries',
        items: [
            {
                title: 'Finance',
                linkProps: {
                    href: '/industries-finance',
                },
            },
            {
                title: 'Healthcare',
                linkProps: {
                    href: '/industries-healthcare',
                },
            },
            {
                title: 'Mobility',
                linkProps: {
                    href: '/industries-mobility',
                },
            },
            {
                title: 'Retail',
                linkProps: {
                    href: '/industries-retail',
                },
            },
            {
                title: 'Manufacturing',
                linkProps: {
                    href: '/industries-manufacturing',
                },
            },
        ],
    },
    column3: {
        title: null,

        /**
         * This data structure needs to not render a drop down.
         */
        items: [
            {
                title: 'Capabilities',
                linkProps: {
                    href: '/solutions#scroll-to=Capabilities',
                },
            },
            {
                title: 'Technology',
                linkProps: {
                    href: '/solutions#scroll-to=Technology',
                },
            },
        ],
    },
    links: [
        {
            active: true,
            title: 'Work',
            linkProps: {
                href: '/work/all',
            },
        },
        {
            title: 'About',
            linkProps: {
                href: '/company',
            },
        },
        {
            title: 'Careers',
            linkProps: {
                href: '/careers',
            },
        },
        {
            title: 'Thinking',
            linkProps: {
                href: '/thought',
            },
        },
        {
            title: 'Solutions',
            linkProps: {
                href: '/solutions',
            },
            links: [
                {
                    active: false,
                    title: 'Employee Experience',
                    linkProps: { href: '/employee-experience/#' },
                },
                {
                    title: 'Customer Experience',
                    linkProps: { href: '/customer-experience/#' },
                },
                {
                    title: 'Product Experience',
                    linkProps: { href: '/product-experience/#' },
                },
            ],
        },
        {
            title: 'Contact',
            linkProps: {
                href: '/contact',
            },
            links: [
                {
                    title: 'Explore Offices',
                    linkProps: { href: '/offices/#' },
                },
            ],
        },
    ],
}
