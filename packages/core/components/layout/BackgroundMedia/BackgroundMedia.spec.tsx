import { render } from '@rightpoint/core/testing-library'

import { BackgroundMedia } from './BackgroundMedia.component'
import { backgroundMediaGenerators } from './BackgroundMedia.data'

describe('BackgroundMedia', () => {
    it('should render successfully', () => {
        const { baseElement } = render(
            <BackgroundMedia {...backgroundMediaGenerators.default()} />
        )
        expect(baseElement).toBeTruthy()
    })
})
