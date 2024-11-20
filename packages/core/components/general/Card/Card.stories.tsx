import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Card, CardVariants } from './Card.component'
import { cardGenerators } from './Card.data'

export default {
    component: Card,
    title: 'atoms/Cards/Card',
} as ComponentMeta<typeof Card>

const Template: ComponentStory<typeof Card> = (args) => (
    <>
        <div style={{ width: 500 }}>
            <Card {...args} />
        </div>
    </>
)

export const Default = Template.bind({})
Default.args = cardGenerators.default()

export const Card1 = Template.bind({})
Card1.args = {
    ...cardGenerators.card1(),
    // DO NOT REMOVE: for some reason, when this line is removed, some layer between storybook removes the `variant` key.
    variant: CardVariants.Card1,
}

export const Card2 = Template.bind({})
Card2.args = {
    ...cardGenerators.card2(),
    // DO NOT REMOVE: for some reason, when this line is removed, some layer between storybook removes the `variant` key.
    variant: CardVariants.Card2,
}

export const Card3 = Template.bind({})
Card3.args = {
    ...cardGenerators.card3(),
    // DO NOT REMOVE: for some reason, when this line is removed, some layer between storybook removes the `variant` key.
    variant: CardVariants.Card3,
}
