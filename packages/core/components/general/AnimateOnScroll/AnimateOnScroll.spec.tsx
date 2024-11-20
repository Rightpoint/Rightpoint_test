import { render } from '@rightpoint/core/testing-library'

import { AnimateOnScroll } from './AnimateOnScroll.component'

describe('AnimateOnScroll', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<AnimateOnScroll />)
        expect(baseElement).toBeTruthy()
    })
})
