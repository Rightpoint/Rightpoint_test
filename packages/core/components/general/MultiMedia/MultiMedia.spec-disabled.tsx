import { render } from '@rightpoint/core/testing-library'

import { MultiMedia } from './MultiMedia.component'
import { multiMediaGenerators } from './MultiMedia.data'

describe('Media', () => {
    it('should render animated images successfully', () => {
        const { baseElement } = render(
            <MultiMedia {...multiMediaGenerators.animatedImages()} />
        )
        expect(baseElement).toBeTruthy()
    })
    it('should render image successfully', () => {
        const { baseElement } = render(
            <MultiMedia {...multiMediaGenerators.image()} />
        )
        expect(baseElement).toBeTruthy()
    })
    it('should render video successfully', () => {
        const { baseElement } = render(
            <MultiMedia {...multiMediaGenerators.video()} />
        )
        expect(baseElement).toBeTruthy()
    })
})
