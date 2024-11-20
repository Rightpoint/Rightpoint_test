import { NavbarItemProps } from './Navbar.component'

/**
 * @deprecated returns hard coded props without
 * going through data generator;
 *
 * In future replace with Contentful preview-able key/value store
 */
export const getHardCodedNavbarItems = (): NavbarItemProps[] => {
    return [
        {
            linkProps: {
                href: '/solutions',
                text: 'What We Do',
            },
            dropdownLinksProps: [
                {
                    href: '/partner-adobe',
                    text: 'Adobe Services',
                },
                {
                    href: '/partner-microsoft',
                    text: 'Microsoft Services',
                },
                {
                    href: '/partner-sitecore',
                    text: 'Sitecore Services',
                },
                {
                    href: '/partner-optimizely',
                    text: 'Optimizely Services',
                },
                {
                    href: '/solutions/customer-experience',
                    text: 'Customer Experience',
                },
                {
                    href: '/solutions/employee-experience',
                    text: 'Employee Experience',
                },
                {
                    href: '/solutions/product-experience',
                    text: 'Product Experience',
                },
                {
                    href: '/solutions/artificial-intelligence',
                    text: 'Artificial Intelligence',
                },
            ],
        },
        {
            linkProps: {
                href: '/industries',
                text: 'Industries',
            },
            dropdownLinksProps: [
                {
                    href: '/industries/consumer-product-goods-and-retail',
                    text: 'CPG & Retail',
                },
                {
                    href: '/industries/healthcare',
                    text: 'Healthcare',
                },
                {
                    href: '/industries/financial-services',
                    text: 'Financial Services',
                },
                {
                    href: '/industries/mobility',
                    text: 'Mobility',
                },
                {
                    href: '/industries/technology-and-telecom',
                    text: 'Tech & Comms',
                },
            ],
        },
        {
            linkProps: {
                href: '',
                text: 'Partners',
            },
            dropdownLinksProps: [
                {
                    href: '/partner-adobe',
                    text: 'Adobe',
                },
                {
                    href: '/partner-microsoft',
                    text: 'Microsoft',
                },
                {
                    href: '/partner-sitecore',
                    text: 'Sitecore',
                },
                {
                    href: '/partner-optimizely',
                    text: 'Optimizely',
                },
            ],
        },
        {
            linkProps: {
                href: '/work/browse/by-solution',
                text: 'Our Work',
            },
        },

        {
            linkProps: {
                href: '/contact',
                text: 'Contact ',
                // hard coded "Contact Us" vs "Contact" on mobile
                // text: 'Contact Us',
                /**
                 * This does not work well on the Navbar due to rapid state switching and cache (key) layers
                 *
   ƒ              * Switching to a redux modal for now, but in the future, <Link pardotProps /> should
                 * also use Redux to reduce Portal count & increase reliability.
                 */
                // pardotProps: {
                //     embedUrl:''
                // },
            },
            isContactCircled: true,
        },
    ]
}
