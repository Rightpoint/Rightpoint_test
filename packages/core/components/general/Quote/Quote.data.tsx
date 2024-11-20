import { QuoteProps } from './Quote.component'
import { makeTypedGeneratorFn } from '@rightpoint/core/utils'

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
    large: () => {
        return {
            ...makeDefault(),
            variant: 'Large',
        }
    },
})
