import { ComponentStory, ComponentMeta } from '@storybook/react'
import { FC, useEffect } from 'react'
import { withBezierEditor } from '../../utils/BezierEditor/BezierEditor.component'
import { GridItem, GridLayout } from '../Grid/Grid.component'
import { gridGenerators } from '../Grid/Grid.data'
import { Hero, HeroContentWidths } from '../Hero/Hero.component'
import { MultiMedia } from '../MultiMedia/MultiMedia.component'
import { multiMediaGenerators } from '../MultiMedia/MultiMedia.data'
import {
    Parallaxer,
    ParallaxOnScroll,
    ParallaxOnScrollProps,
} from './ParallaxOnScroll.component'
import { parallaxOnScrollGenerators } from './ParallaxOnScroll.data'
import { typography } from '@rightpoint/core/styles'

export default {
    component: ParallaxOnScroll,
    title: 'Animation/Parallax on Scroll',
    parameters: {
        docs: {
            description: {
                // component: ''
            },
        },
        chromatic: { disableSnapshot: true },
    },
} as ComponentMeta<typeof ParallaxOnScroll>

const Template: ComponentStory<typeof ParallaxOnScroll> = (args) => (
    <ParallaxOnScroll {...args} />
)

const data = gridGenerators.default()
export const Default = (args) => {
    return (
        <>
            {' '}
            <div
                style={{
                    height: '80vh',
                }}
            />
            <GridLayout
                heroProps={{
                    title: 'Scroll',
                    titleSticky: true,
                }}
                {...data}
            >
                <Parallaxer>
                    <GridItem {...data.items[0]} />
                </Parallaxer>
                <Parallaxer>
                    <GridItem {...data.items[1]} />
                </Parallaxer>
                <div>
                    <typography.H2>Random text</typography.H2>
                </div>
                <Parallaxer>
                    <GridItem {...data.items[2]} />
                </Parallaxer>
                <Parallaxer>
                    <GridItem {...data.items[3]} />
                </Parallaxer>
                <Parallaxer>
                    <GridItem {...data.items[4]} />
                </Parallaxer>
                https://stackoverflow.com/questions/47011055/smooth-vertical-scrolling-on-mouse-wheel-in-vanilla-javascript
            </GridLayout>
        </>
    )
}
Default.args = {
    ...parallaxOnScrollGenerators.default(),
}

export const WithBezier = withBezierEditor(Template.bind({}), {
    contexts: {
        easing: {},
    },
})

WithBezier.args = {
    ...parallaxOnScrollGenerators.default(),
}

export const WithHero = () => {
    return (
        <>
            <div
                style={{
                    height: '100vh',
                }}
            />
            <Hero
                title="Parallaxing hero"
                // Title={({ children }) => {
                //     return <Parallaxer>{children}</Parallaxer>
                // }}
                contentWidth={HeroContentWidths.Small}
            >
                <Parallaxer
                    transformRangeEnd={['translateY(20%)', 'translateY(-20%)']}
                    // transformRangeEnd={['translateY(0%)', 'translateY(-50%)']}
                    // startWindowMultiplier={0.4} // numbers less than 1 don't animate until further up the screen
                >
                    <MultiMedia {...multiMediaGenerators.default()} />
                </Parallaxer>
            </Hero>

            <div
                style={{
                    height: '150vh',
                }}
            />
        </>
    )
}

export const WithHero2 = () => {
    return (
        <>
            <div
                style={{
                    height: '100vh',
                }}
            />
            <Hero
                title="Parallaxing hero"
                // Title={({ children }) => {
                //     return <Parallaxer>{children}</Parallaxer>
                // }}
                contentWidth={HeroContentWidths.Small}
            >
                <Parallaxer
                    transformRangeEnd={['translateY(0%)', 'translateY(-50%)']}
                    startWindowMultiplier={0.4} // numbers less than 1 don't animate until further up the screen
                >
                    <MultiMedia {...multiMediaGenerators.default()} />
                </Parallaxer>
            </Hero>
            <p>
                This example starts at 40% of viewport height, and translates
                from 0%, so that the component looks correct until its going
                away.
            </p>
            <p>
                Still sketchy, because parallax has to do with window height,
                and this content can be at top of page.
            </p>
            <div
                style={{
                    height: '150vh',
                }}
            />
        </>
    )
}
