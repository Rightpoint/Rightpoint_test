import { Meta } from '@storybook/react'
import { withBezierEditor } from '../../utils/BezierEditor/BezierEditor.component'

const Component = () => {
    return (
        <>
            <p>
                The bezier curve editor provides an optional consumable context
                that can be edited by parents to fine tune curves / animations.
            </p>
        </>
    )
}
const WithBezierEditor = withBezierEditor(Component, {
    contexts: {
        default: {
            title: 'Title',
            defaultValue: [0, 0.5, 0.5, 1],
        },
    },
})

export default {
    component: WithBezierEditor,
    title: 'Utils/BezierEditor',
    parameters: {
        chromatic: { disableSnapshot: true },
    },
} as Meta

export const Default = () => <WithBezierEditor />

export const ManyEditors = withBezierEditor(Component, {
    contexts: {
        default: {
            defaultValue: [0.95, 0.23, 0.17, 1],
            title: 'Default',
        },
        two: {
            defaultValue: [0, 0.23, 0.17, 1],
            title: 'Second curve context',
        },
        three: {
            defaultValue: [0, 0.5, 0.5, 1],
            title: 'Third curve context',
        },
    },
})
