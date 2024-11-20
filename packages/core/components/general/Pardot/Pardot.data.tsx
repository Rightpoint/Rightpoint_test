import styled, { css } from 'styled-components'
import { PardotProps } from './Pardot.component'

import { makeTypedGeneratorFn } from '@rightpoint/core/utils'

export const pardotGenerators = makeTypedGeneratorFn<PardotProps>()({
    default: () => ({
        embedUrl: '//go.rightpoint.com/l/141911/2021-03-10/9f9h4t',
    }),
})
