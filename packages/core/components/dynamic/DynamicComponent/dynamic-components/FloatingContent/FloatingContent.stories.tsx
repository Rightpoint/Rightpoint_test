import { ComponentStory, ComponentMeta } from '@storybook/react'
import {
    FloatingContent,
    FloatingContentProps,
} from './FloatingContent.component'
import { floatingContentGenerators } from './FloatingContent.data'
export default {
    component: FloatingContent,
    title: 'Dynamic/FloatingContent',
    parameters: {
        docs: {
            description: {
                // component: ''
            },
        },
        // chromatic: { disableSnapshot: true },
    },
} as ComponentMeta<typeof FloatingContent>

const Template: ComponentStory<typeof FloatingContent> = (args) => (
    <FloatingContent {...args} />
)

export const Default = Template.bind({})
Default.args = {
    ...floatingContentGenerators.default(),
}
