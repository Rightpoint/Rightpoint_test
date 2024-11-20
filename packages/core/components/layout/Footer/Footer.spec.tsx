import { render } from '@rightpoint/core/testing-library'

import { Footer } from './Footer.component'

describe('Footer', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<Footer />)
        expect(baseElement).toBeTruthy()
    })
})
