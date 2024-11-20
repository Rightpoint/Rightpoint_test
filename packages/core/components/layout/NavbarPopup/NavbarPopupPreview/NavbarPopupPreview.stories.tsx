import { ComponentStory, ComponentMeta } from '@storybook/react'
import {
    NavbarPopupPreview,
    NavbarPopupPreviewProps,
} from './NavbarPopupPreview.component'

export default {
    component: NavbarPopupPreview,
    title: 'Layout/NavbarPopup/Components/Preview',
    parameters: {
        docs: {
            description: {
                // component: ''
            },
        },
        // chromatic: { disableSnapshot: true },
    },
    args: {},
} as ComponentMeta<typeof NavbarPopupPreview>

const Template: ComponentStory<typeof NavbarPopupPreview> = (args) => (
    <NavbarPopupPreview {...args} />
)

export const Default = Template.bind({})
Default.args = {}
