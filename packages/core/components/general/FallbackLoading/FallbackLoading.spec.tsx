import { render } from '@rightpoint/core/testing-library'

import { FallbackLoading } from './FallbackLoading.component'

describe('FallbackLoading', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<FallbackLoading />)
        expect(baseElement).toBeTruthy()
    })
})
