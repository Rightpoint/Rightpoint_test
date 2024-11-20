import { AnimatedImagesProps } from './AnimatedImages.component'
import { times } from 'lodash'
import { imageGenerators } from '../Image/Image.data'
import { makeTypedGeneratorFn } from '@rightpoint/core/utils'

export const animatedImagesGenerators =
    makeTypedGeneratorFn<AnimatedImagesProps>()({
        default: () => ({
            images: [
                {
                    ...imageGenerators.alternate(),
                    alt: 'Alt text',
                    title: 'Title text',
                },
                {
                    ...imageGenerators.default(),
                    alt: 'Alt text',
                    title: 'Title text',
                },
            ],
        }),
    })
