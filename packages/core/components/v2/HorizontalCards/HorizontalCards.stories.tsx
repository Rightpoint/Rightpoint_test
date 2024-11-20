import { ComponentStory, ComponentMeta } from '@storybook/react'
import {
    HorizontalCards,
    HorizontalCardsProps,
} from './HorizontalCards.component'
import { horizontalCardsGenerators } from './HorizontalCards.data'
export default {
    component: HorizontalCards,
    title: 'V2/Components/HorizontalCards',
    parameters: {
        docs: {
            description: {
                // component: ''
            },
        },
        // chromatic: { disableSnapshot: true },
    },
} as ComponentMeta<typeof HorizontalCards>

const Template: ComponentStory<typeof HorizontalCards> = (args) => (
    <HorizontalCards {...args} />
)

export const Default = Template.bind({})
Default.args = {
    ...horizontalCardsGenerators.default(),
}
