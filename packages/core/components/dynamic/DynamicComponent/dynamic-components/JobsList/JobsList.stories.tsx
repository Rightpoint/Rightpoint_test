import { ComponentStory, ComponentMeta } from '@storybook/react'
import { JobsList, JobsListProps } from './JobsList.component'
import { jobsListGenerators } from './JobsList.data'

export default {
    component: JobsList,
    title: 'v2/Dynamic Components/JobsList',
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
        <p>
            The jobs list component uses hard coded API response data in
            Storybook.
        </p>
        <JobsList {...args} />
    </>
)

export const Default = Template.bind({})
Default.args = {
    ...jobsListGenerators.default(),
}
