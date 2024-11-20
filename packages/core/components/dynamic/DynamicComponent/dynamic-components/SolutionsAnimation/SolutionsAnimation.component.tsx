import { useInView } from 'framer-motion'
import Lottie from 'lottie-react'
import { useEffect, useRef } from 'react'
import { logDevelopmentOnly } from '@rightpoint/core/utils'
import lottieAnimationData from './lottieAnimationData.json'
import { AspectWrapper } from '../../../../utils/AspectWrapper/AspectWrapper.component'

export interface SolutionsAnimationProps {}

/**
 * CHECK: Do we need to lazy load the animation data, or is DynamicComponent doing that for us?
 *
 * This animation is _very_ CPU intensive, especially on Safari.
 *
 * It depends entirely on generated JSON files from the Lottie export, so care must
 * be taken to validate its performance on Safari and Mobile.
 */
export const SolutionsAnimation = () => {
    const lottieRef = useRef<any>()
    const ref = useRef()
    const inView = useInView(ref, {
        amount: 0.05,
    })
    const rendererSettings: CanvasRendererConfig = {
        // progressiveLoad: false,
    }

    useEffect(() => {
        if (inView) {
            lottieRef.current?.play()
            logDevelopmentOnly('Starting lottie animation')
        } else {
            lottieRef.current?.stop()
            logDevelopmentOnly('Stopping lottie animation')
        }
    }, [inView])

    return (
        <div ref={ref}>
            {/* 
                The AspectWrapper renders in SSR preventing layout shift.
                The Lottie component is not SSR compatible, so it renders as an empty div.
             */}
            <AspectWrapper
                aspectWrapperRatio={16 / 9}
                aspectWrapperRatioDesktop={16 / 9}
            >
                <Lottie
                    lottieRef={lottieRef}
                    animationData={lottieAnimationData}
                    loop={true}
                    renderer={'canvas' as any}
                    rendererSettings={rendererSettings}
                />
            </AspectWrapper>
        </div>
    )
}

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
