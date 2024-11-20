import {
    createContext,
    FC,
    RefObject,
    SyntheticEvent,
    useContext,
    useEffect,
    useMemo,
    useReducer,
    useRef,
    useState,
} from 'react'
import { VideoStyles as s } from './Video.styles'
import {
    AspectWrappedComponentProps,
    AspectWrapperProps,
    withAspectWrapper,
} from '../../utils/AspectWrapper/AspectWrapper.component'
import { centerIframeInParentIfExists } from './centerChildInParent'
import { useIsomorphicLayoutEffect } from 'framer-motion'
import dynamic from 'next/dynamic'
import { MultiMediaProps } from '../MultiMedia/MultiMedia.component'
import { isEmpty, noop } from 'lodash'
import { MultiMediaContext } from '../MultiMedia/MultiMedia.context'
import {
    createLogLocalDevOnlyFn,
    isLocalDevelopmentEnvironment,
    logLocalDevOnly,
} from '@rightpoint/core/utils'

const localDevLogBound = createLogLocalDevOnlyFn({
    enabled: false,
    namespace: 'Video.component',
    logLevel: 'debug',
})

/**
 * ReactPlayer is not SSR compatible, so we need to dynamically import
 * it to prevent hydration errors.
 */
const ReactPlayer = dynamic(() => import('react-player'), { ssr: false })

class BaseVideoAPI {
    isPlaying: boolean
    isMuted: boolean
    isReady: boolean

    setPlayingReact: (playing: boolean) => void
    setMutedReact: (muted: boolean) => void
    player: any

    constructor() {
        this.setPlayingReact = noop
        this.setMutedReact = noop
        this.isMuted = true
        this.isPlaying = false
        this.isReady = false
    }

    /**
     * Set is ready state when react player finishes loading.
     * Currently used by the parent Video component to determine when it's ready to show a
     * play or unmute button.
     */
    setIsReady(player) {
        this.isReady = true
        this.player = player
    }

    setPlaying(bool: boolean) {
        this.setPlayingReact(bool)
        this.isPlaying = bool
    }

    setMuted(bool: boolean) {
        this.setMutedReact(bool)
        this.isMuted = bool
    }
    play() {
        this.setPlaying(true)
    }

    pause() {
        this.setPlaying(false)
    }

    toggle() {
        this.setPlaying(!this.isPlaying)
        this.unmute()
    }

    mute() {
        this.setMuted(true)
    }

    unmute() {
        this.setMuted(false)
    }
}

const videoApiDefault = new BaseVideoAPI()

interface BaseVideoProps {
    videoUrl?: string
    /**
     * Background mode does: autoplay, removes controls, mutes, and loops
     */
    backgroundMode?: boolean
    autoPlay?: boolean

    play?: boolean
    /**
     * Show unmute button if autoplay succeeded.
     * Can be set explicitly per video, or by parent component context.
     */
    showUnmute?: boolean
    loop?: boolean

    /**
     * Optional callbacks to control video from parent components
     */
    handleOnReady?: (videoAPI: BaseVideoAPI) => void
    handleOnPlay?: (e: Event) => void
}

type VideoOnReadyCallback = (arg: { ref: RefObject<HTMLDivElement> }) => void

/**
 * @deprecated -- used in old ScrollZoom component
 */
export type VideoContextValues = {
    onReady: VideoOnReadyCallback
    isPlaying?: boolean
}
/**
 * @deprecated -- used in old ScrollZoom component
 */
export const VideoContext = createContext<VideoContextValues>({
    onReady: ({ ref }) => {},
    isPlaying: undefined,
})

/**
 * Base video component that handles per-video logic.
 *
 * It is separated from the Video component, which itself might inject multiple instances such as a Preview video into the page.
 */
export const BaseVideo: React.FC<
    BaseVideoProps & Partial<AspectWrappedComponentProps>
> = ({
    videoUrl,
    backgroundMode = true,

    autoPlay: _autoPlay,
    parentAspectRatio,
    showUnmute,
    loop,

    // optional parent callbacks
    handleOnReady = noop,
    handleOnPlay = noop,
}) => {
    const autoPlay = _autoPlay ?? backgroundMode
    // video aspect ratio requires special handling due to iframe contents not being visible.
    // assumptions must be made about the iframe aspect ratio, then use that ratio to fit into the parent component.
    const ref = useRef<HTMLDivElement>()

    const baseVideoAPI = useMemo(() => new BaseVideoAPI(), [])

    const [isMuted, setMuted] = useState(backgroundMode)
    const [isVideoReady, setIsVideoReady] = useState(false)
    const videoContext = useContext(VideoContext)
    const multiMediaContext = useContext(MultiMediaContext)

    /**
     * Center iFrame in parent aspect, if applicable (i.e. Vimeo/iframe detected)
     */
    useIsomorphicLayoutEffect(() => {
        const handler = () => {
            centerIframeInParentIfExists(ref.current)
            // logLocalDevOnly("Resizing iframe's parent")
        }
        handler()
        window.addEventListener('resize', handler)
        return () => {
            window.removeEventListener('resize', handler)
        }
    }, [isVideoReady, ref])

    const [playing, setPlaying] = useState(autoPlay)

    useEffect(() => {
        baseVideoAPI.setPlayingReact = setPlaying
        baseVideoAPI.isPlaying = playing
        baseVideoAPI.setMutedReact = setMuted
        baseVideoAPI.isMuted = isMuted
    }, [playing, setPlaying, isMuted, setMuted])

    return (
        <>
            <s.Video
                ref={ref}
                data-hint="parent"
                onClick={() => {
                    baseVideoAPI.toggle()
                }}
            >
                {/* Show Unmute button on select videos that are not intended to be purely background */}
                {(showUnmute ?? multiMediaContext.showUnmute) && (
                    <PlayButton
                        text="Play"
                        visible={baseVideoAPI.isPlaying === true && isMuted}
                        handleClick={() => {
                            baseVideoAPI.unmute()
                            setMuted(false)
                        }}
                    />
                )}
                <ReactPlayer
                    className="react-player"
                    url={videoUrl}
                    loop={loop}
                    muted={isMuted}
                    {...getControlsProps()}
                    onReady={(player) => {
                        setIsVideoReady(true)

                        /**
                         * Center iframe (such as Vimeo) in parent like background "cover"
                         */
                        parentAspectRatio &&
                            centerIframeInParentIfExists(ref.current)
                        /**
                         * Pass the video ref to context, so that parents can trigger resize
                         * directly to the DOM element without renders.
                         */
                        videoContext.onReady({
                            ref: ref,
                        })

                        handleOnReady(baseVideoAPI)

                        baseVideoAPI.setIsReady(player)
                    }}
                    onPlay={() => {
                        handleOnPlay()
                    }}
                    onEnded={() => {
                        localDevLogBound(
                            'On ended -- if not looped, should start back at beginning and show not playing.'
                        )
                    }}
                    playing={
                        /**
                         * Play video programmatically if set by context (parent)
                         */
                        videoContext.isPlaying ??
                        // otherwise, set to API play state
                        baseVideoAPI.isPlaying
                    }
                    playsinline
                    width={'100%'}
                    height={'100%'}
                />
            </s.Video>
        </>
    )

    type ControlsProps = {
        controls?: boolean
        muted?: boolean
        volume?: number
        playing?: boolean
        loop?: boolean
    }
    /**
     *
     * @returns controls props such as show controls, muted, volume, playing state, background mode
     */
    function getControlsProps(): ControlsProps {
        const hasParentControls = videoContext.isPlaying !== undefined

        const defaultControls = {
            controls: true,
            muted: false,
            volume: 0.5,
        }
        let controls: Partial<ControlsProps> = defaultControls

        // if it has parent controls, it's not controlled by this component
        if (hasParentControls) {
            localDevLogBound('Has parental controls')
            controls = {
                muted: false,
                volume: 0.5,
            }
        } else if (!isMuted) {
            localDevLogBound('Not muted')
            // if it's not muted, it means:
            // 1: it was clicked to play
            // 2: it was clicked to unmute
            controls = {
                muted: false,
                volume: 0.5, // this is required for muted=false to work
                controls: true,
            }
        } else if (backgroundMode) {
            localDevLogBound('Background mode')
            // if it's background mode: it's muted, no controls, auto play, and loop.
            controls = {
                controls: false,
                muted: true,
                playing: true,
                loop: true,
            }
        }

        localDevLogBound(`Video controls for ${videoUrl}:`, controls)
        return controls
    }
}

interface PlayButtonProps {
    handleClick?: (e: SyntheticEvent<HTMLButtonElement>) => void
    visible?: boolean
    text?: string
}
const PlayButton: FC<PlayButtonProps> = ({
    handleClick: handleClick,
    visible,
    text,
}) => {
    const clickHandler = (e) => {
        e.stopPropagation()
        handleClick && handleClick(e)
    }

    return (
        <s.PlayButtonOverlay onClick={clickHandler} $visible={visible}>
            <s.PlayButton onClick={clickHandler}>{text || 'Play'}</s.PlayButton>
        </s.PlayButtonOverlay>
    )
}

interface PreviewAutoPlayVideoProps {
    multiMediaProps: MultiMediaProps
    visible: boolean
}

const PreviewAutoPlayVideo: FC<PreviewAutoPlayVideoProps> = ({
    visible,
    multiMediaProps,
}) => {
    const [mountVideo, setMountVideo] = useState(true)

    useEffect(() => {
        let timeoutId
        if (visible) {
            setMountVideo(true)
        } else {
            timeoutId = setTimeout(() => {
                setMountVideo(false)
            }, 3000)
        }
        return () => {
            clearTimeout(timeoutId)
        }
    }, [visible])

    return (
        <s.Preview $visible={visible} data-hint="Autoplay Video">
            {mountVideo && (
                <BaseVideo
                    {...{
                        ...multiMediaProps.mediaProps,
                        backgroundMode: true,
                        autoPlay: true,
                    }}
                />
            )}
        </s.Preview>
    )
}

export interface VideoProps extends AspectWrapperProps {
    backgroundMode?: boolean
    videoUrl?: string
    /**
     * @deprecated use posterMultiMediaProps instead
     */
    videoPreviewUrl?: string
    posterMultiMediaProps?: MultiMediaProps
    autoPlay?: boolean
    hidePlayButton?: boolean

    /**
     * Show unmute button if autoplay succeeded
     */
    showUnmute?: boolean

    /**
     * Loops video
     */
    loop?: boolean
}

/**
 * Video component that handles multiple videos, including background videos, previews videos,
 * lazy loading, etc.
 *
 * TODO: Lazy loading
 * TODO: Memoization / prevent re-render on parent animation (fade-in)
 */
export const Video = withAspectWrapper<VideoProps>(
    ({
        backgroundMode = true,
        videoUrl,
        posterMultiMediaProps,
        autoPlay: _autoPlay,
        showUnmute,
        loop,
    }) => {
        /**
         * Video API passed up from child video on its ready callback.
         * Populate it with a default instance.
         *
         * The problem is that this does not update on click.
         */
        const [videoAPI, setVideoAPI] =
            useState<InstanceType<typeof BaseVideoAPI>>(videoApiDefault)

        // force render manually (from react docs) to update external video API
        const [_, forceRender] = useReducer((x) => x + 1, 0)

        const [hasMainVideoPlayedOnce, setHasMainVideoPlayedOnce] =
            useState(false)

        // const [hasPreviewVideoPlayedOnce, setHasPreviewVideoPlayedOnce] =
        //     useState(false)

        const hasPosterMedia = !isEmpty(posterMultiMediaProps)

        const autoPlay =
            // if this video has a poster media, never autoplay the main video
            hasPosterMedia ? false : _autoPlay

        // show the play button if not it has a poster, or not autoplay
        const showPlayButton =
            hasPosterMedia ||
            !autoPlay ||
            (videoAPI.isReady && !videoAPI.isPlaying)

        return (
            <>
                {/* Uncomment to enable state debug overlay (only works on localhost) */}
                {/* <DebugVideoStateOverlay /> */}

                {/* 
                    Overlay which forces toggle of child video play state and
                    forces re-render of this component, which will update play button state.

                    This hack is due to mixing React and browser native events.

                    TODO: Reduce technical debt to use less React state and more native as needed.         
                 */}
                <s.ClickOverlay
                    onClick={() => {
                        videoAPI.toggle()
                        videoAPI.unmute()
                        setTimeout(() => {
                            forceRender()
                        }, 100)
                    }}
                    aria-label={
                        videoAPI.isPlaying ? 'Pause Video' : 'Play Video'
                    }
                />
                <BaseVideo
                    {...{
                        backgroundMode,
                        videoUrl,
                        autoPlay,
                        showUnmute,
                        loop,
                    }}
                    handleOnPlay={() => {
                        setHasMainVideoPlayedOnce(true)
                    }}
                    handleOnReady={(videoAPI) => {
                        setVideoAPI(videoAPI)
                    }}
                />

                {hasPosterMedia && (
                    /**
                     *  Poster should only load once otherwise switch to toggle
                     *  mute/pause the actual video.
                     */
                    <PreviewAutoPlayVideo
                        visible={!hasMainVideoPlayedOnce}
                        multiMediaProps={posterMultiMediaProps}
                    />
                )}
                {showPlayButton && (
                    /**
                     * This is the video play button that appears independently of the poster image.
                     */
                    <PlayButton
                        text="Play"
                        visible={videoAPI.isPlaying === false}
                    />
                )}
            </>
        )

        /**
         * Video debug overlay stats.
            This component requires refactoring due to strange use of non-React state like the
            video player API which uses browser native events.
            This component has a fair amount of technical debt and useless re-renders. 
         */
        function DebugVideoStateOverlay() {
            // only show on local dev
            if (!isLocalDevelopmentEnvironment) {
                return null
            }
            return (
                <pre
                    style={{
                        zIndex: 10,
                        position: 'absolute',
                        pointerEvents: 'none',
                    }}
                >
                    {JSON.stringify(
                        {
                            autoPlay,
                            showPlayButton,
                            hasPosterMedia,
                            posterMultiMediaProps,
                        },
                        null,
                        2
                    )}
                </pre>
            )
        }
    }
)
