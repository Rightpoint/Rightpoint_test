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
import {
    FaExpand,
    FaPause,
    FaPlay,
    FaVolumeMute,
    FaVolumeUp,
} from 'react-icons/fa'

const debug = console.debug.bind(console, '[Video.component]')

/**
 * ReactPlayer is not SSR compatible, so we need to dynamically import
 * it to prevent hydration errors.
 */
const ReactPlayer = dynamic(() => import('react-player'), { ssr: false })

class BaseVideoAPI {
    player: any
    isPlaying: boolean
    isMuted: boolean
    setPlaying: (playing: boolean) => void
    setMuted: (muted: boolean) => void

    constructor() {
        this.player = null
        this.setPlaying = noop
        this.setMuted = noop
        this.isMuted = true
        this.isPlaying = false
    }

    play() {
        debug('play')
        this.setPlaying(true)
    }

    pause() {
        debug('pause')
        this.setPlaying(false)
    }

    togglePlay() {
        debug('togglePlay')
        this.setPlaying(!this.isPlaying)
    }

    mute() {
        debug('mute')
        this.setMuted(true)
    }

    unmute() {
        debug('unmute')
        this.setMuted(false)
    }

    toggleMute() {
        debug('toggleMute')
        this.setMuted(!this.isMuted)
    }

    toggleFullscreen() {
        debug('toggleFullscreen')
        console.log('Fullscreen has not been implemented')
    }
}

interface BaseVideoProps {
    videoUrl?: string
    backgroundMode?: boolean
    autoPlay?: boolean
    onReady?: (videoAPI: BaseVideoAPI) => void
    onPlay?: (videoAPI: BaseVideoAPI, e: Event) => void
    onAutoplayFailed?: (videoAPI: BaseVideoAPI) => void
    play?: boolean
    onStateChange?: (state: { isPlaying: boolean; isMuted: boolean }) => void
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
    onAutoplayFailed = noop,
    onReady = noop,
    onPlay = noop,
    autoPlay: _autoPlay,
    // sizerMotionProps,
    // parentAspectRatio,
    onStateChange = noop,
}) => {
    const autoPlay = _autoPlay ?? backgroundMode
    // video aspect ratio requires special handling due to iframes contents not being visible.
    // assumptions must be made about the iframe aspect ratio, then use that ratio to fit into the parent component.
    const ref = useRef<HTMLDivElement>()
    const playerRef = useRef(null)
    const baseVideoAPI = useMemo(() => new BaseVideoAPI(), [])

    const [hasPlayedOnce, setHasPlayedOnce] = useState(false)
    const [playing, setPlaying] = useState(autoPlay)
    const [isMuted, setMuted] = useState(backgroundMode)
    const [isVideoReady, setIsVideoReady] = useState(false)
    const context = useContext(VideoContext)

    useIsomorphicLayoutEffect(() => {
        if (isVideoReady) {
            const handler = () => {
                centerIframeInParent(ref.current)
            }
            handler()
            let autoplayFailedTimeoutId

            if (!hasPlayedOnce) {
                autoplayFailedTimeoutId = setTimeout(() => {
                    debug('Autoplay failed')
                    onAutoplayFailed(baseVideoAPI)
                    setPlaying(false)
                }, 1000)
            }

            window.addEventListener('resize', handler)
            return () => {
                window.removeEventListener('resize', handler)
                if (autoplayFailedTimeoutId) {
                    clearTimeout(autoplayFailedTimeoutId)
                }
            }
        }
    }, [hasPlayedOnce, isVideoReady, ref])

    const enableBackgroundProps = {
        controls: false,
        muted: true,
        playing: true,
        loop: true,
    }

    useEffect(() => {
        baseVideoAPI.setPlaying = setPlaying
        baseVideoAPI.isPlaying = playing
        baseVideoAPI.setMuted = setMuted
        baseVideoAPI.isMuted = isMuted

        onStateChange({
            isPlaying: playing,
            isMuted,
        })
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
                    controls={false}
                    className="react-player"
                    url={videoUrl}
                    {...controlsPropsToSet}
                    volume={1}
                    muted={isMuted}
                    onReady={(player) => {
                        debug('Video is ready')
                        playerRef.current = player
                        baseVideoAPI.player = player
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
                        setHasPlayedOnce(true)
                        /**
                         * Once it's playing, add controls bakc
                         */

                        onPlay(baseVideoAPI, e)
                    }}
                    playing={
                        /**
                         * Play video programmatically if set by context (parent)
                         */
                        context.isPlaying ?? playing
                    }
                    width={'100%'}
                    height={'100%'}
                />
            </s.Video>
        </>
    )
}

const ControlsOverlay = ({
    isPlaying,
    isMuted,
    onTogglePlay,
    onToggleMute,
    onFullscreen,
    enableFullscreen,
}) => {
    return (
        <s.ControlsOverlay onClick={onTogglePlay}>
            <s.ControlsOverlayBottomBar onClick={(e) => e.stopPropagation()}>
                <s.ControlsOverlayButton onClick={onTogglePlay}>
                    {isPlaying ? <FaPause /> : <FaPlay />}
                </s.ControlsOverlayButton>
                <s.ControlsOverlayBarSpacer />
                <s.ControlsOverlayButton onClick={onToggleMute}>
                    {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
                </s.ControlsOverlayButton>
                {enableFullscreen && (
                    <s.ControlsOverlayButton>
                        <FaExpand onClick={onFullscreen} />
                    </s.ControlsOverlayButton>
                )}
            </s.ControlsOverlayBottomBar>
        </s.ControlsOverlay>
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
    hidePlayButton?: boolean
    controls?: boolean
    enableFullscreen?: boolean
}

export const Video = withAspectWrapper<VideoProps>(
    ({
        backgroundMode = true,
        videoUrl,
        videoPreviewUrl,
        posterMultiMediaProps,
        autoPlay: _autoPlay,
        controls,
        enableFullscreen,
    }) => {
        const [videoState, setVideoState] = useState(null)
        const [videoAPI, setVideoAPI] = useState(null)

        const [autoplayFailed, setAutoplayFailed] = useState(false)

        const [hasMainVideoPlayedOnce, setHasMainVideoPlayedOnce] =
            useState(false)

        const [hasPreviewVideoPlayedOnce, setHasPreviewVideoPlayedOnce] =
            useState(false)

        const hasPreviewVideo = !isEmpty(videoPreviewUrl)
        const hasPosterImage = !isEmpty(posterMultiMediaProps)
        const autoPlay =
            _autoPlay ??
            (hasPreviewVideo ? true : hasPosterImage ? false : backgroundMode)
        const showPlayButton =
            hasPreviewVideo || hasPosterImage || autoplayFailed || !autoPlay

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
                    onAutoplayFailed={() => {
                        setAutoplayFailed(true)
                    }}
                    onStateChange={(state) => {
                        setVideoState(state)
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
                {(!showPlayButton || hasMainVideoPlayedOnce) && controls && (
                    <ControlsOverlay
                        {...videoState}
                        onTogglePlay={() => videoAPI.togglePlay()}
                        onToggleMute={() => videoAPI.toggleMute()}
                        enableFullscreen={enableFullscreen}
                        onFullscreen={() => videoAPI.toggleFullscreen()}
                    />
                )}
            </>
        )
    }
)
