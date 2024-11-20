import {
    AnimationContext,
    AnimationContextCustomProvider,
} from '../AnimationContext'
import { ScrollStoryWrapper } from '../storybook/layouts/ScrollStoryWrapper'
import { Surface } from '../Surface/Surface'

export default {
    title: 'animation/InViewport',
    component: Surface,
    parameters: {
        layout: 'fullscreen',
    },
    argTypes: {},
}

const Template = (args) => (
    <ScrollStoryWrapper>
        <AnimationContextCustomProvider
            value={{
                type: 'in-viewport',
            }}
        >
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '10vh',
                }}
            >
                <Surface
                    debug
                    style={{
                        width: '30vh',
                    }}
                    animation={{
                        initial: {
                            opacity: 0,
                            translateY: '10%',
                        },
                        final: {
                            opacity: 1,
                            translateY: '0%',
                        },
                    }}
                    aspectRatio={9 / 16}
                    backgroundMedia={{
                        src: 'https://picsum.photos/id/121/800/600',
                        alt: 'No alt',
                    }}
                />
            </div>
        </AnimationContextCustomProvider>
    </ScrollStoryWrapper>
)

export const Default = Template.bind({})

Default.args = {}
