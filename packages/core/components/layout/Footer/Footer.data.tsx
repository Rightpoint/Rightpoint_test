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
                href: '/thinking',
            },
            {
                text: 'Careers',
                href: '/careers',
            },
        ],
        contactContent: [
            <p>
                For CX initiatives{' '}
                <a href="mailto:business@rightpoint.com">
                    business@rightpoint.com
                </a>
            </p>,
            <p>
                For press inquiries{' '}
                <a href="mailto:marketing@rightpoint.com">
                    marketing@rightpoint.com
                </a>
            </p>,
        ],
        policies: [
            {
                text: 'Terms',
                href: '/terms',
            },
            {
                text: 'Cookies',
                href: '/cookies',
            },
            {
                text: 'Privacy Policy',
                href: '/privacy-policy',
            },
            {
                text: 'CCPA Privacy Notice',
                href: '/ccpa-privacy-notice',
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
                title: 'Sydney',
                href: '#',
            },
        ],
    }),
})
