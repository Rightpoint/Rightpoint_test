import { icons } from '@rightpoint/core/styles'
import { Story, Meta } from '@storybook/react'
import { linkGenerators } from '../Link/Link.data'
import {
    Button,
    ButtonLink,
    ButtonLinkProps,
    ButtonProps,
} from './Button.component'

export default {
    component: Button,
    title: 'atoms/Button',
} as Meta

const Template: Story<ButtonProps> = (args) => <Button {...args} />

export const Default = Template.bind({})
Default.args = {
    children: 'Button Text',
}

export const WithIcon = Template.bind({})
WithIcon.args = {
    children: (
        <>
            Button Text
            <icons.Arrow />
        </>
    ),
}

export const Long = Template.bind({})
Long.args = {
    children: 'Very Long Button Text Example',
}
export const Wrapped = Template.bind({})
Wrapped.args = {
    children: (
        <>
            Wrapped Button
            <br /> Text
        </>
    ),
}

const ButtonLinkTemplate: Story<ButtonLinkProps> = (args) => (
    <ButtonLink {...args} />
)

export const ButtonWithLink = ButtonLinkTemplate.bind({})
ButtonWithLink.args = {
    linkProps: {
        href: 'https://www.google.com',
    },
    text: "I'm a button link",
}
