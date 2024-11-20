import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Layout } from '../../layout/Layout/Layout.component'
import { MultiMedia } from '../MultiMedia/MultiMedia.component'
import { multiMediaGenerators } from '../MultiMedia/MultiMedia.data'
import { Grid, GridLayout } from './Grid.component'
import { gridGenerators } from './Grid.data'
import { GridLayouts } from './Grid.types'

export default {
    component: GridLayout,
    title: 'Components/Grid',
    parameters: {
        docs: {
            description: {
                // component: ''
            },
        },
        chromatic: { disableSnapshot: true },
    },
} as ComponentMeta<typeof GridLayout>

const Template: ComponentStory<typeof Grid> = (args) => (
    <Layout>
        <Grid {...args} />
    </Layout>
)

export const Grid1 = Template.bind({})
Grid1.args = gridGenerators.default({})

export const Grid2 = Template.bind({})
Grid2.args = gridGenerators.grid2({})

export const Grid3 = Template.bind({})
Grid3.args = gridGenerators.grid3({})

export const Video = Template.bind({})
Video.args = gridGenerators.video({})

export const OtherMultiMedia = Template.bind({})
OtherMultiMedia.args = gridGenerators.otherMultiMedia({ num: 10 })

export const ZArbitraryComponents: ComponentStory<typeof GridLayout> = (
    args
) => (
    <Layout>
        <p>Example of arbitrary components using grid layout.</p>
        <GridLayout gridLayout={GridLayouts.Grid1}>
            <MultiMedia {...multiMediaGenerators.animatedImages()} />
            <MultiMedia {...multiMediaGenerators.animatedImages()} />
            <MultiMedia {...multiMediaGenerators.animatedImages()} />
            <MultiMedia {...multiMediaGenerators.animatedImages()} />
        </GridLayout>
        <GridLayout gridLayout={GridLayouts.Grid2}>
            <p>These are just p tags</p>
            <p>These are just p tags</p>
            <p>These are just p tags</p>
            <p>These are just p tags</p>
        </GridLayout>
    </Layout>
)
