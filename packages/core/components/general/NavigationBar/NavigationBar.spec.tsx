import { render } from '@rightpoint/core/testing-library'

import { NavigationBar } from './NavigationBar.component'
import { navigationBarGenerators } from './NavigationBar.data'

describe('NavigationBar', () => {
    it('should render successfully', () => {
        const { baseElement } = render(
            <NavigationBar {...navigationBarGenerators.default()} />
        )
        expect(baseElement).toBeTruthy()
    })
})
