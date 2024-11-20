import { FC } from 'react'
import { ImageWithAspect, ImageProps } from '../Image/Image.component'
import { Video, VideoProps } from '../Video/Video.component'
import {
    AnimatedImages,
    AnimatedImagesProps,
} from '../AnimatedImages/AnimatedImages.component'
import { AspectWrapperProps } from '../../utils/AspectWrapper/AspectWrapper.component'
import { MotionProps } from 'framer-motion'

export enum MultiMediaTypes {
    VIDEO = 'VIDEO',
    IMAGE = 'IMAGE',
    ANIMATED_IMAGES = 'ANIMATED_IMAGES',
}

type MediaPayload<T extends string, P> = {
    mediaType: T
    mediaProps: P
}

type VideoPayload = MediaPayload<MultiMediaTypes.VIDEO, VideoProps>
type ImagePayload = MediaPayload<MultiMediaTypes.IMAGE, ImageProps>
type AnimatedImagesPayload = MediaPayload<
    MultiMediaTypes.ANIMATED_IMAGES,
    AnimatedImagesProps
>

type AllMediaPayloads = VideoPayload | ImagePayload | AnimatedImagesPayload

export interface MultiMediaCoreProps {
    aspectWrapperRatio?: number | string
    aspectWrapperRatioDesktop?: number | string
    /**
     * Adds a background color to the asset so that its bounding box is visible during load
     */
    backgroundFallback?: boolean
    mediaType?: MultiMediaTypes | `${MultiMediaTypes}`
    /**
     * Pass motion props to the aspect sizer (aspect setter element) motion component
     */
    sizerMotionProps?: MotionProps
}

export type MultiMediaProps = MultiMediaCoreProps & AllMediaPayloads

/**
 * This is a single component that is used to display images across the site.
 *
 * Content authors can interchangeably use the image, animated images, or video components.
 */
export const MultiMedia: FC<MultiMediaProps> = ({
    aspectWrapperRatio,
    aspectWrapperRatioDesktop,

    mediaType,
    mediaProps,

    backgroundFallback,

    sizerMotionProps,
}) => {
    /**
     * These are props for the aspect wrapper which wraps each
     * core media component
     */
    const aspectWrapperProps: AspectWrapperProps = {
        aspectWrapperRatio,
        aspectWrapperRatioDesktop,
        sizerMotionProps,
    }
    // we need need the aspect ratio props for mobile and desktop to be passed from
    // context, optionally
    if (mediaType === MultiMediaTypes.VIDEO) {
        return (
            <Video
                {...mediaProps}
                {...aspectWrapperProps}
                backgroundFallback={backgroundFallback}
            />
        )
    } else if (mediaType === MultiMediaTypes.ANIMATED_IMAGES) {
        return <AnimatedImages {...mediaProps} {...aspectWrapperProps} />
    }
    // content authors should provide alt text, but it cannot be enforced here.
    // eslint-disable-next-line jsx-a11y/alt-text
    return (
        <ImageWithAspect
            {...mediaProps}
            {...aspectWrapperProps}
            backgroundFallback={backgroundFallback}
        />
    )
}
