import { render } from '@rightpoint/core/testing-library'

import { HeroBanner } from './HeroBanner.component'
import { heroBannerGenerators } from './HeroBanner.data'

describe('HeroBanner', () => {
    it('should render successfully', () => {
        const { baseElement } = render(
            <HeroBanner {...heroBannerGenerators.default()} />
        )
        expect(baseElement).toBeTruthy()
    })
})
