import { render } from '@rightpoint/core/testing-library'

import { WorkDetailText } from './WorkDetailText.component'
import { workDetailTextGenerators } from './WorkDetailText.data'

describe('WorkDetailText', () => {
    it('should render successfully', () => {
        const { baseElement } = render(
            <WorkDetailText {...workDetailTextGenerators.default()} />
        )
        expect(baseElement).toBeTruthy()
    })
})
