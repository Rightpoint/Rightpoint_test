import styled, { css } from 'styled-components'
import { PardotProps } from './Pardot.component'

import { makeTypedGeneratorFn } from '@rightpoint/core/utils'

export const pardotGenerators = makeTypedGeneratorFn<PardotProps>()({
    default: () => ({
        // this is the test form
        embedUrl: 'https://go.rightpoint.com/l/141911/2023-03-22/c136qq',
    }),
})
