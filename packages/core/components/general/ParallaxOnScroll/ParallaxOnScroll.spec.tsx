import { render } from '@rightpoint/core/testing-library'
import { ParallaxOnScroll } from './ParallaxOnScroll.component'
import { parallaxOnScrollGenerators } from './ParallaxOnScroll.data'

describe('ParallaxOnScroll', () => {
    it('should render successfully', () => {
        const { baseElement } = render(
            <ParallaxOnScroll {...parallaxOnScrollGenerators.default()} />
        )
        expect(baseElement).toBeTruthy()
    })
})
