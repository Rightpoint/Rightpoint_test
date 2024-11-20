import { useEffect } from '@storybook/addons'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { motion, AnimatePresence, useTransform, useScroll } from 'framer-motion'
import { times } from 'lodash'
import { useState } from 'react'
import { ScrollZoom, ScrollZoomProps } from './ScrollZoom.component'
import { ScrollZoomLogo } from './ScrollZoomLogo'
import { scrollZoomGenerators } from './ScrollZoom.data'
export default {
    component: ScrollZoom,
    title: 'Components/ScrollZoom',
    parameters: {
        docs: {
            description: {
                // component: ''
            },
        },
        chromatic: { disableSnapshot: true },
    },
} as ComponentMeta<typeof ScrollZoom>

const Template: ComponentStory<typeof ScrollZoom> = (args) => (
    <div style={{ height: '1000vh', marginTop: -10 }}>
        <ScrollZoom {...args} />
    </div>
)

export const Default = Template.bind({})
Default.args = {
    ...scrollZoomGenerators.default(),
}

const MultipleTemplate: ComponentStory<typeof ScrollZoom> = (args) => (
    <div style={{ height: '1000vh', marginTop: -10 }}>
        <ScrollZoom {...args} />
        <ScrollZoom {...args} />
        <ScrollZoom {...args} />
    </div>
)

export const ScrollMultipleTest = MultipleTemplate.bind({})
ScrollMultipleTest.args = scrollZoomGenerators.default()

export const ScrollMultipleNoLogo = MultipleTemplate.bind({})
ScrollMultipleNoLogo.args = scrollZoomGenerators.noTypewriter()

export const ScrollOffsetTest = () => {
    return (
        <div style={{ height: '1000vh' }}>
            <div style={{ paddingBottom: '100vh' }}>SCROLL DOWN</div>
            <ScrollZoom {...scrollZoomGenerators.default()} />
        </div>
    )
}

const LogoItem = ({
    index,
    offsetY,
    offsetX,
    scale,
    widthMod,
    opacityItemMod,
    totalLength,
    opacityProgressModifier = null,
}) => {
    const progress = index / totalLength
    return (
        <motion.div
            style={{
                position: 'absolute',
                width: `calc(100vw - ${widthMod * index}px)`,
                top: offsetY * index,
                left: offsetX * index,
                scale,

                ...(opacityProgressModifier
                    ? {
                          opacity: opacityProgressModifier * progress, // is 0/10 -- growing to 1
                      }
                    : {
                          opacity: 1 - opacityItemMod * index,
                      }),
            }}
        >
            <ScrollZoomLogo />
            <div
                style={{
                    position: 'absolute',
                    right: 0,
                    bottom: 0,
                }}
            >
                {index}
            </div>
        </motion.div>
    )
}
