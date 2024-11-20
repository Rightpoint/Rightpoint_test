import { ComponentStory, ComponentMeta } from '@storybook/react'
import { WhatWeDeliver, WhatWeDeliverProps } from './WhatWeDeliver.component'
import { whatWeDeliverGenerators } from './WhatWeDeliver.data'
export default {
    component: WhatWeDeliver,
    title: 'Components/WhatWeDeliver',
    parameters: {
        docs: {
            description: {
                // component: ''
            },
        },
        // chromatic: { disableSnapshot: true },
    },
} as ComponentMeta<typeof WhatWeDeliver>

const Template: ComponentStory<typeof WhatWeDeliver> = (args) => (
    <WhatWeDeliver {...args} />
)

export const Default = Template.bind({})
Default.args = {
    ...whatWeDeliverGenerators.default(),
}
