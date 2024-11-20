import { Story, Meta } from '@storybook/react'
import { Footer, FooterProps } from './Footer.component'
import { footerGenerators } from './Footer.data'

export default {
    component: Footer,
    title: 'Layout/Footer',
    argTypes: {
        footerColor: {
            control: {
                type: 'select',
                options: ['black', 'white'],
            },
        },
    },
} as Meta

const Template: Story<FooterProps> = (args) => <Footer {...args} />

export const Primary = Template.bind({})

Primary.args = {
    ...footerGenerators.default(),
}
