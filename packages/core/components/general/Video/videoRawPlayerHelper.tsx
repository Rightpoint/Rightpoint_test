import { MutableRefObject, RefObject } from 'react'
import { createLogLocalDevOnlyFn } from '@rightpoint/core/utils'

const localDevLogBound = createLogLocalDevOnlyFn({
    enabled: true,
    namespace: 'videoRawPlayerHelper',
    logLevel: 'debug',
})

type IsHoveredCallbackProps = {
    isHovered: boolean
    api: PlayerRawHelper
}

type IsHoveredFn = ({}: IsHoveredCallbackProps) => void

export class PlayerRawHelper {
    playerRef: RefObject<any>
    isHovered = false
    isHoveredCallback: IsHoveredFn
    constructor(
        playerRef: MutableRefObject<any>,
        {
            isHoveredCallback,
        }: {
            isHoveredCallback: IsHoveredFn
        }
    ) {
        this.playerRef = playerRef

        this.isHoveredCallback = isHoveredCallback
    }
    get internalPlayer(): HTMLVideoElement {
        const el = this.playerRef?.current
        const player = el?.getInternalPlayer()
        console.log('Getting internal player', {
            el,
            player,
        })
        return player
    }
    get isReady() {
        localDevLogBound('Is ready', {
            bool: Boolean(this.internalPlayer),
            internalPlayer: this.internalPlayer,
        })
        return Boolean(this.internalPlayer)
    }
    setIsHovered(value: boolean) {
        this.isHovered = value
        this.isHoveredCallback?.({
            isHovered: value,
            api: this,
        })
    }
    restartPosition() {
        // TODO: not great pattern
        if (!this.isReady) return

        // seek 0 causes reload of player
        this.internalPlayer.currentTime = 0
    }
    get progress() {
        if (!this.isReady) return
        return this.internalPlayer.currentTime / this.internalPlayer.duration
    }
    get paused() {
        if (!this.isReady) return

        return this.internalPlayer.paused
    }
    play() {
        if (!this.isReady) return

        this.internalPlayer
            .play()
            .then(() => {
                // console.log("played")
            })
            .catch((ex) => {
                console.log('Failed to play video', ex)
            })
    }
    pause() {
        // TODO: bad pattern
        if (!this.isReady) return

        this.internalPlayer.pause()
    }
    togglePlay() {
        if (!this.isReady) return

        if (this.internalPlayer.paused) {
            this.play()
        } else {
            this.pause()
        }
    }
}
