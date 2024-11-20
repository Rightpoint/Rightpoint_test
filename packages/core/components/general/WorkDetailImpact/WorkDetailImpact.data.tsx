import styled, { css } from 'styled-components'
import { WorkDetailImpactProps } from './WorkDetailImpact.component'

import { makeTypedGeneratorFn } from '@rightpoint/core/utils'

export const workDetailImpactGenerators =
    makeTypedGeneratorFn<WorkDetailImpactProps>()({
        default: () => ({
            title: 'Impact',
            impacts: [
                {
                    bigText: '80%',
                    description: 'Description',
                },
                {
                    bigText: '80%',
                    description: 'Description',
                },
                {
                    bigText: '80%',
                    description: 'Description',
                },
            ],
        }),
    })
