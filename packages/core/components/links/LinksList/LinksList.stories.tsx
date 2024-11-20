import { ComponentStory, ComponentMeta } from '@storybook/react'
import { LinksList, LinksListProps } from './LinksList.component'
import { linksListGenerators } from './LinksList.data'
export default {
    component: LinksList,
    title: 'v2/Sub Components/LinksList',
    parameters: {
        docs: {
            description: {
                // component: ''
            },
        },
        // chromatic: { disableSnapshot: true },
    },
} as ComponentMeta<typeof LinksList>

const Template: ComponentStory<typeof LinksList> = (args) => (
    <LinksList {...args} />
)

export const Default = Template.bind({})
Default.args = {
    ...linksListGenerators.default(),
}
