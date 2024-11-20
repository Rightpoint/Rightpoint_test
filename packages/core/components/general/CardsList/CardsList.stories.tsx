import { ComponentStory, ComponentMeta } from '@storybook/react'
import { CardsList, CardsListProps } from './CardsList.component'
import { cardsListGenerators } from './CardsList.data'
export default {
    component: CardsList,
    title: 'Components/CardsList',
    parameters: {
        docs: {
            description: {
                // component: ''
            },
        },
        // chromatic: { disableSnapshot: true },
    },
} as ComponentMeta<typeof CardsList>

const Template: ComponentStory<typeof CardsList> = (args) => (
    <CardsList {...args} />
)

export const Default = () => {
    return [
        cardsListGenerators.default(),
        cardsListGenerators.grid(),
        cardsListGenerators.single(),
    ].map((props, i) => <CardsList {...props} key={i} />)
}
