import { Composition } from 'atomic-layout'
import { FC } from 'react'
import {
    MultiMedia,
    MultiMediaProps,
    MultiMediaTypes,
} from '../../../../general/MultiMedia/MultiMedia.component'
import { BackgroundColors } from '../../../../layout/RootComponent/background-color'
import type { BackgroundProps } from './FloatingImageText.component'
import { FloatingImageTextStyles as s } from './FloatingImageText.styles'

export interface FloatingImagesProps {
    multiMediasProps?: MultiMediaProps[]
    backgroundProps: BackgroundProps
}
export const FloatingImages: FC<FloatingImagesProps> = ({
    multiMediasProps: multiMediasProps,
    backgroundProps,
}) => {
    return (
        <Composition as={s.FloatingImages}>
            {multiMediasProps.map((multiMediaProps, index) => (
                <MultiMedia {...multiMediaProps} key={index} />
            ))}
            <s.FloatingImagesBg
                style={{
                    // how do we control this?
                    backgroundColor: `var(--${backgroundProps?.color})`,
                }}
            />
        </Composition>
    )
}
