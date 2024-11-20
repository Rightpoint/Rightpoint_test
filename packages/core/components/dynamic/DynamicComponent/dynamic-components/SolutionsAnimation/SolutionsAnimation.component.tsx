import { useInView } from 'framer-motion'
import { FC, useEffect, useRef } from 'react'
import {
    ConditionalWrapper,
    ErrorBoundary,
    logDevelopmentOnly,
} from '@rightpoint/core/utils'
import { AspectWrapper } from '../../../../utils/AspectWrapper/AspectWrapper.component'
import NextLink from 'next/link'
import { LinkProps } from '../../../../links/Link/Link.component'
import { useAppSelector } from '@rightpoint/core/redux'
import { navbarSelectors } from '@rightpoint/core/redux'
import { SolutionsAnimationStyles as s } from './SolutionsAnimation.styles'
import dynamic from 'next/dynamic'
import { LottieAnimation } from './SolutionsAnimationLottie.dynamic'

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
    const isNavbarPopupOpen = useAppSelector(navbarSelectors.isOpen)

    const lottieRef = useRef<any>()
    const ref = useRef()
    const inView = useInView(ref, {
        amount: 0.05,
    })
    const rendererSettings = {
        // progressiveLoad: false,
    }

    useEffect(() => {
        if (lottieRef.current) {
            /**
             * Stop animation if
             * - navbar popup is open
             * - animation is out of view
             */
            if (!isNavbarPopupOpen && inView) {
                lottieRef.current?.play?.()
                logDevelopmentOnly('Starting lottie animation')
            } else {
                lottieRef.current?.pause?.()
                logDevelopmentOnly('Stopping lottie animation')
            }
        }
    }, [inView, isNavbarPopupOpen, lottieRef])

    return (
        <ErrorBoundary>
            <ConditionalWrapper
                condition={Boolean(linkProps?.href)}
                wrapper={(children) => (
                    <NextLink
                        {...linkProps}
                        ref={ref}
                        data-cursor-text={cursorText ?? 'Explore Solutions'}
                        aria-label="Total Experience Solutions Animation"
                    >
                        {children}
                    </NextLink>
                )}
            >
                <s.SolutionsAnimation ref={ref}>
                    {/* 
                            The AspectWrapper renders in SSR preventing layout shift.
                            The Lottie component is not SSR compatible, so it renders as an empty div.

                            Note:
                            - The lottie player detects parent shape and sets width/height
                            - AND HiDPI displays. Some displays have a factor of 4x the pixels
                            - It also detects screen density and doubles count -- can get very large and should be reduced
                            - Performance risks across browsers that are hard to predict. Safari does not handle SVG renderer well.
                            
                            Future:
                            - There is a different lottie player that uses a non JSON format that may be faster.
                        */}

                    <AspectWrapper
                        aspectWrapperRatio={1.2}
                        aspectWrapperRatioDesktop={1.2}
                    >
                        <LottieAnimation
                            lottieRef={lottieRef}
                            rendererSettings={rendererSettings}
                        />
                    </AspectWrapper>
                </s.SolutionsAnimation>
            </ConditionalWrapper>
        </ErrorBoundary>
    )
}

// const LottieNoSSR = dynamic<any>(
//     () =>
//         import('./SolutionsAnimationLottie.dynamic').then(
//             (mod) => mod.LottieAnimation
//         ),
//     {
//         ssr: false,
//     }
// )
