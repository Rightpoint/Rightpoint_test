import { render } from '@rightpoint/core/testing-library'

import { Link } from './Link.component'
import { linkGenerators } from './Link.data'

describe('Link', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<Link {...linkGenerators.default()} />)
        expect(baseElement).toBeTruthy()
    })
})
