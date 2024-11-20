import { render } from '@rightpoint/core/testing-library'
import { Page500 } from './500.page'

describe('ComingSoonPage', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<Page500 />)
        expect(baseElement).toBeTruthy()
    })
})
