import { ComponentStory, ComponentMeta } from '@storybook/react'
import {
    Unstacker,
    UnstackerProps,
    UnstackerScrollContained,
} from './Unstacker.component'
import { unstackerGenerators } from './Unstacker.data'
import { Hero, HeroContentWidths } from '../Hero/Hero.component'

import { withBezierEditor } from '../../utils/BezierEditor/BezierEditor.component'
import { BackgroundColor } from '../BackgroundColor/BackgroundColor.component'

export default {
    component: Unstacker,
    title: 'Components/Unstacker',
    parameters: {
        docs: {
            description: {
                // component: ''
            },
        },
        // chromatic: { disableSnapshot: true },
    },
} as ComponentMeta<typeof Unstacker>

const Template: ComponentStory<typeof Unstacker> = (args) => {
    return (
        <>
            <BackgroundColor color={args.color}>
                <Hero title="Stack" />
                <div
                    style={{
                        height: 200,
                    }}
                />
                <Unstacker {...args} />
            </BackgroundColor>
        </>
    )
}

export const Default = Template.bind({})
Default.args = unstackerGenerators.default()

// export const Coral = Template.bind({})
// Coral.args = {
//     ...unstackerGenerators.default(),
//     color: BackgroundColors.Coral,
// }

export const WithBezier = withBezierEditor(Template.bind({}), {
    contexts: {
        vertical: {
            title: 'Slide vertical movement',
        },
        text1: {
            title: 'Text transform enter',
        },
        text2: {
            title: 'Text transform exit',
        },
        textOpacity: {},
    },
    valuesToProps: (values) => {
        return {
            easings: {
                vertical: values.vertical,
                text1: values.text1,
                text2: values.text2,
                textOpacity: values.textOpacity,
            },
        }
    },
})

WithBezier.args = { ...unstackerGenerators.default() }

export const WithDebug = WithBezier.bind({})
WithDebug.args = {
    ...unstackerGenerators.default(),
    debug: true,
}

export const WithScrollBasedAnimationContainer = (args) => {
    return (
        <BackgroundColor color={args.color}>
            <Hero
                // {...heroGenerators.default()}
                title="Unstacker (with ScrollBasedAnimationContainer)"

                // contentWidth={HeroContentWidths.Small}
            />
            <div
                style={{
                    height: 200,
                }}
            />
            <UnstackerScrollContained {...args} />

            <div
                style={{
                    height: '230vh',
                    paddingTop: 400,
                }}
            >
                <Hero title="After" />
            </div>
        </BackgroundColor>
    )
}

WithScrollBasedAnimationContainer.args = {
    ...unstackerGenerators.default(),
    debug: true,
}
