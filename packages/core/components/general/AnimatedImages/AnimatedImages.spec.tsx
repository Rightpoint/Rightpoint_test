import { render } from '@rightpoint/core/testing-library'

import { AnimatedImages } from './AnimatedImages.component'
import { animatedImagesGenerators } from './AnimatedImages.data'

describe('MultiImage', () => {
    it('should render successfully', () => {
        const { baseElement } = render(
            <AnimatedImages {...animatedImagesGenerators.default()} />
        )
        expect(baseElement).toBeTruthy()
    })
})
