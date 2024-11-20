import { ComponentStory, ComponentMeta } from '@storybook/react'
import {
    NavbarPopupContent,
    NavbarPopupContentProps,
} from './NavbarPopupContent.component'
export default {
    component: NavbarPopupContent,
    title: 'Layout/NavbarPopup/Components/Content',
    parameters: {
        docs: {
            description: {
                // component: ''
            },
        },
        // chromatic: { disableSnapshot: true },
    },
} as ComponentMeta<typeof NavbarPopupContent>

const Template: ComponentStory<typeof NavbarPopupContent> = (args) => (
    <NavbarPopupContent {...args} />
)

export const Default = Template.bind({})
Default.args = {}
