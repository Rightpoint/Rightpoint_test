import { render } from '@rightpoint/core/testing-library'

import { InPageLinkList } from './InPageLinkList.component'
import { inPageLinkListGenerators } from './InPageLinkList.data'

describe('InPageLinkList', () => {
    it('should render successfully', () => {
        const { baseElement } = render(
            <InPageLinkList {...inPageLinkListGenerators.default()} />
        )
        expect(baseElement).toBeTruthy()
    })
})
