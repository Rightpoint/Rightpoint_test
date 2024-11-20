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

export const TwoJoiningWithBackground = () => {
    const scrollProgressInterval = [0, 1]

    return (
        <ScrollStoryWrapper
            style={{ background: 'black' }}
            placeholderHeight="110vh"
        >
            <ScrollAnimation>
                <Surface
                    color="green"
                    style={{ height: '100vh' }}
                    animation={{
                        initial: {
                            scale: 0.2,
                            scrollProgress: scrollProgressInterval[0],
                        },
                        final: {
                            scrollProgress: scrollProgressInterval[1],
                        },
                    }}
                    debug
                />
                <Surface
                    aspectRatio={16 / 9}
                    color="red"
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '25%',
                        width: '25%',
                        transform: 'translateY(-50%)',
                    }}
                    animation={{
                        initial: {
                            translateX: '-100%',
                            translateY: '-50%',
                            scrollProgress: scrollProgressInterval[0],
                        },
                        final: {
                            translateY: '-50%',
                            scrollProgress: scrollProgressInterval[1],
                        },
                    }}
                >
                    Side A
                </Surface>
                <Surface
                    aspectRatio={16 / 9}
                    color="blue"
                    style={{
                        position: 'absolute',
                        top: '50%',
                        right: '25%',
                        width: '25%',
                        transform: 'translateY(-50%)',
                    }}
                    animation={{
                        initial: {
                            translateX: '100%',
                            translateY: '-50%',
                            scrollProgress: scrollProgressInterval[0],
                        },
                        final: {
                            translateY: '-50%',
                            scrollProgress: scrollProgressInterval[1],
                        },
                    }}
                >
                    Side B
                </Surface>
            </ScrollAnimation>
        </ScrollStoryWrapper>
    )
}
