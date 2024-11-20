import { multiMediaGenerators } from '../MultiMedia/MultiMedia.data'
import { VideoProps } from './Video.component'

const videoSourceGenerators = {
    default: () => 'https://vimeo.com/502696604',
    withSound: () => 'https://vimeo.com/163721649',
}

export const videoGenerators = {
    default: (): VideoProps => ({
        videoUrl: videoSourceGenerators.default(),
        backgroundFallback: true,
    }),
    preview: (): VideoProps => ({
        // videoAspectRatio: 16 / 9,
        backgroundMode: false,
        videoUrl: videoSourceGenerators.withSound(),
        videoPreviewUrl: videoSourceGenerators.default(),
    }),
    same: (): VideoProps => ({
        // videoAspectRatio: 16 / 9,
        backgroundMode: false,
        videoUrl: videoSourceGenerators.withSound(),
        videoPreviewUrl: videoSourceGenerators.withSound(),
    }),
    poster: (): VideoProps => ({
        // videoAspectRatio: 16 / 9,
        backgroundMode: false,
        videoUrl: videoSourceGenerators.withSound(),
        posterMultiMediaProps: multiMediaGenerators.image(),
    }),
    previewWithPosterFallback: (): VideoProps => ({
        // videoAspectRatio: 16 / 9,
        backgroundMode: false,
        videoUrl: videoSourceGenerators.withSound(),
        videoPreviewUrl: videoSourceGenerators.default(),
        posterMultiMediaProps: multiMediaGenerators.image(),
    }),
}
