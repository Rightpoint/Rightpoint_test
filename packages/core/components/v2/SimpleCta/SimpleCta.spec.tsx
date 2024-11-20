import { render } from '@rightpoint/core/testing-library'

import { SimpleCta } from './SimpleCta.component'
import { simpleCtaGenerators } from './SimpleCta.data'

describe('SimpleCta', () => {
    it('should render successfully', () => {
        const { baseElement } = render(
            <SimpleCta {...simpleCtaGenerators.default()} />
        )
        expect(baseElement).toBeTruthy()
    })
})
