import { ComponentStory, ComponentMeta } from '@storybook/react'
import { AnimateOnScroll } from './AnimateOnScroll.component'
import { motion } from 'framer-motion'
import { Hero, HeroContentWidths } from '../Hero/Hero.component'
import { MultiMedia } from '../MultiMedia/MultiMedia.component'
import { multiMediaGenerators } from '../MultiMedia/MultiMedia.data'
import {
    useBezierEditorContextDefaults,
    withBezierEditor,
} from '../../utils/BezierEditor/BezierEditor.component'
import { merge } from 'lodash'
import { GridLayouts } from '../Grid/Grid.types'

export default {
    component: AnimateOnScroll,
    title: 'Animation/Animate on Scroll',
    parameters: {
        docs: {
            description: {
                // component: ''
            },
        },
        chromatic: { disableSnapshot: true },
    },
    args: {
        // cardVariant: CardVariants.Card1,
        gridLayout: GridLayouts.Grid1,
        titleSticky: false,
    },
} as ComponentMeta<typeof AnimateOnScroll>

const withBezierEditorConfig = (Component, options = {}) => {
    return withBezierEditor(
        Component,
        merge(
            {
                contexts: {
                    ease: {
                        title: 'Easing',
                        defaultValue: [0, 0.5, 0.5, 1],
                    },
                },
                valuesToProps: (contextValues, props) => {
                    return {
                        ease: contextValues.ease,
                    }
                },
            },
            options
        )
    )
}

const Template: ComponentStory<any> = (args) => (
    <>
        <Hero title={'Scroll'} contentWidth={HeroContentWidths.Small}>
            <MultiMedia {...multiMediaGenerators.default()} />
        </Hero>
        <div
            style={{
                height: 100,
            }}
        />
        <AnimateOnScroll
            {...args}
            Wrapper={({ children }) => (
                <args.Wrapper {...args.wrapperProps}>{children}</args.Wrapper>
            )}
        />
    </>
)

/**
 * Fade in
 */
const InViewFadeIn = ({ children, duration, delay }) => {
    const { ease } = useBezierEditorContextDefaults({
        ease: [0, 0.5, 0.5, 1],
    })

    return (
        <motion.div
            transition={{
                duration,
                delay,
                ease,
            }}
            initial={{
                opacity: 0,
            }}
            whileInView={{
                opacity: 1,
            }}
            viewport={{
                once: true,
            }}
        >
            {children}
        </motion.div>
    )
}

export const FadeIn = Template.bind({})
FadeIn.args = {
    Wrapper: InViewFadeIn,
    wrapperProps: {
        duration: 1,
        delay: 0,
    },
}
// https://stackoverflow.com/questions/47011055/smooth-vertical-scrolling-on-mouse-wheel-in-vanilla-javascript
/**
 * Slide up
 */
const InViewSlide = ({
    children,
    iOpacity,
    iTranslateY = '5%',
    iTranslateX = '0%',
    duration = 5,
    delay = 0,
}) => {
    const { ease } = useBezierEditorContextDefaults({
        ease: [0, 0.5, 0.5, 1],
    })
    return (
        <motion.div
            transition={{
                duration,
                delay,
                ease,
            }}
            initial={{
                opacity: iOpacity,
                translateY: iTranslateY,
                translateX: iTranslateX,
            }}
            whileInView={{
                opacity: 1,
                translateY: '0%',
                translateX: '0%',
            }}
            viewport={{
                once: true,
            }}
        >
            {children}
        </motion.div>
    )
}
export const SlideUp = withBezierEditorConfig(Template.bind({})) as any
SlideUp.args = {
    Wrapper: InViewSlide,
    wrapperProps: {
        iTranslateY: '10%',
        iOpacity: 0,
        duration: 1,
    },
}

export const SlideLeft = withBezierEditorConfig(Template.bind({})) as any
SlideLeft.args = {
    Wrapper: InViewSlide,
    wrapperProps: {
        iTranslateY: '0%',
        iTranslateX: '5%',
        iOpacity: 0,
        duration: 1,
    },
}

/**
 * Reveal up
 */
const InViewRevealUp = ({
    children,
    duration = 5,
    delay = 0,
    background = '#f5f5f5',
    transformOrigin = 'top center',
}) => {
    const { ease } = useBezierEditorContextDefaults({
        ease: [0, 0.5, 0.5, 1],
    })
    return (
        <motion.div
            style={{
                position: 'relative',
            }}
        >
            <motion.div
                transition={{
                    duration,
                    delay,
                    ease,
                }}
                initial={{}}
                whileInView={{
                    opacity: 1,
                    transformOrigin,
                    scaleY: 0,
                }}
                viewport={{
                    once: true,
                }}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    zIndex: 1,
                    background,
                }}
            />
            {children}
        </motion.div>
    )
}

export const Reveal = withBezierEditorConfig(
    Template.bind({})
) as ComponentStory<any>

Reveal.args = {
    Wrapper: InViewRevealUp,
    wrapperProps: {
        background: '#FFFFFF',
        duration: 1,
        transformOrigin: 'top center',
    },
}
Reveal.argTypes = {}
