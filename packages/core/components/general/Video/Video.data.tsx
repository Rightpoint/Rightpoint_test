import { VideoProps } from './Video.component'

export const videoGenerators = {
    default: (): VideoProps => ({
        videoUrl: 'https://vimeo.com/502696604',
    }),
    preview: (): VideoProps => ({
        videoUrl: 'https://vimeo.com/502696604',
        // videoAspectRatio: 16 / 9,
        videoPreviewUrl: 'https://vimeo.com/502696604',
    }),
}
