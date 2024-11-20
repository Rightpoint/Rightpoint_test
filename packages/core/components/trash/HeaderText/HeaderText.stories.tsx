import { ComponentStory, ComponentMeta } from '@storybook/react'
import { HeaderText, HeaderTextProps } from './HeaderText.component'
import { headerTextGenerators } from './HeaderText.data'

export default {
    component: HeaderText,
    title: 'Components/Header/HeaderText',
    parameters: {
        docs: {
            description: {
                // component: ''
            },
        },
        /**
         * Disabled snapshots because they are used in other components that are also a part of the storybook.
         */
        chromatic: { disableSnapshot: true },
    },
} as ComponentMeta<typeof HeaderText>

const Template: ComponentStory<typeof HeaderText> = (args) => (
    <>
        <HeaderText {...args} />
    </>
)

export const Typewriter = Template.bind({})
Typewriter.args = headerTextGenerators.typewriter()

export const CaseStudy = Template.bind({})
CaseStudy.args = headerTextGenerators.caseStudy()

export const CaseStudyLong = Template.bind({})
CaseStudyLong.args = headerTextGenerators.caseStudyLong()

export const PostWithCTA = Template.bind({})
PostWithCTA.args = headerTextGenerators.postWithCta()

export const PostWithAuthor = Template.bind({})
PostWithAuthor.args = headerTextGenerators.postWithAuthor()
