import { useInView } from 'framer-motion'
import Lottie from 'lottie-react'
import { FC, useEffect, useRef } from 'react'
import { ConditionalWrapper, logDevelopmentOnly } from '@rightpoint/core/utils'
import lottieAnimationData from './lottieAnimationData.json'
import { AspectWrapper } from '../../../../utils/AspectWrapper/AspectWrapper.component'
import NextLink from 'next/link'
import { LinkProps } from '../../../../links/Link/Link.component'
export interface SolutionsAnimationProps {}

/**
 * CHECK: Do we need to lazy load the animation data, or is DynamicComponent doing that for us?
 *
 * This animation is _very_ CPU intensive, especially on Safari.
 *
 * It depends entirely on generated JSON files from the Lottie export, so care must
 * be taken to validate its performance on Safari and Mobile.
 */
export const SolutionsAnimation: FC<{
    cursorText?: string
    linkProps?: LinkProps
}> = ({
    cursorText,
    linkProps = {
        href: '/solutions',
    },
}) => {
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
            lottieRef.current?.pause()
            logDevelopmentOnly('Stopping lottie animation')
        }
    }, [inView])

    return (
        <ConditionalWrapper
            condition={Boolean(linkProps?.href)}
            wrapper={(children) => (
                <NextLink
                    {...linkProps}
                    ref={ref}
                    data-cursor-text={cursorText ?? 'Explore Solutions'}
                >
                    {children}
                </NextLink>
            )}
        >
            <div
                ref={ref}
                style={{
                    display: 'block',
                    margin: '0 auto',
                    maxWidth: 800, // canvas renders as 2x this on hiDPI.
                }}
            >
                {/* 
                The AspectWrapper renders in SSR preventing layout shift.
                The Lottie component is not SSR compatible, so it renders as an empty div.

                Note:
                - The lottie player detects parent shape and sets width/height
                - It also detects screen density and doubles count -- can get very large and should be reduced
                - Performance risks across browsers that are hard to predict. Safari does not handle SVG renderer well.
                
                Future:
                - There is a different lottie player that uses a non JSON format that may be faster.
             */}
                <AspectWrapper
                    aspectWrapperRatio={1.2}
                    aspectWrapperRatioDesktop={1.2}
                >
                    <Lottie
                        lottieRef={lottieRef}
                        animationData={lottieAnimationData}
                        loop={false}
                        // width/height doesn't work
                        // canvas renders as parent width * DPI
                        // screen too large causes massive performance issues

                        renderer={'canvas' as any}
                        rendererSettings={rendererSettings}
                    />
                </AspectWrapper>
            </div>
        </ConditionalWrapper>
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
