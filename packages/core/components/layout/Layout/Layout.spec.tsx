import { render } from '@rightpoint/core/testing-library'

import { Layout } from './Layout.component'

describe('Layout', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<Layout />)
        expect(baseElement).toBeTruthy()
    })
})
