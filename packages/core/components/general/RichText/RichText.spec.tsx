import { render } from '@rightpoint/core/testing-library'

import { RichText } from './RichText.component'
import { richTextGenerators } from './RichText.data'

describe('RichText', () => {
    it('should render successfully', () => {
        const { baseElement } = render(
            <RichText {...richTextGenerators.default()} />
        )
        expect(baseElement).toBeTruthy()
    })
})
