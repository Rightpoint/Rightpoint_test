import { FC, ReactNode, useEffect, useState } from 'react'
import { Autoplay } from 'swiper'
import { SwiperProps } from 'swiper/react'
import { ScrollerFreeMode } from '../ScrollerFreeMode/ScrollerFreeMode.component'
import { ScrollerAutoScrollStyles as s } from './ScrollerAutoScroll.styles'

export interface ScrollerAutoScrollProps {
    speed?: number
    swiperProps?: SwiperProps
    children?: ReactNode
}

export const ScrollerAutoScroll: FC<ScrollerAutoScrollProps> = ({
    children,
    speed = 12000,
    swiperProps,
}) => {
    const [autoplaying, setAutoplaying] = useState(true)
    const [resumeId, setResumeId] = useState(null)

    useEffect(() => {
        return () => {
            // clear timeouts
            clearTimeout(resumeId)
        }
    }, [resumeId])

    return (
        <s.ScrollerAutoScroll autoplaying={autoplaying}>
            <ScrollerFreeMode
                swiperProps={{
                    autoplay: {
                        delay: 0,
                        disableOnInteraction: true,
                    },
                    loop: true,
                    speed: autoplaying ? speed : 500,
                    // reduce transitions if not autoplaying
                    onAutoplayStop: (swiper) => {
                        setAutoplaying(false)

                        // resume after a bit
                        setResumeId(
                            setTimeout(() => {
                                setAutoplaying(true)
                                swiper.autoplay.start()
                            }, 4000)
                        )
                    },
                    onAutoplayStart: (swiper) => {
                        setAutoplaying(true)
                    },
                    scrollbar: false,
                    ...(swiperProps || {}),
                }}
                swiperModules={[Autoplay]}
            >
                {children}
            </ScrollerFreeMode>
        </s.ScrollerAutoScroll>
    )
}
