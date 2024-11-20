import { ComponentStory, ComponentMeta } from '@storybook/react'
import { SimpleGridComposed } from './SimpleGrid.component'
import { gridGenerators } from './SimpleGrid.data'

import { ContainerBox } from '../../layout/RootComponent/container'

export default {
    component: SimpleGridComposed,
    title: 'v2/Components/SimpleGridComposed',
    parameters: {
        docs: {
            description: {
                // component: ''
            },
        },
        chromatic: { disableSnapshot: true },
    },
} as ComponentMeta<typeof SimpleGridComposed>

const Template: ComponentStory<typeof SimpleGridComposed> = (args) => (
    // layout because some variants remove the layout spacing
    <ContainerBox>
        <SimpleGridComposed {...args} />
    </ContainerBox>
)
export const ClientList = Template.bind({})
ClientList.args = gridGenerators.clientList()

export const LogoGrid = Template.bind({})
LogoGrid.args = gridGenerators.logoGrid()

export const Industries = Template.bind({})
Industries.args = gridGenerators.industries()
