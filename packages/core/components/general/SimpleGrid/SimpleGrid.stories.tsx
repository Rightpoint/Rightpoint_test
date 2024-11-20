import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Layout } from '../../layout/Layout/Layout.component'
import { SimpleGrid } from './SimpleGrid.component'
import { gridGenerators } from './SimpleGrid.data'

import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { BackgroundColor } from '../BackgroundColor/BackgroundColor.component'
import { BackgroundColors } from '../BackgroundColor/BackgroundColor.styles'

export default {
    component: SimpleGrid,
    title: 'Components/SimpleGrid',
    parameters: {
        docs: {
            description: {
                // component: ''
            },
        },
        chromatic: { disableSnapshot: true },
    },
} as ComponentMeta<typeof SimpleGrid>

const Template: ComponentStory<typeof SimpleGrid> = (args) => (
    // layout because some variants remove the layout spacing
    <Layout>
        <SimpleGrid {...args} />
    </Layout>
)

export const LogoGrid = Template.bind({})
LogoGrid.args = gridGenerators.logoGrid()

export const VariantClientList = Template.bind({})
VariantClientList.args = gridGenerators.clientList()

export const VariantClientListWithBackground = () => (
    <>
        <Layout>
            <div
                style={{
                    height: '50vh',
                }}
            />
            <BackgroundColor color={BackgroundColors.Black}>
                <SimpleGrid {...gridGenerators.clientList()} />
            </BackgroundColor>
            <div
                style={{
                    height: '100vh',
                }}
            />
        </Layout>
    </>
)

export const VariantCapabilities = Template.bind({})
VariantCapabilities.args = gridGenerators.capabilities()

export const ContentfulRichText = () => {
    const document = {
        nodeType: 'document',
        data: {},
        content: [
            {
                nodeType: 'paragraph',
                data: {},
                content: [
                    {
                        nodeType: 'text',
                        value: 'Hello',
                        marks: [{ type: 'bold' }],
                        data: {},
                    },
                    {
                        nodeType: 'text',
                        value: ' world!\n and a newline',
                        marks: [{ type: 'italic' }],
                        data: {},
                    },
                ],
            },
        ],
    }

    return (
        <div>
            Test Contentful Rich Text
            {documentToReactComponents(document as any)}
            <SimpleGrid {...gridGenerators.default()} />
        </div>
    )
}
