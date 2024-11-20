import styled, { css } from 'styled-components'
import { ComponentGroupProps } from './ComponentGroup.component'
import { makeTypedGeneratorFn } from '@rightpoint/core/utils'

export const componentGroupGenerators =
    makeTypedGeneratorFn<ComponentGroupProps>()({
        default: () => ({
            componentsProps: [],
        }),
    })
