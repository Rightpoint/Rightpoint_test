import { GoldenRatioTestLayout } from '../storybook/layouts/GoldenRatioTestLayout'
import { Surface } from './Surface'

export default {
    title: 'Core/Surface',
    component: Surface,
    parameters: {
        layout: 'fullscreen',
    },
    argTypes: {},
}

const Template = (args) => (
    <GoldenRatioTestLayout
        style={{
            backgroundColor: 'grey',
        }}
    >
        {() => <Surface {...args} rounded={40} />}
    </GoldenRatioTestLayout>
)

export const Default = Template.bind({})

Default.args = {}
