import type { FooterProps } from './Footer.component'
import { makeTypedGeneratorFn } from '@rightpoint/core/utils'

export const footerGenerators = makeTypedGeneratorFn<FooterProps>()({
    default: () => ({
        cities: [
            {
                title: 'Atlanta',
                email: 'contact@rightpoint.com',
            },
            {
                title: 'Dallas',
                email: 'contact@rightpoint.com',
            },

            {
                title: 'Jaipur',
                email: 'contact@rightpoint.com',
            },

            {
                title: 'New York',
                email: 'contact@rightpoint.com',
            },

            {
                title: 'Boston',
                email: 'contact@rightpoint.com',
            },

            {
                title: 'Denver',
                email: 'contact@rightpoint.com',
            },

            {
                title: 'London',
                email: 'contact@rightpoint.com',
            },

            {
                title: 'Oakland',
                email: 'contact@rightpoint.com',
            },

            {
                title: 'Chicago HQ',
                email: 'contact@rightpoint.com',
            },
            {
                title: 'Detroit',
                email: 'contact@rightpoint.com',
            },
            {
                title: 'Los Angeles',
                email: 'contact@rightpoint.com',
            },
            {
                title: 'Sydney',
                email: 'contact@rightpoint.com',
            },
        ],
    }),
})
