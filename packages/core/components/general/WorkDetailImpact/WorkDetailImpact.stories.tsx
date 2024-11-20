import { ComponentStory, ComponentMeta } from '@storybook/react'
import {
    WorkDetailImpact,
    WorkDetailImpactProps,
} from './WorkDetailImpact.component'
import { workDetailImpactGenerators } from './WorkDetailImpact.data'
export default {
    component: WorkDetailImpact,
    title: 'components/WorkDetailImpact',
    parameters: {
        docs: {
            description: {
                // component: ''
            },
        },
        // chromatic: { disableSnapshot: true },
    },
} as ComponentMeta<typeof WorkDetailImpact>

const Template: ComponentStory<typeof WorkDetailImpact> = (args) => (
    <WorkDetailImpact {...args} />
)

export const Default = Template.bind({})
Default.args = {
    ...workDetailImpactGenerators.default(),
}
