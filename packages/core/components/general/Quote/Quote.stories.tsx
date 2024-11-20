import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Quote, QuoteProps } from './Quote.component'
import { quoteGenerators } from './Quote.data'
export default {
    component: Quote,
    title: 'Components/Quote',
    parameters: {
        docs: {
            description: {
                // component: ''
            },
        },
        // chromatic: { disableSnapshot: true },
    },
} as ComponentMeta<typeof Quote>

const Template: ComponentStory<typeof Quote> = (args) => <Quote {...args} />

export const Default = Template.bind({})
Default.args = {
    ...quoteGenerators.default(),
}

export const MainQuote = Template.bind({})
MainQuote.args = {
    ...quoteGenerators.main(),
}

export const Large = Template.bind({})
Large.args = {
    ...quoteGenerators.large(),
}
