import Lottie from 'lottie-react'
import { useEffect, useState } from 'react'
import lottieAnimationData from './lottieAnimationData.json'
import NextImage from 'next/image'
import { useScrollAnimation } from '../../../../general/Animation/Animation.component'
import { logDevelopmentOnly } from '@rightpoint/core/utils'

/**
 * Pulled from lottie types
 */
type BaseRendererConfig = {
    imagePreserveAspectRatio?: string
    className?: string
}

type CanvasRendererConfig = BaseRendererConfig & {
    clearCanvas?: boolean
    context?: CanvasRenderingContext2D
    progressiveLoad?: boolean
    preserveAspectRatio?: string
}

export const LottieAnimation = ({ lottieRef, rendererSettings }) => {
    const [isSafari, setIsSafari] = useState(false)

    useEffect(() => {
        const checkIsSafari = () => {
            try {
                if (
                    window.navigator.userAgent.indexOf('Safari') != -1 &&
                    window.navigator.userAgent.indexOf('Chrome') == -1
                ) {
                    logDevelopmentOnly('is safari', window.navigator.userAgent)
                    setIsSafari(true)
                }
            } catch (e) {
                console.log('is not', e)
            }
        }
        checkIsSafari()
    }, [])

    const { Animation } = useScrollAnimation()

    if (isSafari) {
        const GIF = '/static/media/solutions-graphic-v3-thomas.gif'
        return (
            <Animation>
                <NextImage src={GIF} alt="Total Experience" fill />
            </Animation>
        )
    }

    return (
        <Lottie
            lottieRef={lottieRef}
            animationData={lottieAnimationData}
            loop={false}
            // width/height doesn't work
            // canvas renders as parent width * DPI
            // screen too large causes massive performance issues
            // renderer={'canvas' as any}
            rendererSettings={rendererSettings}
        />
    )
}
