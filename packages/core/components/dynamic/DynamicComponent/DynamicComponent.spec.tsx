import { render } from '@rightpoint/core/testing-library'

import { DynamicComponent } from './DynamicComponent.component'
import { dynamicComponentGenerators } from './DynamicComponent.data'

describe('DynamicComponent', () => {
    it('should render successfully', () => {
        const { baseElement } = render(
            <DynamicComponent {...dynamicComponentGenerators.default()} />
        )
        expect(baseElement).toBeTruthy()
    })
})
