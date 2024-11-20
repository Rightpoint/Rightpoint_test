import { render } from '@rightpoint/core/testing-library'

import { Button } from './Button.component'

describe('Button', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<Button />)
        expect(baseElement).toBeTruthy()
    })
})
