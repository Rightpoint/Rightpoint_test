import { render } from '@rightpoint/core/testing-library'

import { BigLinkList } from './BigLinkList.component'
import { bigLinkListGenerators } from './BigLinkList.data'

describe('BigLinkList', () => {
    it('should render successfully', () => {
        const { baseElement } = render(
            <BigLinkList {...bigLinkListGenerators.manyLong()} />
        )
        expect(baseElement).toBeTruthy()
    })
})
