import {
    createContext,
    RefObject,
    useContext,
    useEffect,
    useRef,
    useState,
} from 'react'
import { VideoStyles as s } from './Video.styles'
import {
    AspectWrapperProps,
    withAspectWrapper,
} from '../../utils/AspectWrapper/AspectWrapper.component'
import { centerIframeInParent } from './centerChildInParent'
import { useIsomorphicLayoutEffect } from 'framer-motion'
import dynamic from 'next/dynamic'

/**
 * ReactPlayer is not SSR compatible, so we need to dynamically import
 * it to prevent hydration errors.
 */
const ReactPlayer = dynamic(() => import('react-player'), { ssr: false })

export interface VideoProps extends AspectWrapperProps {
    backgroundMode?: boolean
    videoUrl?: string
    videoPreviewUrl?: string
}

type VideoOnReadyCallback = (arg: { ref: RefObject<HTMLDivElement> }) => void

export type VideoContextValues = {
    onReady: VideoOnReadyCallback
    isPlaying?: boolean
}
export const VideoContext = createContext<VideoContextValues>({
    onReady: ({ ref }) => {},
    isPlaying: undefined,
})

export const Video = withAspectWrapper<VideoProps>(
    ({
        videoUrl,
        videoPreviewUrl,
        backgroundMode = true,
        sizerMotionProps,
        // parentAspectRatio,
    }) => {
        // video aspect ratio requires special handling due to iframes contents not being visible.
        // assumptions must be made about the iframe aspect ratio, then use that ratio to fit into the parent component.
        const ref = useRef<HTMLDivElement>()
        const [isVideoReady, setIsVideoReady] = useState(false)
        const context = useContext(VideoContext)
        useIsomorphicLayoutEffect(() => {
            if (isVideoReady) {
                const handler = () => {
                    centerIframeInParent(ref.current)
                }
                handler()
                window.addEventListener('resize', handler)
                return () => {
                    window.removeEventListener('resize', handler)
                }
            }
        }, [isVideoReady, ref])

        const enableBackgroundProps = {
            controls: false,
            muted: true,
            playing: true,
            loop: true,
        }

        const [playing, setPlaying] = useState(false)
        // const [destroyPreview, setDestroyPreview] = useState(false)

        // useEffect(() => {
        //     if (playing) {
        //         setTimeout(() => {
        //             setDestroyPreview(true)
        //         }, 1000)
        //     }
        // }, [playing])

        const enableBackgroundModeOnMainVideo =
            !videoPreviewUrl && backgroundMode

        const hasParentControls = context.isPlaying !== undefined
        let controlsPropsToSet = {
            controls: true,
            muted: false,
            volume: 0.5,
        } as any
        // if it has parent controls, it's not controlled by this component
        if (hasParentControls) {
            controlsPropsToSet = {
                muted: false,
                volume: 0.5,
            }
        } else if (enableBackgroundModeOnMainVideo) {
            // then play video
            controlsPropsToSet = enableBackgroundProps
        }

        return (
            <>
                <s.Video ref={ref} data-hint="parent">
                    {/* TODO: Preview video layer, can be different size */}
                    {/* TODO: Defer main player loading until play click */}
                    {/* TODO: Animate from preview dimensions to live dimensions */}
                    <ReactPlayer
                        controls={false}
                        className="react-player"
                        url={videoUrl}
                        {...controlsPropsToSet}
                        onReady={(player) => {
                            setIsVideoReady(true)
                            centerIframeInParent(ref.current)
                            /**
                             * Pass the video ref to context, so that parents can trigger resize
                             * directly to the DOM element without renders.
                             */
                            context.onReady({
                                ref: ref,
                            })
                        }}
                        onPlay={() => {
                            /**
                             * Once it's playing, add controls bakc
                             */
                        }}
                        playing={
                            /**
                             * Play video programmatically if set by context (parent)
                             */
                            context.isPlaying ?? enableBackgroundModeOnMainVideo
                                ? true
                                : playing
                        }
                        width={'100%'}
                        height={'100%'}
                    />
                </s.Video>
            </>
        )
    }
)

export const VideoWithPreview = ({ videoPreviewUrl }) => {
    const [playing, setPlaying] = useState(false)
    const [destroyPreview, setDestroyPreview] = useState(false)

    useEffect(() => {
        if (playing) {
            setTimeout(() => {
                setDestroyPreview(true)
            }, 1000)
        }
    }, [playing])

    return (
        <s.VideoWithPreview>
            {!destroyPreview && (
                <s.Preview
                    $isPlaying={playing}
                    onClick={() => {
                        setPlaying(true)
                    }}
                >
                    <ReactPlayer
                        className="react-player"
                        url={videoPreviewUrl}
                        muted={true}
                        playing={true}
                        loop={true}
                        controls={false}
                    />
                    <s.Play>Play</s.Play>
                </s.Preview>
            )}
        </s.VideoWithPreview>
    )
}
