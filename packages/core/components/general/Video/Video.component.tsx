import {
    createContext,
    RefObject,
    useCallback,
    useContext,
    useEffect,
    useMemo,
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
import { MultiMedia, MultiMediaProps } from '../MultiMedia/MultiMedia.component'
import { isEmpty, noop } from 'lodash'

/**
 * ReactPlayer is not SSR compatible, so we need to dynamically import
 * it to prevent hydration errors.
 */
const ReactPlayer = dynamic(() => import('react-player'), { ssr: false })

class BaseVideoAPI {
    isPlaying: boolean
    isMuted: boolean
    setPlaying: (playing: boolean) => void
    setMuted: (muted: boolean) => void

    constructor() {
        this.setPlaying = noop
        this.setMuted = noop
        this.isMuted = true
        this.isPlaying = false
    }

    play() {
        this.setPlaying(true)
    }

    pause() {
        this.setPlaying(false)
    }

    mute() {
        this.setMuted(true)
    }

    unmute() {
        this.setMuted(false)
    }
}

interface BaseVideoProps {
    videoUrl?: string
    backgroundMode?: boolean
    autoPlay?: boolean
    onReady?: (videoAPI: BaseVideoAPI) => void
    onPlay?: () => void
    play?: boolean
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

export const BaseVideo: React.FC<BaseVideoProps> = ({
    videoUrl,
    backgroundMode = true,
    onReady = noop,
    onPlay = noop,
    autoPlay: _autoPlay,
    // sizerMotionProps,
    // parentAspectRatio,
}) => {
    const autoPlay = _autoPlay ?? backgroundMode
    // video aspect ratio requires special handling due to iframes contents not being visible.
    // assumptions must be made about the iframe aspect ratio, then use that ratio to fit into the parent component.
    const ref = useRef<HTMLDivElement>()
    const playerRef = useRef(null)
    const baseVideoAPI = useMemo(() => new BaseVideoAPI(), [])

    const [isMuted, setMuted] = useState(backgroundMode)
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

    useEffect(() => {
        baseVideoAPI.setPlaying = setPlaying
        baseVideoAPI.isPlaying = playing
        baseVideoAPI.setMuted = setMuted
        baseVideoAPI.isMuted = isMuted
    }, [playing, setPlaying, isMuted, setMuted])

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
    } else if (backgroundMode) {
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
                    ref={(ref) => (playerRef.current = ref)}
                    controls={false}
                    className="react-player"
                    url={videoUrl}
                    {...controlsPropsToSet}
                    muted={isMuted}
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

                        onReady(baseVideoAPI)
                    }}
                    onPlay={(e) => {
                        /**
                         * Once it's playing, add controls bakc
                         */

                        onPlay(e)
                    }}
                    playing={
                        /**
                         * Play video programmatically if set by context (parent)
                         */
                        context.isPlaying ?? autoPlay ? true : playing
                    }
                    width={'100%'}
                    height={'100%'}
                />
            </s.Video>
        </>
    )
}

const PosterImage = ({ image, visible }) => {
    return (
        <s.PosterImage $visible={visible}>
            <MultiMedia {...image} />
        </s.PosterImage>
    )
}

const PlayButton = ({ onClick, visible }) => {
    const clickHandler = (e) => {
        e.stopPropagation()
        onClick && onClick()
    }

    return (
        <s.PlayButtonOverlay onClick={clickHandler} $visible={visible}>
            <s.PlayButton onClick={clickHandler}>Play</s.PlayButton>
        </s.PlayButtonOverlay>
    )
}

const PreviewVideo = ({ visible, videoUrl, onReady = noop, onPlay = noop }) => {
    const [mountVideo, setMountVideo] = useState(true)

    useEffect(() => {
        if (visible) {
            setMountVideo(true)
        } else {
            const timeoutId = setTimeout(() => {
                setMountVideo(false)
            }, 3000)

            return () => {
                clearTimeout(timeoutId)
            }
        }
    }, [visible])

    return (
        <s.Preview $visible={visible}>
            {mountVideo && (
                <BaseVideo
                    {...{
                        backgroundMode: true,
                        videoUrl,

                        autoPlay: true,
                        onPlay,
                        onReady,
                    }}
                />
            )}
        </s.Preview>
    )
}

export interface VideoProps extends AspectWrapperProps {
    backgroundMode?: boolean
    videoUrl?: string
    videoPreviewUrl?: string
    posterMultiMediaProps?: MultiMediaProps
    autoPlay?: boolean
}

export const Video = withAspectWrapper<VideoProps>(
    ({
        backgroundMode = true,
        videoUrl,
        videoPreviewUrl,
        posterMultiMediaProps,
        autoPlay: _autoPlay,
    }) => {
        const [videoAPI, setVideoAPI] = useState(null)

        const [hasMainVideoPlayedOnce, setHasMainVideoPlayedOnce] =
            useState(false)

        const [hasPreviewVideoPlayedOnce, setHasPreviewVideoPlayedOnce] =
            useState(false)

        const hasPreviewVideo = !isEmpty(videoPreviewUrl)
        const hasPosterImage = !isEmpty(posterMultiMediaProps)
        const showPlayButton = hasPreviewVideo || hasPosterImage
        const autoPlay =
            _autoPlay ??
            (hasPreviewVideo ? true : hasPosterImage ? false : backgroundMode)

        return (
            <>
                <BaseVideo
                    {...{
                        backgroundMode,
                        videoUrl,
                        autoPlay: hasPreviewVideo ? false : autoPlay,
                    }}
                    onPlay={() => {
                        setHasMainVideoPlayedOnce(true)
                    }}
                    onReady={(videoAPI) => {
                        setVideoAPI(videoAPI)
                    }}
                />
                {hasPreviewVideo && (
                    <PreviewVideo
                        visible={!hasMainVideoPlayedOnce}
                        videoUrl={videoPreviewUrl}
                        onPlay={() => {
                            setHasPreviewVideoPlayedOnce(true)
                        }}
                    />
                )}
                {hasPosterImage && (
                    <PosterImage
                        visible={
                            !hasMainVideoPlayedOnce &&
                            !hasPreviewVideoPlayedOnce
                        }
                        image={posterMultiMediaProps}
                    />
                )}
                {showPlayButton && (
                    <PlayButton
                        visible={!hasMainVideoPlayedOnce}
                        onClick={() => {
                            videoAPI.play()
                            videoAPI.unmute()
                        }}
                    />
                )}
            </>
        )
    }
)
