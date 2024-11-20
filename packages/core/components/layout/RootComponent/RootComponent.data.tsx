import { RootComponentWrapperProps } from './RootComponent.component'
import { makeTypedGeneratorFn } from '@rightpoint/core/utils'
import { multiMediaGenerators } from '../../general/MultiMedia/MultiMedia.data'
import { ContentColors } from './background-color'
import { ContainerWidths } from './container'
import { BackgroundTreatmentLevels } from '../BackgroundMedia/BackgroundMedia.component'

export const rootComponentGenerators =
    makeTypedGeneratorFn<RootComponentWrapperProps>()({
        default: () => ({}),
        background: () => ({
            // we'll iterate through all colors in story
            // background: {
            //     backgroundColor: BackgroundColors.Black,
            // },
            container: ContainerWidths.Default,
        }),
        backgroundMedia: () => ({
            background: {
                contentColor: ContentColors.Dark,
                media: {
                    multiMediaProps: multiMediaGenerators.default(),
                    blur: true,
                    treatmentLevel: BackgroundTreatmentLevels.Normal,
                },
            },
            container: ContainerWidths.Default,
        }),
    })
