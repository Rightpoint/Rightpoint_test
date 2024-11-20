import type { FooterProps } from './Footer.component'
import { makeTypedGeneratorFn } from '@rightpoint/core/utils'

export const footerGenerators = makeTypedGeneratorFn<FooterProps>()({
    default: () => ({
        mainLinks: [
            {
                text: 'Industries',
                href: '/industries',
            },
            {
                text: 'Solutions',
                href: '/solutions',
            },
            {
                text: 'Work',
                href: '/work',
            },
            {
                text: 'Thinking',
                href: '/thought',
            },
            {
                text: 'Careers',
                href: '/careers',
            },
        ],
        contactContent: [
            <p>
                For business inquiries
                <br />
                <a href="mailto:contact@rightpoint.com">
                    contact@rightpoint.com
                </a>
            </p>,
            <p>
                For press inquiries
                <br />
                <a href="mailto:marketing@rightpoint.com">
                    marketing@rightpoint.com
                </a>
            </p>,
        ],
        policies: [
            {
                text: 'Website Privacy Notice',
                href: '/privacy-policy',
            },
            {
                text: 'Cookie Preference Center',
                href: 'javascript:Optanon.ToggleInfoDisplay()',
            },
            {
                text: 'Terms of Use',
                href: '/terms',
            },
        ],
        offices: [
            {
                title: 'Atlanta',
                href: '#',
            },
            {
                title: 'Dallas',
                href: '#',
            },

            {
                title: 'Jaipur',
                href: '#',
            },

            {
                title: 'New York',
                href: '#',
            },

            {
                title: 'Boston',
                href: '#',
            },

            {
                title: 'Denver',
                href: '#',
            },

            {
                title: 'London',
                href: '#',
            },

            {
                title: 'Oakland',
                href: '#',
            },

            {
                title: 'Chicago HQ',
                href: '#',
            },
            {
                title: 'Detroit',
                href: '#',
            },
            {
                title: 'Los Angeles',
                href: '#',
            },
            {
                title: 'Salt Lake City',
                href: '#',
            },
        ],
    }),
})
