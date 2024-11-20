import { MultiMedia } from '../MultiMedia/MultiMedia.component'
import { multiMediaGenerators } from '../MultiMedia/MultiMedia.data'
import { HeroContentWidths, HeroProps } from './Hero.component'

import { makeTypedGeneratorFn } from '@rightpoint/core/utils'

export const heroGenerators = makeTypedGeneratorFn<HeroProps>()({
    default: () => ({
        title: 'Healthcare' as string,
        multiMediaProps: multiMediaGenerators.image(),
        // contentComponent: MultiMedia,
        // contentProps: multiMediaGenerators.image(),
    }),
    image: () => ({
        title: 'Healthcare' as string,
        media: multiMediaGenerators.image(),
    }),
    animatedImages: () => ({
        title: 'Solutions',
        multiMediaProps: multiMediaGenerators.animatedImages(),
    }),
    video: () => ({
        title: 'Video',
        multiMediaProps: {
            backgroundFallback: true,
            ...multiMediaGenerators.video(),
        },
        contentWidth: HeroContentWidths.Medium,
    }),
    overflowingTitle: () => ({
        title: 'Overflowing title',
        subtitle: 'Overflowing titles are aligned left',
        multiMediaProps: multiMediaGenerators.image(),
    }),
    stickyAnimation: () => ({
        title: 'Sticky title animation',
        subtitle: 'Title sticks at center of screen on scroll',
        contentWidth: HeroContentWidths.FullWidth,
        titleSticky: true,
    }),
})
