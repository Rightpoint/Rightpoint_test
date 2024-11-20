import styled, { css } from 'styled-components'
import { SimpleListProps } from './SimpleList.component'
import { makeTypedGeneratorFn } from '@rightpoint/core/utils'

export const simpleListGenerators = makeTypedGeneratorFn<SimpleListProps>()({
    default: () => ({
        title: 'What We Deliver',
        items: [
            {
                text: 'Employee Experience Transformation',
                linkProps: {
                    href: '#',
                    text: 'Employee Experience Transformation',
                },
            },
            {
                text: 'Intranet Design and Implementation',
            },
            {
                text: 'Employee-Centered Content ',
            },
            {
                text: 'Employee-Centered Communications',
                linkProps: {
                    href: '#',
                    text: 'Employee-Centered Communications',
                },
            },
            {
                text: 'Workplace Consulting',
                linkProps: {
                    href: '#',
                    text: 'Workplace Consulting',
                },
            },
            {
                text: 'Change Management',
                linkProps: {
                    href: '#',
                    text: 'Change Management',
                },
            },
        ],
    }),
})
