import styled, { css } from 'styled-components'
import { IconEyebrowProps } from './IconEyebrow.component'
import { makeTypedGeneratorFn } from '@rightpoint/core/utils'

export const iconEyebrowGenerators = makeTypedGeneratorFn<IconEyebrowProps>()({
    default: () => ({
        text: 'Modern Digital Workspace',
    }),
})
