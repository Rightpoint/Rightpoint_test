import styled, { css } from 'styled-components'
import {
    BackgroundMediaProps,
    BackgroundTreatmentLevels,
} from './BackgroundMedia.component'
import { makeTypedGeneratorFn } from '@rightpoint/core/utils'
import { multiMediaGenerators } from '../../general/MultiMedia/MultiMedia.data'
import { ContentColors } from '../RootComponent/background-color'

export const backgroundMediaGenerators =
    makeTypedGeneratorFn<BackgroundMediaProps>()({
        default: () => ({
            multiMediaProps: multiMediaGenerators.default(),
            contentColor: ContentColors.Dark,
            blur: true,
            treatmentLevel: BackgroundTreatmentLevels.Normal,
        }),
    })
