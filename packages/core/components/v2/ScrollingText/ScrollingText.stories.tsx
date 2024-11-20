import { ComponentStory, ComponentMeta } from '@storybook/react'
import { ScrollingText, ScrollingTextProps } from './ScrollingText.component'
import { scrollingTextGenerators } from './ScrollingText.data'
export default {
    component: ScrollingText,
    title: 'v2/Components/ScrollingText',
    parameters: {
        docs: {
            description: {
                // component: ''
            },
        },
        chromatic: { disableSnapshot: true },
    },
} as ComponentMeta<typeof ScrollingText>

const Template: ComponentStory<typeof ScrollingText> = (args) => (
    <ScrollingText {...args} />
)

export const Default = Template.bind({})
Default.args = {
    ...scrollingTextGenerators.default(),
}
