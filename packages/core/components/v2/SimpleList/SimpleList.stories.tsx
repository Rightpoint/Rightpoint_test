import { ComponentStory, ComponentMeta } from '@storybook/react'
import { SimpleList, SimpleListProps } from './SimpleList.component'
import { simpleListGenerators } from './SimpleList.data'
export default {
    component: SimpleList,
    title: 'V2/Components/SimpleList',
    parameters: {
        docs: {
            description: {
                // component: ''
            },
        },
        // chromatic: { disableSnapshot: true },
    },
} as ComponentMeta<typeof SimpleList>

const Template: ComponentStory<typeof SimpleList> = (args) => (
    <SimpleList {...args} />
)

export const Default = Template.bind({})
Default.args = {
    ...simpleListGenerators.default(),
}
