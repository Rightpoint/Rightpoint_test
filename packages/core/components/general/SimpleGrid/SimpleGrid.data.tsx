import {
    SimpleGridItemProps,
    SimpleGridProps,
    SimpleGridVariants,
} from './SimpleGrid.component'
import { fakerWithSeed } from '@rightpoint/data-generators'
import { startCase, times } from 'lodash'
import { makeTypedGeneratorFn } from '@rightpoint/core/utils'

const generateItems = ({
    num = 5,
    body = '',
    ...rest
}: Partial<
    SimpleGridItemProps & {
        num?: number
    }
> = {}): SimpleGridItemProps[] =>
    times(num, () => ({
        title: startCase(fakerWithSeed.commerce.color()),
        // subTitle: fakerWithSeed.lorem.sentence(),
        body: body || startCase(fakerWithSeed.lorem.sentences(5)),
        ...rest,
    }))

export const gridGenerators = makeTypedGeneratorFn<SimpleGridProps>()({
    default: () => ({
        items: generateItems(),
        variant: SimpleGridVariants.Default,
    }),
    clientList: () => ({
        items: generateItems({
            body: `Ongoing transformation of IKEA's omnichannel commerce, in-store, and employee-facing products, including launching its first e-commerce app.`,
            linkProps: {
                href: '#foo',
                text: 'Learn More',
            },
        }),
        headerProps: {
            title: 'Clients',
            body: 'We work with leading organizations across industries, with deep expertise and experience.',
            variant: 'Header1',
        },
    }),
    industries: () => ({
        variant: SimpleGridVariants.Offset,
        headerProps: {
            eyebrow: 'Industry Expertise',
            body: 'We work with leading organizations across industries, with deep expertise and experience in:',
            variant: 'Header4' as const,
        },
        items: [
            {
                title: 'Consumer & Retail',
                body: 'Now more than ever, we believe that digital should be at the core of every forward-thinking brand.',
            },
            {
                title: 'Healthcare',
                body: 'Now more than ever, we believe that digital should be at the core of every forward-thinking brand.',
                linkProps: {
                    href: '#links-but-no-text',
                    text: '',
                },
            },
            {
                title: 'Financial Services',
                body: 'Now more than ever, we believe that digital should be at the core of every forward-thinking brand.',
            },
            {
                title: 'Mobility',
                body: 'Now more than ever, we believe that digital should be at the core of every forward-thinking brand.',
            },
            {
                title: 'Tech & Telco',
                body: 'Now more than ever, we believe that digital should be at the core of every forward-thinking brand.',
                linkProps: {
                    href: '#foo',
                    text: 'Optional CTA Text',
                },
            },
        ],
    }),
    capabilities: () => ({
        items: generateItems({
            body: `Concept Prototyping
                   Experience Design
                   Experience Mapping
                   Information Architecture`,
        }),
    }),
    logoGrid: () => ({
        items: times(6, (i) => ({
            image: {
                src: `/static/placeholder/logos/logo-${i + 1}.png`,
                alt: '',
            },
        })),
    }),
})
