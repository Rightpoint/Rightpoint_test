import { ComponentStory, ComponentMeta } from '@storybook/react'
import { IconEyebrow, IconEyebrowProps } from './IconEyebrow.component'
import { iconEyebrowGenerators } from './IconEyebrow.data'
export default {
    component: IconEyebrow,
    title: 'v2/Components/IconEyebrow',
    parameters: {
        docs: {
            description: {
                // component: ''
            },
        },
        // chromatic: { disableSnapshot: true },
    },
} as ComponentMeta<typeof IconEyebrow>

const Template: ComponentStory<typeof IconEyebrow> = (args) => (
    <IconEyebrow {...args} />
)

export const Default = Template.bind({})
Default.args = {
    ...iconEyebrowGenerators.default(),
}
