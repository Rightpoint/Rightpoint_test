import { HeaderTextProps } from './HeaderText.component'
import { HeaderVariants } from './HeaderText.types'
import { makeTypedGeneratorFn } from '@rightpoint/core/utils'

export const headerTextGenerators = makeTypedGeneratorFn<HeaderTextProps>()({
    default: () => ({
        title: 'Genpact Expands Its Experience Business, Rightpoint, with the Acquisition of Hoodoo Digital',
    }),

    caseStudy: () => ({
        title: 'Reimagining Cadillac’s User Experience',
        variant: HeaderVariants.CaseStudy,
    }),
    caseStudyLong: () => ({
        title: 'Transforming A Real-life Event Into A Customer Experience',
        variant: HeaderVariants.CaseStudy,
    }),
    postWithCta: () => ({
        title: 'The Metaverse is more than Facebook’s domain',

        ctaProps: {
            text: 'Read more',
            href: '/foobar/',
        },
    }),
    postWithAuthor: () => ({
        title: 'NFT-Community Engagement and Crypto Retail',

        creditProps: {
            title: 'Chief Commerce Officer',
            name: 'Phillip Jackson',
        },
    }),
    typewriter: () => ({
        title: '',
        typewriterProps: {
            texts: ['Work that captivates', 'Work that inspires'],
        },
        variant: HeaderVariants.Typewriter,
    }),
    typewriterSerif: () => ({
        title: '',
        typewriterProps: {
            texts: ['Work that serifs', 'Work that inspires'],
            font: 'serif',
        },
        variant: HeaderVariants.Typewriter,
    }),
})
