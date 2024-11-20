import { render } from '@rightpoint/core/testing-library'

import { ThoughtHeader } from './ThoughtHeader.component'
import { thoughtHeaderGenerators } from './ThoughtHeader.data'

describe('ThoughtHeader', () => {
    it('should render successfully', () => {
        const { baseElement } = render(
            <ThoughtHeader {...thoughtHeaderGenerators.default()} />
        )
        expect(baseElement).toBeTruthy()
    })
})
