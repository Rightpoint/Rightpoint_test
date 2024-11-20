import type { AnimatedImagesProps } from '../AnimatedImages/AnimatedImages.component'
import { animatedImagesGenerators } from '../AnimatedImages/AnimatedImages.data'
import type { ImageProps } from '../Image/Image.component'
import { imageGenerators } from '../Image/Image.data'
import type { VideoProps } from '../Video/Video.component'
import { MultiMediaProps, MultiMediaTypes } from './MultiMedia.component'

type MultiMediaPropsWithComponent<P> = MultiMediaProps & { mediaProps: P }

export const multiMediaGenerators = {
    default: (): MultiMediaPropsWithComponent<ImageProps> => {
        return {
            aspectWrapperRatio: 16 / 9,
            mediaType: MultiMediaTypes.IMAGE,
            mediaProps: imageGenerators.default(),
        }
    },
    gray: (): MultiMediaPropsWithComponent<ImageProps> => {
        return {
            aspectWrapperRatio: 16 / 9,
            mediaType: MultiMediaTypes.IMAGE,
            mediaProps: imageGenerators.gray(),
        }
    },
    image: ({ src = '' } = {}): MultiMediaPropsWithComponent<ImageProps> => {
        return {
            aspectWrapperRatio: 16 / 9,
            mediaType: MultiMediaTypes.IMAGE,
            mediaProps: imageGenerators.default(),
        }
    },
    imageLight: (): MultiMediaPropsWithComponent<ImageProps> => {
        return {
            aspectWrapperRatio: 16 / 9,
            mediaType: MultiMediaTypes.IMAGE,
            mediaProps: imageGenerators.light(),
        }
    },
    randomImage: (): MultiMediaPropsWithComponent<ImageProps> => {
        return {
            // aspectRatio: 16 / 9,
            mediaType: MultiMediaTypes.IMAGE,
            mediaProps: imageGenerators.random(),
        }
    },
    animatedImages: (): MultiMediaPropsWithComponent<AnimatedImagesProps> => {
        return {
            aspectWrapperRatio: 16 / 9,
            mediaType: MultiMediaTypes.ANIMATED_IMAGES,
            mediaProps: {
                ...animatedImagesGenerators.default(),
            },
        }
    },
    video: (): MultiMediaPropsWithComponent<VideoProps> => {
        return {
            aspectWrapperRatio: 16 / 9,
            mediaType: MultiMediaTypes.VIDEO,
            mediaProps: {
                videoUrl: 'https://vimeo.com/502696604',
            },
        }
    },
    videoBackground: (): MultiMediaPropsWithComponent<VideoProps> => {
        return {
            aspectWrapperRatio: 16 / 9,
            mediaType: MultiMediaTypes.VIDEO,
            mediaProps: {
                videoUrl: 'https://vimeo.com/163721649',
            },
        }
    },
    noAspectImage: (): MultiMediaPropsWithComponent<ImageProps> => {
        return {
            mediaType: MultiMediaTypes.IMAGE,
            mediaProps: imageGenerators.portrait(),
        }
    },
    portrait: (): MultiMediaPropsWithComponent<ImageProps> => {
        return {
            aspectWrapperRatio: 387 / 488,
            aspectWrapperRatioDesktop: 387 / 488,
            mediaType: MultiMediaTypes.IMAGE,
            mediaProps: imageGenerators.portrait(),
        }
    },
    threeDimensional: (
        { filename = '1' } = { filename: '1' }
    ): MultiMediaPropsWithComponent<ImageProps> => {
        return {
            // natural aspect
            mediaType: MultiMediaTypes.IMAGE,
            mediaProps: imageGenerators.threeDimensional({ filename }),
        }
    },
    solution: (): MultiMediaPropsWithComponent<ImageProps> => {
        return {
            mediaType: MultiMediaTypes.IMAGE,
            mediaProps: imageGenerators.default({
                src: '/static/placeholder/v2/header/solutions.jpg',
            }),
        }
    },
}
