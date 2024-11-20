import { render } from '@rightpoint/core/testing-library'

import { Quote } from './Quote.component'
import { quoteGenerators } from './Quote.data'

describe('Quote', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<Quote {...quoteGenerators.default()} />)
        expect(baseElement).toBeTruthy()
    })
})
