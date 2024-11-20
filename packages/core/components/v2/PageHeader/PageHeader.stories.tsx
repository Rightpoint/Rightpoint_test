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

    rootDecoratorArgs: {
        background: {
            contentColor: ContentColors.Light,
        },
    },
}

export const Solutions = Template.bind({})
Solutions.args = {
    ...pageHeaderGenerators.solutions(),

    rootDecoratorArgs: {
        background: {
            contentColor: ContentColors.Light,
        },
    },
}

export const InsideRightpoint = Template.bind({})
InsideRightpoint.args = {
    ...pageHeaderGenerators.insideRightpoint(),

    rootDecoratorArgs: {
        background: {
            contentColor: ContentColors.Light,
        },
    },
}
