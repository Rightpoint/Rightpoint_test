import { ComponentStory, ComponentMeta } from '@storybook/react'
import { InPageLinkList, InPageLinkListProps } from './InPageLinkList.component'
import { inPageLinkListGenerators } from './InPageLinkList.data'
export default {
    component: InPageLinkList,
    title: 'InPageLinkList',
    parameters: {
        docs: {
            description: {
                // component: ''
            },
        },
        // chromatic: { disableSnapshot: true },
    },
} as ComponentMeta<typeof InPageLinkList>

const Template: ComponentStory<typeof InPageLinkList> = (args) => (
    <InPageLinkList {...args} />
)

export const Default = Template.bind({})
Default.args = {
    ...inPageLinkListGenerators.default(),
}
