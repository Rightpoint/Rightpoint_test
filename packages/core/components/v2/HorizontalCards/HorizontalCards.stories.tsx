import { ComponentStory, ComponentMeta } from '@storybook/react'
import { times } from 'lodash'
import { ContainerBox } from '../../layout/RootComponent/container'
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
    <ContainerBox>
        <HorizontalCards {...args} />
    </ContainerBox>
)

export const Default = Template.bind({})
Default.args = {
    ...horizontalCardsGenerators.default(),
}

export const StressTest = () => {
    return times(8, () => (
        <ContainerBox>
            <HorizontalCards {...horizontalCardsGenerators.default()} />
        </ContainerBox>
    ))
}
