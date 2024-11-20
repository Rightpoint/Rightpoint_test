import { useInView } from 'framer-motion'
import { FC, useRef } from 'react'
import {
    MultiMedia,
    MultiMediaProps,
} from '../../general/MultiMedia/MultiMedia.component'
import { ContentColors } from '../RootComponent/background-color'
import { BackgroundMediaStyles as s } from './BackgroundMedia.styles'

export enum BackgroundTreatmentLevels {
    None = 'None',
    Subtle = 'Subtle',
    Normal = 'Normal',
    Strong = 'Strong',
}

export interface BackgroundMediaProps {
    treatmentLevel?: BackgroundTreatmentLevels
    contentColor?: ContentColors
    multiMediaProps: MultiMediaProps
    blur?: boolean
}

export const BackgroundMedia: FC<BackgroundMediaProps> = ({
    treatmentLevel,
    contentColor,
    blur,
    multiMediaProps,
}) => {
    const ref = useRef()
    const isInView = useInView(ref, {
        once: false,
    })

    if (!multiMediaProps) {
        return null
    }

    return (
        <s.BackgroundMedia
            ref={ref}
            $treatmentLevel={treatmentLevel}
            $contentColor={contentColor}
            $isInView={isInView}
            $shouldBlurBackground={blur}
        >
            <MultiMedia {...multiMediaProps} />
        </s.BackgroundMedia>
    )
}
