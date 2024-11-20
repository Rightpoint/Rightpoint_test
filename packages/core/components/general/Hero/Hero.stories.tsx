import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Layout } from '../../layout/Layout/Layout.component'
import { withBezierEditor } from '../../utils/BezierEditor/BezierEditor.component'
import { BackgroundColor } from '../BackgroundColor/BackgroundColor.component'
import { BackgroundColors } from '../BackgroundColor/BackgroundColor.styles'
import { CardVariants } from '../Card/Card.component'
import { Grid } from '../Grid/Grid.component'
import { gridGenerators } from '../Grid/Grid.data'
import { multiMediaGenerators } from '../MultiMedia/MultiMedia.data'
import { Hero, HeroContentWidths, HeroProps } from './Hero.component'
import { heroGenerators } from './Hero.data'

export default {
    component: Hero,
    title: 'components/Hero',
    args: {
        title: 'Hero' as string,
        mediaProps: multiMediaGenerators.default(),
    },
} as ComponentMeta<typeof Hero>

const Template: ComponentStory<typeof Hero> = (args) => <Hero {...args} />

export const Image = Template.bind({})
Image.args = heroGenerators.default()

export const AllContentWidths = () => (
    <Layout>
        {Object.entries(HeroContentWidths).map(([k, width]) => {
            return (
                <>
                    <Hero
                        key={k}
                        {...heroGenerators.default()}
                        contentWidth={width}
                        title={width}
                        subtitle={
                            'This example shows various content sizes. The subtitle content is also constrained by the content width.'
                        }
                    />
                    <hr style={{ margin: 100 }} />
                </>
            )
        })}
    </Layout>
)

export const AllContentWidthsWithBezier = withBezierEditor(AllContentWidths, {
    contexts: { transform: {} },
})

export const AnimatedImages = Template.bind({})
AnimatedImages.args = heroGenerators.animatedImages()

export const Video = Template.bind({})
Video.args = heroGenerators.video()
Video.parameters = {
    chromatic: { disableSnapshot: true },
}

export const OverflowingTitle = Template.bind({})
OverflowingTitle.args = heroGenerators.overflowingTitle()

export const StickyAnimation = (args) => (
    <Layout>
        <div
            style={{
                height: '75vh',
            }}
        >
            Scroll down
        </div>
        <Hero {...args.heroProps}>
            {/* 
                TODO: Nested heros can cause nested titles. 
                Do we need a generic solution? 
            */}
            <Grid
                {...gridGenerators.grid2({
                    itemsProps: {
                        withLink: false,
                    },
                })}
                cardVariant={CardVariants.Card2}
                title={null}
            />
        </Hero>
        <div
            style={{
                height: '100vh',
            }}
        ></div>
    </Layout>
)
StickyAnimation.args = {
    heroProps: heroGenerators.stickyAnimation(),
}

export const WithBackground = () => (
    <Layout>
        <div
            style={{
                height: '50vh',
            }}
        />
        <BackgroundColor color={BackgroundColors.Black}>
            <Hero
                {...heroGenerators.video()}
                subtitle="Background color testing"
            />
        </BackgroundColor>
        <div
            style={{
                height: '50vh',
            }}
        />
        <BackgroundColor color={BackgroundColors.Coral}>
            <Hero
                {...heroGenerators.video()}
                subtitle="Background color testing"
            />
        </BackgroundColor>

        <div
            style={{
                height: '50vh',
            }}
        />
    </Layout>
)
WithBackground.parameters = {
    chromatic: { disableSnapshot: true },
}
