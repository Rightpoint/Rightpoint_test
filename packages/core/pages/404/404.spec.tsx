import { render } from '@rightpoint/core/testing-library'
import { Page404 } from './404.page'

describe('ComingSoonPage', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<Page404 />)
        expect(baseElement).toBeTruthy()
    })
})
