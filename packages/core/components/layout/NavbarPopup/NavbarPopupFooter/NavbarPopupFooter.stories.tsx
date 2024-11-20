import { ComponentStory, ComponentMeta } from '@storybook/react'
import {
    NavbarPopupFooter,
    NavbarPopupFooterProps,
} from './NavbarPopupFooter.component'
import { navbarPopupFooterGenerators } from './NavbarPopupFooter.data'

export default {
    component: NavbarPopupFooter,
    title: 'Layout/NavbarPopup/Components/Footer',
    parameters: {
        docs: {
            description: {
                // component: ''
            },
        },
        // chromatic: { disableSnapshot: true },
    },
} as ComponentMeta<typeof NavbarPopupFooter>

const Template: ComponentStory<typeof NavbarPopupFooter> = (args) => (
    <NavbarPopupFooter {...args} />
)

export const Default = Template.bind({})
Default.args = {
    ...navbarPopupFooterGenerators.default(),
    decoratorArgs: {
        background: 'black',
    },
}
