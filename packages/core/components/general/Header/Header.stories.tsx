import { ComponentStory, ComponentMeta } from '@storybook/react'
import { headerTextGenerators } from '../HeaderText/HeaderText.data'
import { Header, HeaderProps } from './Header.component'
import { headerGenerators } from './Header.data'

export default {
    component: Header,
    title: 'Components/Header',
    parameters: {
        docs: {
            description: {
                // component: ''
            },
        },
        // chromatic: { disableSnapshot: true },
    },
} as ComponentMeta<typeof Header>

const Template: ComponentStory<typeof Header> = (args) => <Header {...args} />

export const Default = Template.bind({})
Default.args = {
    ...headerGenerators.default(),
}
