import { render } from '@rightpoint/core/testing-library'

import { TabsNav } from './TabsNav.component'
import { tabsNavGenerators } from './TabsNav.data'

describe('TabsNav', () => {
    it('should render successfully', () => {
        const { baseElement } = render(
            <TabsNav {...tabsNavGenerators.default()} />
        )
        expect(baseElement).toBeTruthy()
    })
})
