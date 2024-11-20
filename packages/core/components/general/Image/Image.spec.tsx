import { render } from '@rightpoint/core/testing-library'
import { ImageWithAspect } from './Image.component'
import { imageGenerators } from './Image.data'

describe('Image', () => {
    it('should render successfully', () => {
        const { baseElement } = render(
            <ImageWithAspect
                {...imageGenerators.default()}
                alt="This should be provided"
            />
        )
        expect(baseElement).toBeTruthy()
    })
})
