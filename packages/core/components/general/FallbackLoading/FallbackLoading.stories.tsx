import { ComponentStory, ComponentMeta } from '@storybook/react'
import {
    FallbackLoading,
    FallbackLoadingProps,
} from './FallbackLoading.component'
export default {
    component: FallbackLoading,
    title: 'Components/FallbackLoading',
    parameters: {
        docs: {
            description: {
                // component: ''
            },
        },
        // chromatic: { disableSnapshot: true },
    },
} as ComponentMeta<typeof FallbackLoading>

const Template: ComponentStory<typeof FallbackLoading> = (args) => (
    <FallbackLoading {...args} />
)

export const Default = Template.bind({})
Default.args = {}
