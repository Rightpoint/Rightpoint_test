import { Story, Meta } from '@storybook/react'
import { motion } from 'framer-motion'
import {
    ExampleCard,
    MockupPaper,
    MockupGrid,
    ScrollDownHint,
    StoryWrapper,
    mockupColors,
} from './animation-mockups.component'

export default {
    component: ExampleCard,
    title: 'Old/Animation/Basic Concepts',
} as Meta

export const FadeInUp: Story = (args) => (
    <StoryWrapper
        workInProgress
        style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            paddingTop: '100vh',
            paddingBottom: '80vh',
        }}
    >
        <ScrollDownHint />

        <motion.div
            initial={{ opacity: 0, y: '10%' }}
            whileInView={{ opacity: 1, y: '0%' }}
            viewport={{ once: true, margin: '-50%' }}
        >
            <ExampleCard />
        </motion.div>
    </StoryWrapper>
)

export const GallerySlideInFromRight: Story = (args) => (
    <StoryWrapper
        workInProgress
        style={{
            position: 'relative',

            paddingTop: '100vh',
            paddingBottom: '10vh',
            overflow: 'hidden',
        }}
    >
        <ScrollDownHint>
            <div style={{ width: '30vw', paddingTop: 20, paddingBottom: 20 }}>
                <MockupGrid columns={4} gap={6}>
                    <MockupPaper
                        backgroundColor={mockupColors.black}
                        opacity={0.9}
                    />
                    <MockupPaper backgroundColor={mockupColors.black} />
                    <MockupPaper
                        backgroundColor={mockupColors.black}
                        opacity={0.9}
                    />
                    <MockupPaper backgroundColor={mockupColors.black} />
                </MockupGrid>
            </div>
        </ScrollDownHint>

        <motion.div
            style={{ width: '100%' }}
            initial={{ x: '-25%' }}
            whileInView={{ x: '-50%' }}
            viewport={{ once: false }}
            transition={{
                type: 'spring',
                damping: 20,
                stiffness: 50,
            }}
        >
            <MockupGrid columns={6} style={{ width: '250%' }}>
                <MockupPaper
                    backgroundColor={mockupColors.black}
                    opacity={0.9}
                />
                <MockupPaper backgroundColor={mockupColors.black} />
                <MockupPaper
                    backgroundColor={mockupColors.black}
                    opacity={0.9}
                />
                <MockupPaper backgroundColor={mockupColors.black} />
                <MockupPaper
                    backgroundColor={mockupColors.black}
                    opacity={0.9}
                />
                <MockupPaper backgroundColor={mockupColors.black} />
            </MockupGrid>
        </motion.div>
    </StoryWrapper>
)
