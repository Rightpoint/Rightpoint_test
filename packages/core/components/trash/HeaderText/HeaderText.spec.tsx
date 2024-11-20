import { render } from '@rightpoint/core/testing-library'

import { HeaderText } from './HeaderText.component'

describe('Header', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<HeaderText />)
        expect(baseElement).toBeTruthy()
    })
})
