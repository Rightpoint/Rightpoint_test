import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Header, HeaderProps } from './Header.component'
import { headerGenerators } from './Header.data'
export default {
    component: Header,
    title: 'v2/Components/Header',
    parameters: {
        docs: {
            description: {
                // component: ''
            },
        },
        // chromatic: { disableSnapshot: true },
    },
} as ComponentMeta<typeof Header>

const Template: ComponentStory<typeof Header> = (args) => (
    <>
        <Header {...args} />
    </>
)

export const Default = Template.bind({})
Default.args = {
    ...headerGenerators.default(),
}

export const Header1 = Template.bind({})
Header1.args = {
    ...headerGenerators.header1(),
}

export const Header2 = Template.bind({})
Header2.args = {
    ...headerGenerators.header2(),
}

export const Header2Stress = Template.bind({})
Header2Stress.args = {
    ...headerGenerators.header2(),
    title: 'Thinking',
    eyebrow: 'If the title is long, the body side should shrink to make room.',
}

export const Header3 = Template.bind({})
Header3.args = {
    ...headerGenerators.header3(),
}

export const Header4 = Template.bind({})
Header4.args = {
    ...headerGenerators.default(),
}

export const Header5 = Template.bind({})
Header5.args = {
    ...headerGenerators.header5(),
}

export const HeaderText = Template.bind({})
HeaderText.args = {
    ...headerGenerators.headerText(),
}
