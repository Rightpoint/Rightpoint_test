import { render } from '@rightpoint/core/testing-library'

import { NavbarPopupContent } from './NavbarPopupContent.component'

describe('NavbarPopupContent', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<NavbarPopupContent />)
        expect(baseElement).toBeTruthy()
    })
})
