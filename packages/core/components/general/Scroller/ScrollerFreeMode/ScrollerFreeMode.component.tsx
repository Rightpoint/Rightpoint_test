import { Scrollbar, A11y, FreeMode } from 'swiper'
import { FC, ReactElement, ReactNode } from 'react'
import { ScrollerProps, Scroller } from '../Scroller.component'

export interface ScrollerFreeModeProps extends ScrollerProps {
    children: ReactElement[] | JSX.Element[] | ReactNode
}

/**
 * A scroller that has free mode presets
 */
export const ScrollerFreeMode: FC<ScrollerFreeModeProps> = ({
    size,
    children,
    swiperProps,
    swiperModules,
}) => {
    return (
        <Scroller
            size={size}
            swiperProps={{
                modules: [Scrollbar, A11y, FreeMode, ...(swiperModules || [])],
                spaceBetween: 20,
                freeMode: {
                    enabled: true,
                    minimumVelocity: 0.01,
                    momentum: true,
                    momentumBounce: false,
                    momentumBounceRatio: 1,
                    momentumRatio: 1,
                    momentumVelocityRatio: 0.2,
                    sticky: false,
                },
                slidesPerView: 'auto',
                grabCursor: true,
                scrollbar: { draggable: true },
                centerInsufficientSlides: true,

                ...(swiperProps || {}),
            }}
        >
            {children}
        </Scroller>
    )
}
