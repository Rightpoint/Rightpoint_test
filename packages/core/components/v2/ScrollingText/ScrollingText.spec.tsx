import { render } from '@rightpoint/core/testing-library'

import { ScrollingText } from './ScrollingText.component'
import { scrollingTextGenerators } from './ScrollingText.data'

describe('ScrollingText', () => {
    it('should render successfully', () => {
        const { baseElement } = render(
            <ScrollingText {...scrollingTextGenerators.default()} />
        )
        expect(baseElement).toBeTruthy()
    })
})
