import { ComponentStory, ComponentMeta } from '@storybook/react'
import { BackgroundColors } from '../../layout/RootComponent/background-color'
import { RootComponent } from '../../layout/RootComponent/RootComponent.component'
import { HeroBanner, HeroBannerProps } from './HeroBanner.component'
import { heroBannerGenerators } from './HeroBanner.data'
export default {
    component: HeroBanner,
    title: 'V2/Components/HeroBanner',
    parameters: {
        docs: {
            description: {
                // component: ''
            },
        },
        // chromatic: { disableSnapshot: true },
    },
} as ComponentMeta<typeof HeroBanner>

const Template: ComponentStory<typeof HeroBanner> = (args) => (
    <HeroBanner {...args} />
)

export const Default = Template.bind({})
Default.args = {
    ...heroBannerGenerators.default(),
}

export const Landscape = Template.bind({})
Landscape.args = heroBannerGenerators.landscape()
