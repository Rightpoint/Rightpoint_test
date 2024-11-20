import { fakerWithSeed } from '@rightpoint/data-generators'
import styled, { css } from 'styled-components'
import { LinkProps } from './Link.component'
import { makeTypedGeneratorFn } from '@rightpoint/core/utils'

export const linkGenerators = makeTypedGeneratorFn<LinkProps>()({
    default: () => ({
        href: fakerWithSeed.internet.url(),
        text: fakerWithSeed.lorem.words(3),
        meta: {
            noFollow: false,
            opensInNewTab: false,
        },
    }),
})
