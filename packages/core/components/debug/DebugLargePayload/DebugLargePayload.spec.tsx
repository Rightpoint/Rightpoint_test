import { render } from '@rightpoint/core/testing-library'

import { DebugLargePayload } from './DebugLargePayload.component'

describe('DebugLargePayload', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<DebugLargePayload />)
        expect(baseElement).toBeTruthy()
    })
})
