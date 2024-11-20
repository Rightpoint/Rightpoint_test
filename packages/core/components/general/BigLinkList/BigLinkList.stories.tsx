import { ComponentStory, ComponentMeta } from '@storybook/react'
import {
    BigLinkList,
    BigLinkListComposed,
    BigLinkListProps,
} from './BigLinkList.component'
import {
    bigLinkListComposedGenerators,
    bigLinkListGenerators,
} from './BigLinkList.data'

export default {
    component: BigLinkList,
    title: 'components/BigLinkList',
    parameters: {
        docs: {
            description: {
                component: 'Big link list',
            },
        },
    },
} as ComponentMeta<typeof BigLinkList>

const Template: ComponentStory<typeof BigLinkList> = (args) => (
    <BigLinkList {...args} />
)

export const Default = Template.bind({})
Default.args = {
    ...bigLinkListGenerators.default(),
}

export const ComposedWithHero = () => {
    return <BigLinkListComposed {...bigLinkListComposedGenerators.default()} />
}
