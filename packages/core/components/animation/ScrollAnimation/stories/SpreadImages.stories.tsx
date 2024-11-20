import { ScrollStoryWrapper } from '../../storybook/layouts/ScrollStoryWrapper'
import { Surface } from '../../Surface/Surface'
import { ScrollAnimation } from '../ScrollAnimation'

export default {
    title: 'animation/ScrollAnimation',
    component: ScrollAnimation,
    parameters: {
        layout: 'fullscreen',
    },
    argTypes: {},
}

export const SpreadImages = () => {
    const scrollProgressInterval = [0, 1]

    return (
        <ScrollStoryWrapper
            style={{ background: 'black' }}
            placeholderHeight="110vh"
        >
            <ScrollAnimation scrollOffset={['start end', 'end start']}>
                <Surface
                    aspectRatio={11 / 16}
                    style={{
                        position: 'absolute',
                        width: '20vh',

                        top: 0,
                        zIndex: 1,
                    }}
                    animation={{
                        initial: {
                            left: '50%',
                            translateX: '-50%',
                            translateY: '0%',
                            scrollProgress: scrollProgressInterval[0],
                        },
                        final: {
                            left: '70%',
                            translateX: '-50%',
                            translateY: '50%',
                            scrollProgress: scrollProgressInterval[1],
                        },
                    }}
                    backgroundMedia={{
                        src: 'https://picsum.photos/id/121/800/600',
                        alt: 'No alt',
                    }}
                />
                <Surface
                    aspectRatio={9 / 16}
                    style={{
                        position: 'absolute',
                        width: '30vh',
                        top: 0,
                    }}
                    animation={{
                        initial: {
                            left: '50%',
                            translateX: '-50%',
                            translateY: '0%',
                            scrollProgress: scrollProgressInterval[0],
                        },
                        final: {
                            left: '30%',
                            translateX: '-50%',
                            translateY: '50%',
                            scrollProgress: scrollProgressInterval[1],
                        },
                    }}
                    backgroundMedia={{
                        src: 'https://picsum.photos/id/120/800/600',
                        alt: 'No alt',
                    }}
                />
                <Surface
                    aspectRatio={16 / 11}
                    style={{
                        position: 'absolute',
                        width: '30vh',
                        top: '20vh',
                        zIndex: 1,
                    }}
                    animation={{
                        initial: {
                            left: '45%',
                            translateX: '-50%',
                            translateY: '0%',
                            scrollProgress: scrollProgressInterval[0],
                        },
                        final: {
                            left: '80%',
                            translateX: '-50%',
                            translateY: '50%',
                            scrollProgress: scrollProgressInterval[1],
                        },
                    }}
                    backgroundMedia={{
                        src: 'https://picsum.photos/id/123/800/600',
                        alt: 'No alt',
                    }}
                />
                <Surface
                    aspectRatio={4 / 5}
                    style={{
                        position: 'absolute',
                        width: '30vh',
                        top: '20vh',
                    }}
                    animation={{
                        initial: {
                            left: '60%',
                            translateX: '-50%',
                            translateY: '0%',
                            scrollProgress: scrollProgressInterval[0],
                        },
                        final: {
                            left: '20%',
                            translateX: '-50%',
                            translateY: '50%',
                            scrollProgress: scrollProgressInterval[1],
                        },
                    }}
                    backgroundMedia={{
                        src: 'https://picsum.photos/id/122/800/600',
                        alt: 'No alt',
                    }}
                />
            </ScrollAnimation>
        </ScrollStoryWrapper>
    )
}
