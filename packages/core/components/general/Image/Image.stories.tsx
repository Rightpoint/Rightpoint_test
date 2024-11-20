import { Story, Meta } from '@storybook/react'
import { ImageWithAspect, ImageProps } from './Image.component'
import { imageGenerators } from './Image.data'

export default {
    component: ImageWithAspect,
    title: 'Atoms/MultiMedia/Isolated Child/Image',
} as Meta

const Template: Story<ImageProps> = (args) => <ImageWithAspect {...args} />

export const Primary = Template.bind({})
Primary.args = {
    ...imageGenerators.default(),
}
