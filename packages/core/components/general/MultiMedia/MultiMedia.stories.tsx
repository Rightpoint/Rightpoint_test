import { Story, Meta } from '@storybook/react'
import { MultiMedia, MultiMediaProps } from './MultiMedia.component'
import { MultiMediaContextProvider } from './MultiMedia.context'
import { multiMediaGenerators } from './MultiMedia.data'

export default {
    component: MultiMedia,
    title: 'Atoms/MultiMedia',
    /**
     * TODO: Disable query params. It's buggy. How?
     */
} as Meta

const Template: Story<MultiMediaProps> = (args) => <MultiMedia {...args} />

export const Image = Template.bind({})
Image.args = {
    ...multiMediaGenerators.image(),
}

export const AnimatedImages = Template.bind({})
AnimatedImages.args = {
    ...multiMediaGenerators.animatedImages(),
}

export const Video = Template.bind({})
Video.args = {
    aspectRatio: 16 / 9,
    ...multiMediaGenerators.video(),
}
Video.parameters = {
    chromatic: { disableSnapshot: true },
}

export const ParentProvider = () => (
    <>
        <p>
            This mechanism provides a way for child AspectSizer blocks to adapt
            to sizes set by a parent component, for example, when a Grid layout
            item knows its child image, regardless of component containing said
            image, needs to have a taller ratio.
        </p>
        <MultiMediaContextProvider
            aspectWrapperRatio={1 / 1}
            aspectWrapperRatioDesktop={5 / 1}
        >
            <MultiMedia {...multiMediaGenerators.image()} />
        </MultiMediaContextProvider>
    </>
)

export const ZStressTestNoAspect = () => (
    <div>
        <p>Ensure component works without aspect/dimension data.</p>
        <p>
            Note: it should rarely ever be the case -- Contentful contains
            dimension data. High reduced fidelity is acceptable.
        </p>
        <MultiMedia
            {...multiMediaGenerators.image()}
            aspectWrapperRatio={null}
        />
        <MultiMedia
            {...multiMediaGenerators.video()}
            aspectWrapperRatio={null}
        />
        <hr />
        <p>Animated Images requires an aspect, it is dimensionless.</p>
        <MultiMedia
            {...multiMediaGenerators.animatedImages()}
            aspectWrapperRatio={null}
        />
    </div>
)
ZStressTestNoAspect.parameters = {
    chromatic: { disableSnapshot: true },
}
