import { ComponentStory, ComponentMeta } from '@storybook/react'

import { scrollerGenerators, generateScrollerChildren } from '../Scroller.data'
import {
    ScrollerAutoScroll,
    ScrollerAutoScrollProps,
} from './ScrollerAutoScroll.component'

export default {
    title: 'Old/Scroller/AutoScroll',
    component: ScrollerAutoScroll,
    argTypes: {},
    parameters: {
        chromatic: { disableSnapshot: true },
    },
} as ComponentMeta<typeof ScrollerAutoScroll>

const Template: ComponentStory<typeof ScrollerAutoScroll> = (
    args: ScrollerAutoScrollProps
) => <ScrollerAutoScroll {...args} />

export const Default = Template.bind({})
Default.args = {
    ...scrollerGenerators.default(),
}

export const LessItems = Template.bind({})
LessItems.args = {
    ...scrollerGenerators.fewer(),
}

export const MultipleOffset = () => {
    return (
        <>
            <ScrollerAutoScroll {...scrollerGenerators.default()} />
            <br />
            <ScrollerAutoScroll
                {...scrollerGenerators.default()}
                swiperProps={{ slidesOffsetBefore: 70 }}
            />
            <br />
            <ScrollerAutoScroll
                {...scrollerGenerators.default()}
                swiperProps={{ slidesOffsetBefore: 330 }}
            />
        </>
    )
}

export const MultipleOffsetMixedDirection = () => {
    return (
        <>
            <ScrollerAutoScroll {...scrollerGenerators.default()} />
            <br />
            <ScrollerAutoScroll
                {...scrollerGenerators.default()}
                swiperProps={{
                    slidesOffsetBefore: 70,
                    autoplay: {
                        delay: 0,
                        disableOnInteraction: true,
                        reverseDirection: true,
                    },
                    speed: 18000,
                }}
            />
            <br />
            <ScrollerAutoScroll
                {...scrollerGenerators.default()}
                swiperProps={{ slidesOffsetBefore: 330 }}
            />
        </>
    )
}
