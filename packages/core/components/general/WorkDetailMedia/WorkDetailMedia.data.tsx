import { times } from 'lodash'
import styled, { css } from 'styled-components'
import { multiMediaGenerators } from '../MultiMedia/MultiMedia.data'
import { WorkDetailMediaProps } from './WorkDetailMedia.component'

import { makeTypedGeneratorFn } from '@rightpoint/core/utils'

export const workDetailMediaGenerators =
    makeTypedGeneratorFn<WorkDetailMediaProps>()({
        default: () => ({
            multiMediasProps: times(1, () =>
                multiMediaGenerators.randomImage()
            ),
        }),
        two: () => ({
            multiMediasProps: times(2, () =>
                multiMediaGenerators.randomImage()
            ),
            columns: 2,
        }),
        threeOffset: () => ({
            multiMediasProps: times(3, () =>
                multiMediaGenerators.randomImage()
            ),
            columns: 3,
            gap: 20,
            verticalOffset: 110,
        }),
        fourUp: () => ({
            multiMediasProps: times(4, () =>
                multiMediaGenerators.randomImage()
            ),
            columns: 2,
            gap: 20,
        }),
    })
