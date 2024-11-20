import { Story, Meta } from '@storybook/react'
import {
    BackgroundColors,
    ContentColors,
} from '../../layout/RootComponent/background-color'

import { VerticalTabs, VerticalTabsProps } from './VerticalTabs.component'
import { verticalTabsGenerators } from './VerticalTabs.data'

export default {
    component: VerticalTabs,
    title: 'V2/VerticalTabs',
    parameters: {
        chromatic: { disableSnapshot: true },
    },
    argTypes: {
        background: { control: 'object' },
    },
    args: {
        background: {
            backgroundColor: BackgroundColors.Black,
            contentColor: ContentColors.Light,
        },
    },
} as Meta

const Template: Story<VerticalTabsProps> = (args) => <VerticalTabs {...args} />

export const Primary = Template.bind({})
Primary.args = verticalTabsGenerators.default()
