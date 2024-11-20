import React from 'react'
import { LinkProps } from '../../links/Link/Link.component'
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
                href: '/solutions',
                text: 'Solutions',
            },
            dropdownLinksProps: [
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
            ],
        },
        {
            linkProps: {
                href: '/work/browse/by-solution',
                text: 'Work',
            },
        },
        // {
        //     linkProps: {
        //         href: '/thought',
        //         text: 'Thinking',
        //     },
        // },
        // {
        //     linkProps: {
        //         href: '/inside-rightpoint',
        //         text: 'About',
        //     },
        // },
        {
            linkProps: {
                href: '/contact',
                text: 'Contact',
            },
            circled: false,
        },
    ]
}
