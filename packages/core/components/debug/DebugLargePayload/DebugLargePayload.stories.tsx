import { ComponentStory, ComponentMeta } from '@storybook/react'
import {
    DebugLargePayload,
    DebugLargePayloadProps,
} from './DebugLargePayload.component'

export default {
    component: DebugLargePayload,
    title: 'Debug/DebugLargePayload',
    parameters: {
        docs: {
            description: {
                component:
                    'This component is used to debug large payloads in varying load methods in the _test/ pages',
            },
        },
        chromatic: { disableSnapshot: true },
    },
} as ComponentMeta<typeof DebugLargePayload>

const Template: ComponentStory<typeof DebugLargePayload> = (args) => (
    <DebugLargePayload {...args} />
)

export const Default = Template.bind({})
Default.args = {}
