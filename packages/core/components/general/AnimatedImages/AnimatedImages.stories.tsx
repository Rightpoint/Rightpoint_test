import { Meta } from '@storybook/react'
import { withBezierEditor } from '../../utils/BezierEditor/BezierEditor.component'
import { AnimatedImagesProps, AnimatedImages } from './AnimatedImages.component'
import { animatedImagesGenerators } from './AnimatedImages.data'

export default {
    component: AnimatedImages,
    title: 'Atoms/MultiMedia/Isolated Child/AnimatedImages',
    parameters: {
        chromatic: { disableSnapshot: true },
    },
} as Meta

export const Default = () => (
    <AnimatedImages {...animatedImagesGenerators.default()} />
)

export const WithBezierEditor = withBezierEditor(
    (props) => (
        <AnimatedImages {...animatedImagesGenerators.default()} {...props} />
    ),
    {
        // bezierToProps: (bezier) => ({
        //     bezier,
        // }),
        // defaultValue: [0.95, 0.23, 0.17, 1],
        contexts: {
            default: {
                defaultValue: [0.95, 0.23, 0.17, 1],
                title: 'Animation curve',
            },
        },
    }
)
