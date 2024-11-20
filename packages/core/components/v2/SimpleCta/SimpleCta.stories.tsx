import { ComponentStory, ComponentMeta } from '@storybook/react'
import { BackgroundColors } from '../../layout/RootComponent/background-color'
import { SimpleCta, SimpleCtaProps } from './SimpleCta.component'
import { simpleCtaGenerators } from './SimpleCta.data'
export default {
    component: SimpleCta,
    title: 'V2/Content/SimpleCta',
    parameters: {
        docs: {
            description: {
                // component: ''
            },
        },
        // chromatic: { disableSnapshot: true },
    },
} as ComponentMeta<typeof SimpleCta>

const Template: ComponentStory<typeof SimpleCta> = (args) => (
    <SimpleCta {...args} />
)

export const Default = Template.bind({})
Default.args = {
    ...simpleCtaGenerators.default(),
}

export const Background = Template.bind({})
Background.args = {
    ...simpleCtaGenerators.background(),
}
