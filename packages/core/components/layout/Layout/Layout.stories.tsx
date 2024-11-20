import { Story, Meta } from '@storybook/react'
import React from 'react'
import { Layout, LayoutProps } from './Layout.component'

export default {
    component: Layout,
    title: 'Layout/Layout',
} as Meta

const Template: Story<LayoutProps> = (args) => (
    <Layout {...args}>
        <div style={{ height: '70vh' }} />
    </Layout>
)

export const Primary = Template.bind({})
Primary.args = {
    debug: true,
}
