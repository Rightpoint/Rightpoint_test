import { Story, Meta } from '@storybook/react'
import { Navbar, NavbarProps } from './Navbar.component'
import { userEvent, waitFor, within } from '@storybook/testing-library'

import { navbarData } from '@rightpoint/data-generators'
import { TestIds } from '@rightpoint/core/variables'

export default {
    component: Navbar,
    title: 'Layout/Navbar',
} as Meta

const Template: Story<NavbarProps> = (args) => <Navbar {...args} />

export const Default = Template.bind({})
Default.args = {
    ...navbarData,
}

export const Sticky = () => <Navbar {...navbarData} sticky={true} />

export const Play = Template.bind({})
Play.args = {
    ...navbarData,
}

Play.parameters = {
    chromatic: { disableSnapshot: true },
}

Play.play = async ({ args, canvasElement }) => {
    const canvas = within(canvasElement)

    await userEvent.click(canvas.getByTestId(TestIds.NavbarToggle))
    await (() => new Promise((resolve) => setTimeout(resolve, 1000)))()

    // await waitFor(() =>
    //   // expect(canvas.getByTestId("navbar-popup-inner")).toBeVisible()
    // );

    await userEvent.click(canvas.getByTestId(TestIds.NavbarToggle))

    // await waitFor(() =>
    //   expect(canvas.getByTestId("navbar-popup-inner")).to.not.be.visible()
    // );

    // await waitFor(() => expect(args.onSubmit).toHaveBeenCalled());
}
