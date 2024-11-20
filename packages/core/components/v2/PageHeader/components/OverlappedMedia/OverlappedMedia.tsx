import { FC } from 'react'
import {
    MultiMedia,
    MultiMediaProps,
} from '../../../../general/MultiMedia/MultiMedia.component'
import {
    ContainerBox,
    ContainerWidths,
} from '../../../../layout/RootComponent/container'
import { PageHeaderStyles } from '../../PageHeader.styles'
import {
    BackgroundColors,
    getBackgroundColorHex,
} from '../../../../layout/RootComponent/background-color'

const s = PageHeaderStyles.OverlappedMediaStyles

export const OverlappedMedia: FC<{
    multiMediaProps?: MultiMediaProps
    backgroundColor?: BackgroundColors
}> = ({ multiMediaProps, backgroundColor }) => {
    return (
        <s.OverlappedMedia $color={getBackgroundColorHex({ backgroundColor })}>
            <ContainerBox container={ContainerWidths.Medium}>
                {multiMediaProps && (
                    <MultiMedia
                        {...multiMediaProps}
                        aspectWrapperRatio={16 / 9}
                        aspectWrapperRatioDesktop={16 / 9}
                    />
                )}
            </ContainerBox>
        </s.OverlappedMedia>
    )
}
