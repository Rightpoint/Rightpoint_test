import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Link, LinkProps } from './Link.component'
import { linkGenerators } from './Link.data'
export default {
    component: Link,
    title: 'Atoms/Link',
    parameters: {
        docs: {
            description: {
                // component: ''
            },
        },
        // chromatic: { disableSnapshot: true },
    },
} as ComponentMeta<typeof Link>

const Template: ComponentStory<typeof Link> = (args) => <Link {...args} />

export const Default = Template.bind({})
Default.args = {
    ...linkGenerators.default(),
}
