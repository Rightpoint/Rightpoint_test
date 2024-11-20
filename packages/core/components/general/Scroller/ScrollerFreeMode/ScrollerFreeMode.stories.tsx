import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Sizes } from '../Scroller.component'
import {
    ScrollerFreeMode,
    ScrollerFreeModeProps,
} from './ScrollerFreeMode.component'
import { scrollerGenerators } from '../Scroller.data'

export default {
    title: 'Old/Scroller/FreeMode',
    component: ScrollerFreeMode,
    argTypes: {
        size: {
            control: { type: 'radio' },
            options: Sizes,
        },
    },
    parameters: {
        chromatic: { disableSnapshot: true },
    },
} as ComponentMeta<typeof ScrollerFreeMode>

const Template: ComponentStory<typeof ScrollerFreeMode> = (
    args: ScrollerFreeModeProps
) => <ScrollerFreeMode {...args} />

export const Default = Template.bind({})
Default.args = {
    ...scrollerGenerators.default(),
}

export const LessItems = Template.bind({})
LessItems.args = {
    ...scrollerGenerators.fewer(),
}

export const LongerTitle = Template.bind({})
LongerTitle.args = {
    ...scrollerGenerators.longerTitle(),
}
