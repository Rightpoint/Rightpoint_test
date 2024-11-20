import { useWindowDimensions } from '@rightpoint/core/utils'
import { motion, useTransform } from 'framer-motion'
import { FC, RefObject, useContext, useEffect, useMemo, useState } from 'react'
import {
    MultiMedia,
    MultiMediaProps,
} from '../../../../general/MultiMedia/MultiMedia.component'
import { ScrollBasedAnimationContainer } from '../../../../general/ScrollBasedAnimationContainer/ScrollBasedAnimationContainer.component'
import { centerIframeInParentIfExists } from '../../../../general/Video/centerChildInParent'
import { VideoContext } from '../../../../general/Video/Video.component'
import { ScrollZoomStyles as s } from './ScrollZoom.styles'
import { GrPlayFill } from 'react-icons/gr'
import { scrollToY } from './scroll-to-smooth'

interface ScrollZoomMultiMediaProps {
    multiMediaProps: MultiMediaProps
}
export const ScrollZoomMultiMedia: FC<ScrollZoomMultiMediaProps> = ({
    multiMediaProps,
}) => {
    const { animationProgress } = useContext(
        ScrollBasedAnimationContainer.Context
    )

    /**
     * Scale the video on scroll.
     * Automate the scroll later
     */
    const startScale = 0.1
    const endScale = 1

    const animationScrollProgress = useTransform(
        animationProgress,
        [
            // start range
            0,
            // end scaling here
            0.4,
            // pause until here
            0.6,
            // animate to target over this much distance
            0.8,
        ],
        [
            // start range
            0, 1, 1,
            // end
            2,
        ],
        {}
    )
    const [isAfterScroll, setIsAfterScroll] = useState(false)
    animationScrollProgress.onChange((value) => {
        const isPast = value > 1
        if (isPast && !isAfterScroll) {
            setIsAfterScroll(true)
        }
        if (!isPast && isAfterScroll) {
            setIsAfterScroll(false)
        }
    })

    /**
     * Scale the media on scroll down
     */
    const scaleOnScroll = useTransform(
        animationScrollProgress,
        [
            // start range
            0, 0.5, 0.9, 1, 1,
            // end
            2,
        ],
        [
            // start range
            startScale,
            0.5,
            0.5,
            1,
            1,
            // end
            endScale,
        ]
    )

    const { width, height } = useWindowDimensions()
    /**
     * Scale the media to the middle of the screen on scroll
     */
    const translateYOnScroll = useTransform(
        animationScrollProgress,
        [0, 0.5],
        [height * -1, 0],
        {}
    )

    /**
     * Video must go from target (ideal 16/9 ratio) to full screen
     * From [x, y] range, progress from start to end aspect.
     *
     * Start at 16/9, end at screen aspect.
     */
    const startAspect = 16 / 9
    const targetAspect = width / height
    const videoAspectOnScroll = useTransform(
        animationProgress,
        [0.3, 0.5],
        [startAspect, targetAspect],
        {}
    )
    /**
     * Transform the video aspect ratio to the padding-bottom equivalent
     */
    const aspectRatioPadding = useTransform(
        videoAspectOnScroll,
        [startAspect, targetAspect],
        [(1 / startAspect) * 100 + '%', (1 / targetAspect) * 100 + '%']
    )

    /**
     * Trigger a video resize when the aspect ratio changes.
     *
     * Note motion values only trigger on changes to the _value_, not on scroll,
     * so it's a reliable place to trigger expensive calculations.
     *
     * It is also very important this calculation does not happen in React state
     */
    const [videoRef, setVideoRef] = useState<RefObject<HTMLDivElement>>()
    useEffect(() => {
        if (videoRef && !isAfterScroll) {
            const handler = () => {
                centerIframeInParentIfExists(videoRef.current)
            }
            /**
             * Note: It was attempted to trigger resize on motionValue change, but it is so debounced
             * it does not trigger enough.
             *
             * Instead, add an expensive scroll handler only until the user scrolls past
             */
            window.addEventListener('scroll', handler)
            return () => {
                window.removeEventListener('scroll', handler)
            }
        }
    }, [videoRef, isAfterScroll])

    const [isPlaying, setIsPlaying] = useState(false)
    return (
        <motion.div
            style={{
                zIndex: 11,
                position: 'relative',
                opacity: 1,
            }}
            transition={{
                duration: 2,
            }}
        >
            <s.ScrollZoomVideo
                transition={{
                    delay: 3,
                }}
                style={{
                    scale: scaleOnScroll,
                    bottom: translateYOnScroll,
                }}
                as={motion.div}
            >
                <VideoContext.Provider
                    value={{
                        onReady: ({ ref }) => {
                            setVideoRef(ref)
                        },
                        isPlaying: isPlaying,
                    }}
                >
                    {/* we need to trigger video resize on  */}
                    <MultiMedia
                        {...multiMediaProps}
                        sizerMotionProps={{
                            // these are props for the aspect wrapper sizer motion.div
                            style: {
                                paddingBottom: aspectRatioPadding,
                            },
                        }}
                    />

                    <s.Button
                        onClick={() => {
                            setIsPlaying(true)
                            scrollToY(height, 100, 'easeFromTo', () => {
                                console.log('done scrolling')
                            })
                        }}
                        as={motion.button}
                        animate={{
                            opacity: isPlaying ? 0 : 1,
                        }}
                    >
                        Play Video <GrPlayFill />
                    </s.Button>
                </VideoContext.Provider>

                <s.MediaText>
                    Defining and executing the vision for the next-
                    <br />
                    generation customer experience
                </s.MediaText>
            </s.ScrollZoomVideo>
        </motion.div>
    )
}
