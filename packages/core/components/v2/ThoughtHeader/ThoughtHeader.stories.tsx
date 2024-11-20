import { ComponentStory, ComponentMeta } from '@storybook/react'
import { ThoughtHeader, ThoughtHeaderProps } from './ThoughtHeader.component'
import { thoughtHeaderGenerators } from './ThoughtHeader.data'
export default {
    component: ThoughtHeader,
    title: 'v2/Pages/Thought/ThoughtHeader',
    parameters: {
        docs: {
            description: {
                // component: ''
            },
        },
        // chromatic: { disableSnapshot: true },
    },
} as ComponentMeta<typeof ThoughtHeader>

const Template: ComponentStory<typeof ThoughtHeader> = (args) => (
    <ThoughtHeader {...args} />
)

export const Default = Template.bind({})
Default.args = {
    ...thoughtHeaderGenerators.default(),
}

export const DarkContent = Template.bind({})
DarkContent.args = thoughtHeaderGenerators.darkContent()
