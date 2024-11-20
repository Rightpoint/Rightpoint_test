import { render } from '@rightpoint/core/testing-library'

import { BackgroundColor } from './BackgroundColor.component'

describe('BackgroundColor', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<BackgroundColor />)
        expect(baseElement).toBeTruthy()
    })
})
