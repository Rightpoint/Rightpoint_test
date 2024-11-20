import styled, { css } from 'styled-components'
import { HeaderProps } from './Header.component'
import { makeTypedGeneratorFn } from '@rightpoint/core/utils'

export const headerGenerators = makeTypedGeneratorFn<HeaderProps>()({
    default: () => ({
        eyebrow: 'Modern Digital Workspace',
        title: 'Capabilities & Technology Partners',
        body: (
            <p>
                A world-class digital workspaces empowers employee autonomy and
                countability, connects employees to personalized experiences,
                and enables efficiency throughout the workforce.
            </p>
        ),
        linkProps: {
            href: '#',
            text: 'Learn More',
        },
        variant: 'Header4' as const,
    }),
    header1: () => ({
        title: 'Clients',
        body: 'We work with leading organizations across industries, with deep expertise and experience.',
        variant: 'Header1' as const,
    }),
    header2: () => ({
        eyebrow: 'Featured Project & Thought Leadership',
        title: 'Work',
        body: 'We work with leading organizations across industries, with deep expertise and experience.',
        variant: 'Header2' as const,
    }),
    header3: () => ({
        eyebrow: 'Our Solutions',
        title: (
            <div>
                Explore Total
                <br />
                Experience Solutions
            </div>
        ),
        body: (
            <p>
                A world-class digital workspaces empowers employee autonomy and
                countability, connects employees to personalized experiences,
                and enables efficiency throughout the workforce.
            </p>
        ),
        linkProps: {
            href: '#',
            text: 'Learn More',
        },
        variant: 'Header3' as const,
    }),

    // header 4 is default

    header5: () => ({
        eyebrow: 'Mobility Solutions',
        title: 'Capabilities & Technology Partners',
        body: (
            <p>
                We are a team* of like-minded design enthusiasts and tech
                aficionados that explore the digital frontier with grit and
                dedication. Intrigued by beauty, fascinated by technology and
                fuelled with an everlasting devotion to digital craftsmanship
                and meaningful aesthetics.
            </p>
        ),
        variant: 'Header5' as const,
    }),

    headerText: () => ({
        body: 'We deliver our work and solutions in proud partnership with some of the world’s top technology firms, including:',
        variant: 'HeaderText' as const,
    }),
})
