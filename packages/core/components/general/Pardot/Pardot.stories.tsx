import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Pardot, PardotProps } from './Pardot.component'
import { pardotGenerators } from './Pardot.data'
export default {
    component: Pardot,
    title: 'components/Pardot',
    parameters: {
        docs: {
            description: {
                // component: ''
            },
        },
        // chromatic: { disableSnapshot: true },
    },
} as ComponentMeta<typeof Pardot>

const Template: ComponentStory<typeof Pardot> = (args) => <Pardot {...args} />

export const Default = Template.bind({})
Default.args = {
    ...pardotGenerators.default(),
}
