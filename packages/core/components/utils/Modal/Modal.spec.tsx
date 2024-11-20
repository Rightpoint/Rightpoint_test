import { render } from '@rightpoint/core/testing-library'

import { Modal } from './Modal.component'
import { modalGenerators } from './Modal.data'

describe('Modal', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<Modal {...modalGenerators.default()} />)
        expect(baseElement).toBeTruthy()
    })
})
