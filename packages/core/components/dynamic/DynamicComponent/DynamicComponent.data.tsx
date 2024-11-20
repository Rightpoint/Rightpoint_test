import styled, { css } from 'styled-components'
import { DynamicComponentProps } from './DynamicComponent.component'
import { DynamicComponentType } from './DynamicComponentType'
import { makeTypedGeneratorFn } from '@rightpoint/core/utils'

export const dynamicComponentGenerators =
    makeTypedGeneratorFn<DynamicComponentProps>()({
        default: () => ({
            type: DynamicComponentType.Test,
        }),
    })
