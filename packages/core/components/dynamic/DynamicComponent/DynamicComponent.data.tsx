import styled, { css } from 'styled-components'
import { DynamicComponentProps } from './DynamicComponent.component'
import { DynamicComponentType } from './DynamicComponent.all-dynamic-component-map'
import { makeTypedGeneratorFn } from '@rightpoint/core/utils'
import { headerGenerators } from '../../v2/Header/Header.data'

export const dynamicComponentGenerators =
    makeTypedGeneratorFn<DynamicComponentProps>()({
        default: () => ({
            headerProps: {
                title: 'Dynamic Header',
                body: 'Dynamic header body',
                variant: 'Header1',
            },
            type: DynamicComponentType.Test,
        }),
    })
