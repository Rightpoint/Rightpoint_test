import { RootComponentProps } from './RootComponent.component'
import { makeTypedGeneratorFn } from '@rightpoint/core/utils'
import { multiMediaGenerators } from '../../general/MultiMedia/MultiMedia.data'
import { BackgroundColors, ContentColors } from './background-color'
import { ContainerWidths } from './container'
import { BackgroundTreatmentLevels } from '../BackgroundMedia/BackgroundMedia.component'

export const rootComponentGenerators = makeTypedGeneratorFn<
    Partial<RootComponentProps>
>()({
    default: () => ({}),
    background: (
        { backgroundColor }: { backgroundColor: BackgroundColors } = {
            backgroundColor: BackgroundColors.Black,
        }
    ) => ({
        background: {
            backgroundColor,
        },
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

    spacing: () => {
        return {
            marginSize: 'medium',
        }
    },
})
