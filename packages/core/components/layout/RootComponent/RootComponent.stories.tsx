import { ComponentStory, ComponentMeta } from '@storybook/react'
import { RootComponent } from './RootComponent.component'
export default {
    component: RootComponent,
    title: 'Layout/RootComponent',
    parameters: {
        docs: {
            description: {
                // component: ''
            },
        },
        // chromatic: { disableSnapshot: true },
    },
} as ComponentMeta<typeof RootComponent>

const Template: ComponentStory<typeof RootComponent> = (args) => (
    <RootComponent {...args}>
        <ul>
            <li>The root component is intended to always be a sibling.</li>
            <li>Track unique ids.</li>
            <li>Allow for component context</li>
            <li>Apply width containers</li>
            <li>Backgrounds</li>
            <li>
                And via context, modify root component properties based on child
                state
            </li>
        </ul>
    </RootComponent>
)

export const Default = Template.bind({})
Default.args = {}
