import { fakerWithSeed } from '@rightpoint/data-generators'
import { ImageProps } from './Image.component'

import { makeTypedGeneratorFn } from '@rightpoint/core/utils'

const randomPhotoIds = [
    'fIq0tET6llw',
    'sf_1ZDA1YFw', // banana
    // '5E5N49RWtbA', // blue
    // 'iRMUDX0kyOc', // mountain
    'hpTH5b6mo2s', // balloons
]

export const imageGenerators = makeTypedGeneratorFn<ImageProps>()({
    default: () => ({
        src: 'https://source.unsplash.com/PhYq704ffdA/1000x600',
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
            // src: `https://images.unsplash.com/photo-1658890636416-d566446e3905?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80`,
            src: '/static/placeholder/illustration/portrait.jpg',
            alt: 'required',
        }
    },
    light: () => ({
        src: 'https://images.unsplash.com/photo-1484503793037-5c9644d6a80a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1365&q=80',
        alt: 'Light color',
    }),

    threeDimensional: (
        { filename = '1' }: { filename: string } = { filename: '1' }
    ) => ({
        src: `/static/placeholder/v2/3d/${filename}.png`,
        alt: '3d',
    }),
})
