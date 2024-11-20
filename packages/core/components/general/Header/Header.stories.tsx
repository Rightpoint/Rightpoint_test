import { ComponentStory, ComponentMeta } from '@storybook/react'
import { headerTextGenerators } from '../HeaderText/HeaderText.data'
import { Header, HeaderProps } from './Header.component'
import { headerGenerators } from './Header.data'

export default {
    component: Header,
    title: 'Components/Header',
    parameters: {
        docs: {
            description: {
                // component: ''
            },
        },
        // chromatic: { disableSnapshot: true },
    },
} as ComponentMeta<typeof Header>

const Template: ComponentStory<typeof Header> = (args) => <Header {...args} />

export const Default = Template.bind({})
Default.args = {
    ...headerGenerators.default(),
}

export const BackgroundHalfTop = Template.bind({})
BackgroundHalfTop.args = headerGenerators.halfBackground()

export const BackgroundHalfBottom = Template.bind({})
BackgroundHalfBottom.args = headerGenerators.halfBackgroundBottom()

export const BackgroundSolid = Template.bind({})
BackgroundSolid.args = headerGenerators.solidBackground()

export const Typewriter = Template.bind({})
Typewriter.args = {
    ...headerGenerators.default(),
    headerTextProps: headerTextGenerators.typewriter(),
}
Typewriter.parameters = {
    chromatic: { disableSnapshot: true },
}

export const CaseStudy = Template.bind({})
CaseStudy.args = {
    ...headerGenerators.default(),
    headerTextProps: headerTextGenerators.caseStudy(),
}

export const PostWithAuthor = Template.bind({})
PostWithAuthor.args = {
    ...headerGenerators.postWithAuthor(),
}

export const Playground = () => {
    return (
        <>
            <p>How do we make this header handle all the variants?</p>
            <p>Sometimes, there is a video below. Header, Video, Text</p>
            <p>Often, there a MultiMedia below, sometimes with text.</p>
            <p>Blog Post: Header, Small Asset.</p>
            <p>Case Study: Header, HeroTitle, Image, Text</p>
            Background: sometimes, sometimes to half edge of content.
        </>
    )
}
