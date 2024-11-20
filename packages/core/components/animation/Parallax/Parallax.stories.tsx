import { ScrollStoryWrapper } from '../storybook/layouts/ScrollStoryWrapper'
import { Parallax } from './Parallax'
import { ParallaxImage } from './ParallaxImage'
import { ParallaxLayer } from './ParallaxLayer'

export default {
    title: 'animation/Parallax',
    component: Parallax,
    parameters: {
        layout: 'fullscreen',
    },
    argTypes: {},
}

export const ParallaxSection = () => (
    <ScrollStoryWrapper>
        <Parallax>
            <ParallaxLayer
                color="white"
                style={{
                    minHeight: '100vh',
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                }}
                interval={[1, 0]}
            >
                <h1>My text</h1>
                <p>
                    The story behind this lorem ipsum is one of exploration,
                    creativity and curiosity.
                </p>
                <p>
                    The story behind this lorem ipsum is one of exploration,
                    creativity and curiosity.
                </p>
                <p>
                    The story behind this lorem ipsum is one of exploration,
                    creativity and curiosity.
                </p>
            </ParallaxLayer>
        </Parallax>
    </ScrollStoryWrapper>
)

export const ParallaxImagePrimary = () => (
    <ScrollStoryWrapper>
        <ParallaxImage
            src="https://picsum.photos/id/164/1440/1440"
            alt="No Alt"
            style={{ height: '50vh' }}
        />
    </ScrollStoryWrapper>
)
