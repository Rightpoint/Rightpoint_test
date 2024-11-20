import { Story, Meta } from '@storybook/react'
import { Navbar, NavbarProps } from './Navbar.component'

export default {
    component: Navbar,
    title: 'Layout/Navbar',
    parameters: {
        nextRouter: {
            asPath: '/work/browse/by-solution',
        },
    },
} as Meta

const Template: Story<NavbarProps> = (args) => (
    <div
        style={{
            height: '200vh',
        }}
    >
        <Navbar />
    </div>
)

export const Default = Template.bind({})
Default.args = {}

export const Sticky = Template.bind({})
Sticky.args = {
    sticky: true,
}
