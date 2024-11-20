import { multiMediaGenerators } from '../MultiMedia/MultiMedia.data'
import { VideoProps } from './Video.component'

const videoSourceGenerators = {
    default: () => 'https://vimeo.com/502696604',
    withSound: () => 'https://vimeo.com/163721649',
}

export const videoGenerators = {
    default: (): VideoProps => ({
        videoUrl: videoSourceGenerators.default(),
        aspectWrapperRatio: 16 / 9,
        autoPlay: true,
    }),
    autoplayUnmute: (): VideoProps => ({
        videoUrl: videoSourceGenerators.withSound(),
        aspectWrapperRatio: 16 / 9,
        autoPlay: true,
        showUnmute: true,
    }),
    poster: (): VideoProps => ({
        videoUrl: videoSourceGenerators.withSound(),
        posterMultiMediaProps: multiMediaGenerators.image(),
    }),
    posterAutoplay: (): VideoProps => ({
        videoUrl: videoSourceGenerators.withSound(),
        posterMultiMediaProps: {
            ...multiMediaGenerators.videoBackground(),
        },
    }),
}
