import React from 'react'
import { pardotUrls } from '@rightpoint/core/variables'
import { Button } from '../../general/Button/Button.component'
import { Link } from '../../links/Link/Link.component'

/**
 * @deprecated returns hard coded props without
 * going through data generator;
 *
 * In future replace with Contentful preview-able key/value store
 */

export const getHardCodedFooterProps = () => {
    return {
        mainLinks: [
            {
                text: 'Industries',
                href: '/industries',
                cursor: {
                    text: 'Explore',
                },
            },
            {
                text: 'Solutions',
                href: '/solutions',
                cursor: {
                    text: 'Explore',
                },
            },
            {
                text: 'Work',
                href: '/work/browse/by-solution',
                cursor: {
                    text: 'Explore',
                },
            },
            {
                text: 'About',
                href: '/inside-rightpoint',
                cursor: {
                    text: 'Explore',
                },
            },
            {
                text: 'Thinking',
                href: '/thought',
                cursor: {
                    text: 'Explore',
                },
            },
            {
                text: 'Careers',
                href: '/careers',
                cursor: {
                    text: 'Explore',
                },
            },
        ],

        contactContent: [
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
        ],
        policies: [
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
        ],
        offices: [
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
        ],
    }
}
