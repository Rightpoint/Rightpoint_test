import { Story, Meta } from '@storybook/react'
import { AspectWrapper, AspectWrapperProps } from './AspectWrapper.component'

export default {
    component: AspectWrapper,
    title: 'V2/Layout/AspectWrapper',
    parameters: {
        chromatic: { disableSnapshot: true },
    },
} as Meta

export const WithAspect = () => (
    <>
        <AspectWrapper aspectWrapperRatio={'16:9'} backgroundFallback={true}>
            This content should fit inside the aspect wrapper.
        </AspectWrapper>
        <p>Below</p>
    </>
)

export const NoAspect = () => (
    <>
        <AspectWrapper backgroundFallback={true}>
            No aspect provided. This content should dictate size and push the
            following below:
        </AspectWrapper>
        <p>Below</p>
    </>
)
