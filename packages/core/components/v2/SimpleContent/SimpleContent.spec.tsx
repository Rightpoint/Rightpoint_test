import { render } from '@rightpoint/core/testing-library'

import { SimpleContent } from './SimpleContent.component'
import { SimpleContentGenerators } from './SimpleContent.data'

describe('SimpleContent', () => {
    it('should render successfully', () => {
        const { baseElement } = render(
            <SimpleContent {...SimpleContentGenerators.default()} />
        )
        expect(baseElement).toBeTruthy()
    })
})
