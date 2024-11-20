import { ComponentStory, ComponentMeta } from '@storybook/react'
import { PeopleGrid, PeopleGridProps } from './PeopleGrid.component'
import { peopleGridGenerators } from './PeopleGrid.data'
export default {
    component: PeopleGrid,
    title: 'Components/PeopleGrid',
    parameters: {
        docs: {
            description: {
                // component: ''
            },
        },
        // chromatic: { disableSnapshot: true },
    },
} as ComponentMeta<typeof PeopleGrid>

const Template: ComponentStory<typeof PeopleGrid> = (args) => (
    <PeopleGrid {...args} />
)

export const Default = Template.bind({})
Default.args = {
    ...peopleGridGenerators.default(),
}
