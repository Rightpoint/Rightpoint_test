import { ComponentStory, ComponentMeta } from '@storybook/react'
import {
    ThoughtDetailHeader,
    type ThoughtDetailHeaderProps,
} from './ThoughtDetailHeader'

export default {
    component: ThoughtDetailHeader,
    title: 'Components/Header/Thought Detail Header',
    parameters: {
        docs: {
            description: {
                // component: ''
            },
        },
        // chromatic: { disableSnapshot: true },
    },
} as ComponentMeta<typeof ThoughtDetailHeader>

const Template: ComponentStory<typeof ThoughtDetailHeader> = (args) => (
    <ThoughtDetailHeader {...args} />
)

export const CoAuthors = Template.bind({})
CoAuthors.args = {
    title: 'The authors should be separated by an "and"',
    authorsProps: [
        {
            name: 'John Doe',
            jobTitle: 'Author',
        },
        {
            name: 'Jane Doe',
            jobTitle: 'Author',
        },
    ],
} as ThoughtDetailHeaderProps

export const ManyCoAuthors = Template.bind({})
ManyCoAuthors.args = {
    title: 'The authors should be separated by an ","',
    authorsProps: [
        {
            name: 'John Doe',
            jobTitle: 'Author',
        },
        {
            name: 'Jane Doe',
            jobTitle: 'Author',
        },
        {
            name: 'Oxford Doe',
            jobTitle: 'Author',
        },
    ],
} as ThoughtDetailHeaderProps
