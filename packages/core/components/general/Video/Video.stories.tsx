import { Story, Meta } from '@storybook/react'

import { Video, VideoProps } from './Video.component'
import { videoGenerators } from './Video.data'

export default {
    component: Video,
    title: 'Atoms/MultiMedia/Isolated Child/Video',
    parameters: {
        chromatic: { disableSnapshot: true },
    },
} as Meta

const Template: Story<VideoProps> = (args) => <Video {...args} />

export const Primary = Template.bind({})
Primary.args = videoGenerators.default()

export const VideoLandscapeCropTest = () => {
    return (
        <>
            <p>
                These videos should be centered and fill the parent via overflow
                / crop. The videos are wider than the container. (i.e. leave
                space above/below if constrained by height)
            </p>
            <Video
                {...videoGenerators.default()}
                aspectWrapperRatio={10 / 1}
                backgroundFallback={true}
            />
            <p>Crop:</p>
            <Video
                {...videoGenerators.default()}
                aspectWrapperRatio={4 / 1}
                backgroundFallback={true}
            />
            <p> This video itself is a weird aspect ratio:</p>
            <Video
                videoUrl="https://vimeo.com/360333962"
                aspectWrapperRatio={4 / 1}
                backgroundFallback={true}
            />
            <p>This video should crop to fit into the parent:</p>
            <Video
                {...videoGenerators.default()}
                aspectWrapperRatio={1 / 1}
                backgroundFallback={true}
            />
        </>
    )
}

export const VideoPortraitCropTest = () => {
    const VideoWrapper = (props) => (
        <div style={{ width: '20vw', minHeight: '20vw' }} {...props} />
    )
    const SampleVideo = ({ aspectWrapperRatio = 16 / 9 }) => (
        <Video
            {...videoGenerators.default()}
            aspectWrapperRatio={aspectWrapperRatio}
        />
    )

    return (
        <div>
            <p>
                These videos should be centered and fill the parent via overflow
                / crop. The videos are shorter than the container (i.e. leave
                space above/below if constrained by width)
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '40px' }}>
                <VideoWrapper>
                    <SampleVideo aspectWrapperRatio={5 / 5} />
                </VideoWrapper>

                <VideoWrapper>
                    <SampleVideo aspectWrapperRatio={6 / 5} />
                </VideoWrapper>

                <VideoWrapper>
                    <SampleVideo aspectWrapperRatio={7 / 5} />
                </VideoWrapper>
                <VideoWrapper>
                    <SampleVideo aspectWrapperRatio={8 / 5} />
                </VideoWrapper>

                <VideoWrapper>
                    <SampleVideo aspectWrapperRatio={4 / 5} />
                </VideoWrapper>

                <VideoWrapper>
                    <SampleVideo aspectWrapperRatio={9 / 16} />
                </VideoWrapper>

                <VideoWrapper>
                    <SampleVideo aspectWrapperRatio={10 / 16} />
                </VideoWrapper>

                <VideoWrapper>
                    <SampleVideo aspectWrapperRatio={6 / 16} />
                </VideoWrapper>
            </div>
        </div>
    )
}

export const VideoAndSamePreviewPlayUnmute = () => {
    return <Video {...videoGenerators.same()} aspectWrapperRatio={16 / 9} />
}

export const VideoPreviewAndPlay = () => {
    return <Video {...videoGenerators.preview()} aspectWrapperRatio={16 / 9} />
}

export const VideoPosterAndPlay = () => {
    return <Video {...videoGenerators.poster()} aspectWrapperRatio={16 / 9} />
}

export const VideoPreviewWithPosterFallback = () => {
    return (
        <Video
            {...videoGenerators.previewWithPosterFallback()}
            aspectWrapperRatio={16 / 9}
        />
    )
}
