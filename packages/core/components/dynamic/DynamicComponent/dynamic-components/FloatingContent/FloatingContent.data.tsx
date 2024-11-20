import styled, { css } from 'styled-components'
import { FloatingContentProps } from './FloatingContent.component'
import { makeTypedGeneratorFn } from '@rightpoint/core/utils'

export const floatingContentGenerators =
    makeTypedGeneratorFn<FloatingContentProps>()({
        default: () => ({}),
    })
