import styled, { css } from 'styled-components'
import { PageHeaderProps } from './PageHeader.component'
import { makeTypedGeneratorFn } from '@rightpoint/core/utils'

export const pageHeaderGenerators = makeTypedGeneratorFn<PageHeaderProps>()({
    default: () => ({
        eyebrow:
            'Defining and executing the vision for the next-generation customer experience.',
        title: 'Total Experience',
        imageProps: {
            src: '/static/placeholder/v2/header/1.jpg',
            alt: 'Placeholder',
        },
    }),
    homepage: () => ({
        eyebrow:
            'Defining and executing the vision for the next-generation customer experience.',
        title: 'Total Experience',
    }),
})
