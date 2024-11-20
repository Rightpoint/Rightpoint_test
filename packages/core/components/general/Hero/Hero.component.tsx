import { FC } from 'react'
import { ImageProps } from '../Image/Image.component'
import { MultiMedia, MultiMediaProps } from '../MultiMedia/MultiMedia.component'

export const HeroContentWidths = {
    FullBleed: 'FullBleed',
    FullWidth: 'FullWidth',
    Large: 'Large',
    Medium: 'Medium',
    Small: 'Small',
} as const

export interface HeroProps {}

/**
 * @deprecated
 */
export const Hero: FC<HeroProps> = ({}) => {
    return <>Obsoleted</>
}

export interface HeroContentfulProps {
    title?: string
    subtitle?: string
    multiMediaProps?: MultiMediaProps
    imageProps?: ImageProps
    text?: string
    creditProps?: {
        name?: string
        title?: string
        linkProps?: any
    }
}

/**
 * @deprecated - from v1 designs
 */
export const HeroContentful: FC<HeroContentfulProps> = ({}) => {
    return <Hero />
}
