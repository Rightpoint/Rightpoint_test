import { render } from '@rightpoint/core/testing-library'

import { PageHeader } from './PageHeader.component'
import { pageHeaderGenerators } from './PageHeader.data'

describe('PageHeader', () => {
    it('should render successfully', () => {
        const { baseElement } = render(
            <PageHeader {...pageHeaderGenerators.default()} />
        )
        expect(baseElement).toBeTruthy()
    })
})
