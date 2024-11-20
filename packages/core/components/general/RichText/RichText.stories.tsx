import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Layout } from '@rightpoint/core/components'
import { RichText } from './RichText.component'
import { richTextGenerators } from './RichText.data'
import { RootComponent } from '../../layout/RootComponent/RootComponent.component'
import { BackgroundColors } from '../../layout/RootComponent/background-color'

export default {
    component: RichText,
    title: 'Components/RichText',
    parameters: {
        docs: {
            description: {
                // component: ''
            },
        },
        // chromatic: { disableSnapshot: true },
    },

    /**
     * Rich text contains circular references the storybook controls cannot handle.
     */
    argTypes: {
        body: {
            table: {
                disable: true,
            },
            control: false,
        },
    },
} as ComponentMeta<typeof RichText>

const Width = ({ children }) => {
    return (
        <div
            style={{
                padding: 100,
                maxWidth: 900,
            }}
        >
            {children}
        </div>
    )
}
const Template: ComponentStory<typeof RichText> = (args) => (
    <>
        <Layout>
            <Width>
                <RichText {...args} />
            </Width>
            <RootComponent
                background={{ backgroundColor: BackgroundColors.Sand }}
            >
                <Width>
                    <RichText {...args} />
                </Width>
            </RootComponent>
            <RootComponent
                background={{ backgroundColor: BackgroundColors.Black }}
            >
                <Width>
                    <RichText {...args} />
                </Width>
            </RootComponent>
        </Layout>
    </>
)

export const WithHeaders = Template.bind({})
WithHeaders.args = {
    ...richTextGenerators.withHeaders(),
}

export const WithLinks = Template.bind({})
WithLinks.args = {
    ...richTextGenerators.withLinks(),
}

export const WithLinkEmbeds = Template.bind({})
WithLinkEmbeds.args = {
    ...richTextGenerators.withLinksEmbeds(),
}
