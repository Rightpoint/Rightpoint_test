import { Meta } from '@storybook/react'
import { Toolbar, ToolbarOnQueryString } from './Toolbar.component'

export default {
    component: Toolbar,
    title: 'Animation/Toolbar',
    parameters: {
        chromatic: { disableSnapshot: true },
    },
} as Meta

export const Default = () => <Toolbar />

export const OnQuerystring = () => (
    <>
        <p>This only appears if querystring set to ?toolbar</p>
        <ToolbarOnQueryString />
    </>
)
