import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Pardot, PardotButton, PardotProps } from './Pardot.component'
import { pardotGenerators } from './Pardot.data'
export default {
    component: Pardot,
    title: 'components/Pardot',
    parameters: {
        docs: {
            description: {
                // component: ''
            },
        },
        chromatic: {
            delay: 500, // wait for pardot to load
        },
    },
} as ComponentMeta<typeof Pardot>

export const Default = () => {
    return <PardotButton {...pardotGenerators.default()} />
}

export const FormOnly = () => {
    return <Pardot {...pardotGenerators.default()} />
}
