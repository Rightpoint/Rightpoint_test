import { ComponentStory, ComponentMeta } from '@storybook/react'
import { BackgroundColors } from '../../../../layout/RootComponent/background-color'
import {
    RootComponent,
    RootComponentProps,
} from '../../../../layout/RootComponent/RootComponent.component'
import {
    FloatingImageText,
    FloatingImageTextComposed,
    FloatingImageTextProps,
} from './FloatingImageText.component'
import { FloatingImages } from './FloatingImages'
import { floatingImageTextGenerators } from './FloatingImageText.data'

export default {
    component: FloatingImageText,
    title: 'Dynamic/FloatingImageText',
    parameters: {
        docs: {
            description: {
                // component: ''
            },
        },
        // chromatic: { disableSnapshot: true },
    },
} as ComponentMeta<typeof FloatingImageTextComposed>

const Template: ComponentStory<typeof FloatingImageTextComposed> = (args) => (
    <FloatingImageTextComposed {...args} />
)

export const Default = Template.bind({})
Default.args = {
    ...floatingImageTextGenerators.default(),
}
