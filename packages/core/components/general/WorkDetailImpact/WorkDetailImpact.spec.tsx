import { render } from '@rightpoint/core/testing-library'

import { WorkDetailImpact } from './WorkDetailImpact.component'
import { workDetailImpactGenerators } from './WorkDetailImpact.data'

describe('WorkDetailImpact', () => {
    it('should render successfully', () => {
        const { baseElement } = render(
            <WorkDetailImpact {...workDetailImpactGenerators.default()} />
        )
        expect(baseElement).toBeTruthy()
    })
})
