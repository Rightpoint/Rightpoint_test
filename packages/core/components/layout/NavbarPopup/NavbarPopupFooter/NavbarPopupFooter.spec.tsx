import { render } from '@rightpoint/core/testing-library'

import { NavbarPopupFooter } from './NavbarPopupFooter.component'

describe('NavbarPopupFooter', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<NavbarPopupFooter />)
        expect(baseElement).toBeTruthy()
    })
})
