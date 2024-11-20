import { render } from '@rightpoint/core/testing-library'

import { NavbarPopupPreview } from './NavbarPopupPreview.component'

describe('NavbarPopupPreview', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<NavbarPopupPreview />)
        expect(baseElement).toBeTruthy()
    })
})
