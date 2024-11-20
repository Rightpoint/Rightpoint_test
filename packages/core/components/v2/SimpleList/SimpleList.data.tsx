import styled, { css } from 'styled-components'
import { SimpleListProps } from './SimpleList.component'
import { makeTypedGeneratorFn } from '@rightpoint/core/utils'

export const simpleListGenerators = makeTypedGeneratorFn<SimpleListProps>()({
    default: () => ({
        title: 'What We Deliver',
        items: [
            {
                linkProps: {
                    href: '#',
                    text: 'Employee Experience Transformation',
                },
            },
            {
                linkProps: {
                    href: '#',
                    text: 'Employee Experience Transformation',
                },
            },
            {
                linkProps: {
                    href: '#',
                },
            },
            {
                linkProps: {
                    href: '#',
                    text: 'Employee-Centered Communications',
                },
            },
            {
                linkProps: {
                    href: '#',
                    text: 'Workplace Consulting',
                },
            },
            {
                linkProps: {
                    href: '#',
                    text: 'Change Management',
                },
            },
        ],
    }),
})
