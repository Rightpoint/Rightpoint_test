import { render } from '@rightpoint/core/testing-library'

import { WorkDetailMedia } from './WorkDetailMedia.component'
import { workDetailMediaGenerators } from './WorkDetailMedia.data'

describe('WorkDetailMedia', () => {
    it('should render successfully', () => {
        const { baseElement } = render(
            <WorkDetailMedia {...workDetailMediaGenerators.default()} />
        )
        expect(baseElement).toBeTruthy()
    })
})
