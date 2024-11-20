import { ComponentStory, ComponentMeta } from '@storybook/react'
import {
    DynamicComponent,
    DynamicComponentProps,
} from './DynamicComponent.component'
import { dynamicComponentGenerators } from './DynamicComponent.data'
export default {
    component: DynamicComponent,
    title: 'Dynamic/DynamicComponent',
    parameters: {
        docs: {
            description: {
                // component: ''
            },
        },
        // chromatic: { disableSnapshot: true },
    },
} as ComponentMeta<typeof DynamicComponent>

const Template: ComponentStory<typeof DynamicComponent> = (args) => (
    <>
        <p>
            The DynamicComponent is a component that content authors can place,
            that imports custom or one off components.
        </p>
        <p>This is useful for introducing new features:</p>
        <ul>
            <li>
                Without hard coding: which requires putting together
                boilerplate, pages, and is not compatible with user generated
                pages.
            </li>
            <li>
                Without being a first class Contentful component: which takes up
                a limited Contentful Content Type.
            </li>
        </ul>
        <div>
            <DynamicComponent {...args} />
        </div>
    </>
)

export const Default = Template.bind({})
Default.args = {
    ...dynamicComponentGenerators.default(),
}
