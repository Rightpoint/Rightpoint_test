import { ComponentStory, ComponentMeta } from '@storybook/react'
import { ContentColors } from '../../layout/RootComponent/background-color'
import { PageHeader, PageHeaderProps } from './PageHeader.component'
import { pageHeaderGenerators } from './PageHeader.data'

export default {
    component: PageHeader,
    title: 'V2/Components/PageHeader',
    parameters: {
        docs: {
            description: {
                // component: ''
            },
        },
        // chromatic: { disableSnapshot: true },
    },
} as ComponentMeta<typeof PageHeader>

const Template: ComponentStory<typeof PageHeader> = (args) => (
    <PageHeader {...args} />
)

export const Default = Template.bind({})
Default.args = {
    ...pageHeaderGenerators.default(),
}

export const Solutions = Template.bind({})
Solutions.args = {
    ...pageHeaderGenerators.solutions(),
}

export const Home = Template.bind({})
Home.args = {
    ...pageHeaderGenerators.home(),
}

export const InsideRightpoint = Template.bind({})
InsideRightpoint.args = {
    ...pageHeaderGenerators.insideRightpoint(),
}
InsideRightpoint.parameters = {
    chromatic: {
        disableSnapshot: true,
    },
}

export const LongTitle = Template.bind({})
LongTitle.args = {
    ...pageHeaderGenerators.longTitle(),
}

export const Contact = Template.bind({})
Contact.args = {
    ...pageHeaderGenerators.contact(),
}
