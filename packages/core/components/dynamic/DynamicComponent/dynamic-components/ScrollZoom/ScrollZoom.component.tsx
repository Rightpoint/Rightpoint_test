import { useIsomorphicLayoutEffect } from '@rightpoint/core/utils'
import { FC, useState } from 'react'

import { MultiMediaProps } from '../../../../general/MultiMedia/MultiMedia.component'
import { ScrollBasedAnimationContainer } from '../../../../general/ScrollBasedAnimationContainer/ScrollBasedAnimationContainer.component'
import { ScrollZoomLogo } from './ScrollZoomLogo'
import { ScrollZoomTextProps, ScrollZoomText } from './ScrollZoomText'
import { ScrollZoomMultiMedia } from './ScrollZoomMultiMedia'
export interface ScrollZoomProps {
    multiMediaProps: MultiMediaProps
    textProps?: Partial<ScrollZoomTextProps>
    showLogo?: boolean

    playLogoAnimationOverride?: boolean | null
}

export const ScrollZoom: FC<ScrollZoomProps> = ({
    multiMediaProps,
    textProps,
    showLogo,
}) => {
    const [playTextAnimation, setPlayTextAnimation] = useState(false)
    const [playLogoAnimation, setPlayLogoAnimation] = useState(false)

    useIsomorphicLayoutEffect(() => {
        // start animation
        setPlayTextAnimation(true)

        // the timing here is to show the logo near the end of the text typing
        // to make it more robust, we could detect 80% of typing complete..
        // for now we will have to tweak this value if the text changes
        const timeoutId = setTimeout(() => {
            setPlayLogoAnimation(true)
        }, 1350)
        return () => {
            clearTimeout(timeoutId)
        }
    }, [])

    return (
        <>
            <ScrollBasedAnimationContainer
                // debug
                scrollHeight={`${300}vh`}
                renderFixedPositionedContent={() => (
                    <>
                        {showLogo && (
                            <ScrollZoomLogo playAnimate={playLogoAnimation} />
                        )}
                    </>
                )}
            >
                <ScrollZoomText {...textProps} />
                <ScrollZoomMultiMedia multiMediaProps={multiMediaProps} />
            </ScrollBasedAnimationContainer>
        </>
    )
}
