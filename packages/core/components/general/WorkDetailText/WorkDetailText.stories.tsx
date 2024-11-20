import { ComponentStory, ComponentMeta } from '@storybook/react'
import { WorkDetailText, WorkDetailTextProps } from './WorkDetailText.component'
import { workDetailTextGenerators } from './WorkDetailText.data'
export default {
    component: WorkDetailText,
    title: 'Components/WorkDetail/WorkDetailText',
    parameters: {
        docs: {
            description: {
                // component: ''
            },
        },
        // chromatic: { disableSnapshot: true },
    },
} as ComponentMeta<typeof WorkDetailText>

const Template: ComponentStory<typeof WorkDetailText> = (args) => (
    <WorkDetailText {...args} />
)

export const Default = Template.bind({})
Default.args = {
    ...workDetailTextGenerators.default(),
}
