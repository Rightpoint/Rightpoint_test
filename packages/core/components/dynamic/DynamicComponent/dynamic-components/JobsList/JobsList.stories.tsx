import { ComponentStory, ComponentMeta } from '@storybook/react'
import { JobsList, JobsListProps } from './JobsList.component'
import { jobsListGenerators } from './JobsList.data'

export default {
    component: JobsList,
    title: 'v2/JobsList',
    parameters: {
        docs: {
            description: {
                // component: ''
            },
        },
        // chromatic: { disableSnapshot: true },
    },
} as ComponentMeta<typeof JobsList>

const Template: ComponentStory<typeof JobsList> = (args) => (
    <>
        <p>This component needs a API call mock to work in Storybook.</p>
        <JobsList {...args} />
    </>
)

export const Default = Template.bind({})
Default.args = {
    ...jobsListGenerators.default(),
}
