import { render } from '@rightpoint/core/testing-library'

import { ComponentGroup } from './ComponentGroup.component'
import { componentGroupGenerators } from './ComponentGroup.data'

describe('ComponentGroup', () => {
    it('should render successfully', () => {
        const { baseElement } = render(
            <ComponentGroup {...componentGroupGenerators.default()} />
        )
        expect(baseElement).toBeTruthy()
    })
})
