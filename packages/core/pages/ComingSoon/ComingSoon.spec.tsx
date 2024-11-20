import { render } from '@rightpoint/core/testing-library'
import { ComingSoonPage } from './ComingSoon.page'

describe('ComingSoonPage', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<ComingSoonPage />)
        expect(baseElement).toBeTruthy()
    })
})
