import { ScrollerStyles as s } from './Scroller.styles'
import { A11y } from 'swiper'
import { Children, FC, ReactNode } from 'react'

// https://github.com/import-js/eslint-plugin-import/issues/2266
// eslint-disable-next-line import/no-unresolved
import { Swiper, SwiperProps, SwiperSlide } from 'swiper/react'
// eslint-disable-next-line import/no-unresolved
import 'swiper/css/bundle'
import { cssVarNames } from '@rightpoint/core/styles'
import { SwiperModule } from 'swiper/types'

const vars = cssVarNames.components.scroller

export const Sizes = {
    Small: 'Small',
    Medium: 'Medium',
    Large: 'Large',
} as const

const SizeVariants = {
    [Sizes.Small]: 300,
    [Sizes.Medium]: 350,
    [Sizes.Large]: 400,
}
export interface ScrollerProps {
    size?: keyof typeof Sizes
    swiperProps?: SwiperProps
    swiperModules?: SwiperModule[]
    children?: ReactNode
}

/**
 * A basic scroller
 */
export const Scroller: FC<ScrollerProps> = ({
    size,
    children,
    swiperProps,
    swiperModules,
}) => {
    return (
        <s.Scroller
            cssVars={size && `${vars.width}: ${SizeVariants[size]}px;`}
            withScrollbar={Boolean(swiperProps?.scrollbar)}
        >
            <Swiper
                modules={[A11y, ...(swiperModules || [])]}
                {...(swiperProps || {})}
            >
                {Children.map(children, (child, index) => (
                    <SwiperSlide key={index}>{child}</SwiperSlide>
                ))}
            </Swiper>
        </s.Scroller>
    )
}
