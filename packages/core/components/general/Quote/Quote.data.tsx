import { QuoteProps } from './Quote.component'
import { makeTypedGeneratorFn } from '@rightpoint/core/utils'
import { linkGenerators } from '../../links/Link/Link.data'

const makeDefault = () => ({
    text: 'Rightpoint was an equal partner as we built our mobile business into one of the most envied success stories in the eCommerce space, with mobile accounting for 40% of our sales.',
    name: 'Andrew Smith',
    jobTitle: 'VP Creative, Some Company',
    linkProps: null,
})

export const quoteGenerators = makeTypedGeneratorFn<QuoteProps>()({
    default: () => {
        return {
            ...makeDefault(),
        }
    },
    main: () => {
        return {
            eyebrow: 'Building a world that works better for everyone',
            text: 'We help our clients realize their potential through the convergence of customer & employee experience, working at their most important connection points to deliver value and drive powerful outcomes.',
            linkProps: {
                href: '#',
                text: 'Our Solutions',
            },
        }
    },
    large: () => {
        return {
            ...makeDefault(),
            variant: 'Large',
        }
    },
})
