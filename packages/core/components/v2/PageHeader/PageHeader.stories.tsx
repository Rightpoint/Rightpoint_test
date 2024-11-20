import { ComponentStory, ComponentMeta } from '@storybook/react'
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
