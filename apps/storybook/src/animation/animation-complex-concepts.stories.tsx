/* eslint-disable */
import styled, { css } from 'styled-components'
import { Story, Meta } from '@storybook/react'
import { useTransform, motion, useScroll } from 'framer-motion'
import { useCallback, useRef, useState } from 'react'

import {
    ExampleImage,
    ExampleCard,
    ScrollDownHint,
    StoryWrapper,
    RiformaTrial,
    RecklessNeue,
    Flex,
} from './animation-mockups.component'

import { introImages } from './images'
import { useEffect } from 'react'
import { scrollIt } from './utils/animation-scroll'

export default {
    component: StoryWrapper,
    title: 'Old/Animation/Complex Concepts',
    parameters: {
        chromatic: { disableSnapshot: true },
    },
} as Meta

const FixedPanel = styled.div<any>`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #fff;
    z-index: 0;

    display: flex;
    flex-direction: column;

    ${({ center }) =>
        center &&
        css`
            align-items: center;
            justify-content: center;
        `}
`

const FastCarouselImage = styled(({ index, total, imageId, ...props }) => (
    <motion.div
        {...props}
        animate={{ x: [-50, 0, -50], zIndex: [0, index, 0] }}
        transition={{ duration: 3 }}
    >
        <ExampleImage imageId={imageId} />
    </motion.div>
))`
    position: absolute;
    left: 50%;
    top: 50%;
`

const FastCarouselImageSquencing: Story = () => (
    <StoryWrapper
        workInProgress
        style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            paddingTop: '10vh',
            paddingBottom: '10vh',
        }}
    >
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
        >
            <FastCarouselImage index={0} total={5} imageId={1} />
            <FastCarouselImage index={1} total={5} imageId={2} />
            <FastCarouselImage index={2} total={5} imageId={3} />
            <FastCarouselImage index={3} total={5} imageId={4} />
            <FastCarouselImage index={4} total={5} imageId={5} />
        </motion.div>
    </StoryWrapper>
)

const ScrollStackCard = ({
    scrollY,
    index,
    parentOffsetTop,
    ...props
}: any) => {
    const [offsetTop, setTopOffset] = useState(0)

    const cardRef = useRef<HTMLDivElement>()

    const setCardRef = useCallback((node) => {
        if (node) {
            cardRef.current = node
            const { offsetTop } = node
            setTopOffset(offsetTop)
            console.log('Set ScrollStackCard offset', offsetTop)
        }
    }, [])

    const cardHeight = cardRef.current?.clientHeight || 0

    const baseOffsetMargin = 200
    const offsetMargin = 250

    const offsetTopX = cardRef.current?.offsetTop || 0

    const marginBottom = useTransform(
        scrollY,
        [
            parentOffsetTop + baseOffsetMargin + offsetMargin * index,
            parentOffsetTop + baseOffsetMargin + offsetMargin * index + 150,
        ],
        [0, cardHeight * -0.8]
    )

    return (
        <motion.div
            style={{
                marginBottom,
            }}
        >
            <ExampleCard
                ref={setCardRef}
                {...props}
                style={{ position: 'relative', zIndex: index }}
            />
        </motion.div>
    )
}

const ScrollStack = () => {
    const { scrollY } = useScroll()

    const stackRef = useRef<HTMLDivElement>(null)

    return (
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
        >
            <div ref={stackRef}>
                {[1, 2, 3, 4].map((_, index) => (
                    <ScrollStackCard
                        index={index}
                        scrollY={scrollY}
                        parentOffsetTop={stackRef.current?.offsetTop || 0}
                        key={index}
                        {...(index === 0
                            ? {}
                            : index % 2 === 1
                            ? {
                                  backgroundColor: '#100f0d',
                                  textColor: 'white',
                              }
                            : { backgroundColor: '#EF3824' })}
                    />
                ))}
            </div>
        </motion.div>
    )
}

const AnimatedScrollStack: Story = () => (
    <StoryWrapper
        workInProgress
        style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            paddingTop: '60vh',
            paddingBottom: '60vh',
        }}
    >
        <ScrollDownHint style={{ position: 'absolute', inset: 0 }} />

        <ScrollStack />
    </StoryWrapper>
)

export const IntroImageSequencingScrollBased: Story = ({
    pageHeight = '300vh',
}) => {
    const { scrollYProgress } = useScroll()

    const AnimatedImageIntroImage = ({
        image,
        index,
        imageCount,
        ...props
    }: any) => {
        const startPoint = (imageCount - 1 - index) / imageCount
        const endPoint = (imageCount - index) / imageCount

        const y = useTransform(
            scrollYProgress,
            [startPoint, endPoint],
            [0, -1000]
        )

        return (
            <div
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    zIndex: index,
                    transform: `translate(-50%, -50%)`,
                }}
            >
                <motion.img
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    src={image}
                    style={{
                        y,
                    }}
                />
            </div>
        )
    }

    return (
        <StoryWrapper
            workInProgress
            style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: pageHeight,
            }}
        >
            <ScrollDownHint />

            <FixedPanel
                style={{ padding: 'calc(121 / 900 * 100vh) 42px' }}
                center
            >
                <Flex grow>
                    <RecklessNeue fontSize={96} maxWidth={1330} center>
                        Experience is the true North Star for digital
                        transformation.
                    </RecklessNeue>
                    {[...introImages].reverse().map((image, index, images) => (
                        <AnimatedImageIntroImage
                            image={image}
                            key={index}
                            index={index}
                            imageCount={images.length}
                        />
                    ))}
                </Flex>
                <RiformaTrial fontSize={22} center maxWidth={908}>
                    We work with clients end-to-end, from defining and enabling
                    the vision, to ensuring ongoing market relevance. Our
                    diverse teams lead with empathy, data and creativity -
                    always in service of the experience. Through our holistic
                    experience-led transformation approach, we connect
                    experiences to operations, from front to back office.
                </RiformaTrial>
            </FixedPanel>
        </StoryWrapper>
    )
}

export const IntroImageSequencingAutoScroll: Story = () => {
    const duration = 2 * 1000

    useEffect(() => {
        const scrollDown = () => {
            // Scroll to the bottom of the page

            scrollIt(
                document.querySelector('#bottom'),
                duration,
                'easeInOutQuad'
            )
        }

        const timeoutId = setTimeout(scrollDown, 1000)
        return () => clearTimeout(timeoutId)
    }, [duration])

    return (
        <div>
            <IntroImageSequencingScrollBased pageHeight={'150vh'} />
            <a id="bottom" />
        </div>
    )
}
