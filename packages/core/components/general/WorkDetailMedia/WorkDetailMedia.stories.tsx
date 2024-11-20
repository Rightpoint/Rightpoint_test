import { ComponentStory, ComponentMeta } from '@storybook/react'
import {
    WorkDetailMedia,
    WorkDetailMediaProps,
} from './WorkDetailMedia.component'
import { workDetailMediaGenerators } from './WorkDetailMedia.data'
export default {
    component: WorkDetailMedia,
    title: 'Components/WorkDetail/WorkDetailMedia',
    parameters: {
        docs: {
            description: {
                // component: ''
            },
        },
        // chromatic: { disableSnapshot: true },
    },
} as ComponentMeta<typeof WorkDetailMedia>

const Template: ComponentStory<typeof WorkDetailMedia> = (args) => (
    <WorkDetailMedia {...args} />
)

export const Default = Template.bind({})
Default.args = {
    ...workDetailMediaGenerators.default(),
}

export const Two = Template.bind({})
Two.args = {
    ...workDetailMediaGenerators.two(),
}

export const Three = Template.bind({})
Three.args = {
    ...workDetailMediaGenerators.threeOffset(),
}

export const FourUp = Template.bind({})
FourUp.args = {
    ...workDetailMediaGenerators.fourUp(),
}
