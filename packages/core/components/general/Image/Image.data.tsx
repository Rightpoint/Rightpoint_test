import { fakerWithSeed } from '@rightpoint/data-generators'
import { ImageProps } from './Image.component'

import { makeTypedGeneratorFn } from '@rightpoint/core/utils'

const srcDataImages = {
    transparent:
        'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
    gray: 'data:image/gif;base64,R0lGODlhAQABAIAAAMLCwgAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==',
    black: 'data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=',
}

const randomPhotoIds = [
    'fIq0tET6llw',
    'sf_1ZDA1YFw', // banana
    // '5E5N49RWtbA', // blue
    // 'iRMUDX0kyOc', // mountain
    'hpTH5b6mo2s', // balloons
]

export const imageGenerators = makeTypedGeneratorFn<ImageProps>()({
    default: ({ src = null }: { src: string } = { src: null }) => ({
        src: src || 'https://source.unsplash.com/PhYq704ffdA/1000x600',
        alt: 'required',
    }),

    /**
     * Data images for storybook stability
     */
    transparent: () => ({
        src: srcDataImages.transparent,
        alt: 'required',
    }),
    gray: () => ({
        src: srcDataImages.gray,
        alt: 'required',
    }),
    black: () => ({
        src: srcDataImages.black,
        alt: 'required',
    }),

    alternate: () => ({
        src: 'https://source.unsplash.com/FV3GConVSss/1000x600',
        alt: 'required',
    }),
    random: () => {
        const id = fakerWithSeed.random.arrayElement(randomPhotoIds)

        return {
            src: `https://source.unsplash.com/${id}/1000x600`,
            alt: 'required',
        }
    },
    portrait: () => {
        return {
            src: '/static/placeholder/illustration/portrait.jpg',
            alt: 'required',
        }
    },
    light: () => ({
        src: 'https://images.unsplash.com/photo-1484503793037-5c9644d6a80a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1365&q=80',
        alt: 'Light color',
    }),

    /**
     * The actual 3d rendering assets
     */
    threeDimensional: (
        { filename = '1' }: { filename: string } = { filename: '1' }
    ) => ({
        src: `/static/placeholder/v2/3d/${filename}.png`,
        alt: '3d',
    }),
})
