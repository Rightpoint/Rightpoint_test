import { HeroBannerProps } from './HeroBanner.component'
import { makeTypedGeneratorFn } from '@rightpoint/core/utils'
import { linkGenerators } from '../../links/Link/Link.data'
import { cardGenerators } from '../../general/Card/Card.data'
import { multiMediaGenerators } from '../../general/MultiMedia/MultiMedia.data'
import { ContentColors } from '../../layout/RootComponent/background-color'
import { BackgroundTreatmentLevels } from '../../layout/BackgroundMedia/BackgroundMedia.component'

export const heroBannerGenerators = makeTypedGeneratorFn<HeroBannerProps>()({
    default: () => ({
        eyebrow: 'Industry leading thinking',
        title: 'Leading Thoughts',
        subtitle:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, do eiusmod tempor.',
        ctaProps: linkGenerators.default(),
        cardProps: cardGenerators.portrait(),
        backgroundMultiMediaProps: multiMediaGenerators.portrait(),
        rootDecoratorArgs: {
            background: {
                contentColor: ContentColors.Light,
                media: {
                    blur: false,
                    multiMediaProps: multiMediaGenerators.solution(),
                    treatmentLevel: BackgroundTreatmentLevels.None,
                },
            },

            container: true,
        },
    }),
    landscape: () => ({
        eyebrow: 'Landscape',
        title: 'Landscape Stress',
        subtitle:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, do eiusmod tempor.',
        ctaProps: linkGenerators.default(),
        cardProps: cardGenerators.landscape(),

        rootDecoratorArgs: {
            background: {
                contentColor: ContentColors.Dark,
                media: {
                    blur: true,
                    multiMediaProps: multiMediaGenerators.default(),
                    treatmentLevel: BackgroundTreatmentLevels.Normal,
                },
            },
            container: true,
        },
    }),
})
