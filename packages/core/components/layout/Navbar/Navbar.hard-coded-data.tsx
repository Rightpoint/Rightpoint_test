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
                href: '/industries/mobility',
                text: 'Industries',
            },
        },
        {
            linkProps: {
                href: '/solutions',
                text: 'Solutions',
            },
        },
        {
            linkProps: {
                href: '/work/by-solution',
                text: 'Work',
            },
        },
        {
            linkProps: {
                href: '/thought',
                text: 'Thinking',
            },
        },
        {
            linkProps: {
                href: '/inside-rightpoint',
                text: 'About',
            },
        },
        {
            linkProps: {
                href: '/contact',
                text: 'Contact',
            },
            circled: true,
        },
    ]
}
