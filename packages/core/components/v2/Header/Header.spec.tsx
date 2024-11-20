import { render } from '@rightpoint/core/testing-library'

import { Header } from './Header.component'
import { headerGenerators } from './Header.data'

describe('Header', () => {
    it('should render successfully', () => {
        const { baseElement } = render(
            <Header {...headerGenerators.default()} />
        )
        expect(baseElement).toBeTruthy()
    })
})
