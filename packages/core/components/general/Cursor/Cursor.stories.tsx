import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Image } from '../Image/Image.component'
import { imageGenerators } from '../Image/Image.data'
import { MultiMedia } from '../MultiMedia/MultiMedia.component'
import { multiMediaGenerators } from '../MultiMedia/MultiMedia.data'
import { Cursor, CursorProps } from './Cursor.component'

export default {
    component: Cursor,
    title: 'Components/Cursor',
    parameters: {
        docs: {
            description: {
                // component: ''
            },
        },
        // chromatic: { disableSnapshot: true },
    },
} as ComponentMeta<typeof Cursor>

const Template: ComponentStory<typeof Cursor> = (args) => <Cursor {...args} />

export const Default = (args) => {
    return (
        <>
            <Cursor {...args} />

            <div style={{ width: 400 }} data-cursor-text="Scroll">
                <MultiMedia {...multiMediaGenerators.default()} />
            </div>
            <div style={{ width: 400 }} data-cursor-text="Alternate ">
                <MultiMedia {...multiMediaGenerators.default()} />
            </div>
        </>
    )
}
Default.args = {
    springConfig: { stiffness: 300, bounce: 0, damping: 50, mass: 1 },
}
