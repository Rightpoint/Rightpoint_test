import styled, { css } from 'styled-components'
import { TabsNavProps } from './TabsNav.component'
import { makeTypedGeneratorFn } from '@rightpoint/core/utils'
import { Link } from '../../links/Link/Link.component'

export const tabsNavGenerators = makeTypedGeneratorFn<TabsNavProps>()({
    default: () => ({
        linksProps: [
            {
                text: 'Solutions',
                href: '/solutions',
            },
            {
                text: 'Industries',
                href: '/industries',
            },
            {
                text: 'Everything',
                href: '/everything',
            },
        ],
    }),
    onClick: () => {
        return {
            linksProps: [
                {
                    text: 'Click me',
                    href: '',
                    nextProps: {
                        onClick: (ev) => {
                            ev.preventDefault()
                            alert('Clicked!')
                        },
                    },
                },
            ],
        }
    },
})
