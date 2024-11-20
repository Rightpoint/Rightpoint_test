import { ComponentStory, ComponentMeta } from '@storybook/react'
import { ComponentGroup, ComponentGroupProps } from './ComponentGroup.component'
import { componentGroupGenerators } from './ComponentGroup.data'
export default {
    component: ComponentGroup,
    title: 'V2/Layout/ComponentGroup',
    parameters: {
        docs: {
            description: {
                // component: '',
            },
        },
        chromatic: { disableSnapshot: true },
    },
} as ComponentMeta<typeof ComponentGroup>

const Template: ComponentStory<typeof ComponentGroup> = (args) => (
    <ComponentGroup {...args} />
)

export const Default = Template.bind({})
Default.args = {
    ...componentGroupGenerators.default(),
}
