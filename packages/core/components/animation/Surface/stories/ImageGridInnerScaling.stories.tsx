import { isString } from 'lodash'
import { useState } from 'react'
import {
    ImageFill,
    ImageWithAspect,
} from '../../../general/Image/Image.component'
import {
    AnimationContext,
    AnimationContextCustomProvider,
} from '../../AnimationContext'
import { ScrollAnimation } from '../../ScrollAnimation'
import { GoldenRatioTestLayout } from '../../storybook/layouts/GoldenRatioTestLayout'
import { ScrollStoryWrapper } from '../../storybook/layouts/ScrollStoryWrapper'
import { Surface } from '../Surface'

export default {
    title: 'Core/Surface',
    component: ScrollAnimation,
    parameters: {
        layout: 'fullscreen',
    },
    argTypes: {},
}

const AnimationInstance = ({
    scrollSource: storyScrollSource = null,
    debug = false,
    baseScale = 1.2,
}: {
    scrollSource?: HTMLElement | 'global' | 'local' | 'container' | null
    debug?: boolean
    baseScale?: number
}) => {
    const [scrollSource, setScrollSource] = useState<
        HTMLElement | 'global' | 'local' | 'container' | null
    >(
        isString(storyScrollSource) && storyScrollSource !== 'container'
            ? storyScrollSource
            : null
    )

    const ratio = 1.618

    const scales = [
        baseScale,

        baseScale * Math.pow(ratio, 1),
        baseScale * Math.pow(ratio, 2),
        baseScale * Math.pow(ratio, 3),
        baseScale * Math.pow(ratio, 4),
        baseScale * Math.pow(ratio, 5),
        baseScale * Math.pow(ratio, 6),
    ]

    return (
        <div
            ref={(ref) => {
                if (
                    !isString(scrollSource) &&
                    ref !== scrollSource &&
                    storyScrollSource === 'container'
                ) {
                    setScrollSource(ref)
                }
            }}
        >
            <AnimationContextCustomProvider
                value={{
                    scrollSource,
                }}
            >
                <GoldenRatioTestLayout>
                    {({ index }) => (
                        <Surface
                            rounded
                            animation={{
                                target: 'content',
                                initial: { scale: 1 + scales[index] },
                            }}
                            debug={debug && index === 0}
                        >
                            <ImageFill
                                src={'https://picsum.photos/1440/1440'}
                                alt="Image"
                            />
                        </Surface>
                    )}
                </GoldenRatioTestLayout>
            </AnimationContextCustomProvider>
        </div>
    )
}

export const ImageGridInnerScalingLocalScrolling = (args) => (
    <>
        <ScrollStoryWrapper title="Local scroll context">
            <AnimationInstance scrollSource="local" />
        </ScrollStoryWrapper>
    </>
)

export const ImageGridInnerScalingContainerScrolling = (args) => (
    <>
        <ScrollStoryWrapper title="Container scroll context">
            <AnimationInstance scrollSource="container" />
        </ScrollStoryWrapper>
    </>
)

export const ImageGridInnerScalingGlobalScrolling = (args) => (
    <>
        <ScrollStoryWrapper title="Global scroll context">
            <AnimationInstance scrollSource="global" baseScale={2} />
        </ScrollStoryWrapper>
    </>
)
