import { ComponentStory, ComponentMeta } from '@storybook/react'
import { SocialLinks, SocialLinksProps } from './SocialLinks.component'

export default {
    component: SocialLinks,
    title: 'V2/Misc/SocialLinks',
    parameters: {
        docs: {
            description: {
                // component: ''
            },
        },
        // chromatic: { disableSnapshot: true },
    },
} as ComponentMeta<typeof SocialLinks>

const Template: ComponentStory<typeof SocialLinks> = (args) => (
    <SocialLinks {...args} />
)

export const Default = Template.bind({})
Default.args = {}
