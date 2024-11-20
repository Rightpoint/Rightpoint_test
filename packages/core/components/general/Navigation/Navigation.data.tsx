import { times } from 'lodash'
import { makeTypedGeneratorFn } from '@rightpoint/core/utils'
import { NavigationProps } from './Navigation.component'

const data = [
    'E-Commerce',
    'Customer Experience',
    'Employee Experience',
    'Digital Product',
    'Experience Transformation',
]

const thoughtData = [
    'Everything',
    'Design',
    'Strategy',
    'Tech',
    'Commerce',
    'Culture',
]

export const navigationGenerators = makeTypedGeneratorFn<NavigationProps>()({
    default: () => ({
        items: times(5, (i) => ({
            linkProps: {
                href: `/${i}`,
            },
            text: data[i],
        })),
    }),
    thought: () => ({
        items: times(5, (i) => ({
            linkProps: {
                href: `/${i}`,
            },
            text: thoughtData[i],
        })),
    }),
})
