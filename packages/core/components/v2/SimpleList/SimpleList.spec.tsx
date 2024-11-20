import { render } from '@rightpoint/core/testing-library'

import { SimpleList } from './SimpleList.component'
import { simpleListGenerators } from './SimpleList.data'

describe('SimpleList', () => {
    it('should render successfully', () => {
        const { baseElement } = render(
            <SimpleList {...simpleListGenerators.default()} />
        )
        expect(baseElement).toBeTruthy()
    })
})
