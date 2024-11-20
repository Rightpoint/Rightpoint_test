import { render } from '@rightpoint/core/testing-library'

import { LongRichText } from './LongRichText.component'
import { longRichTextGenerators } from './LongRichText.data'

describe('LongRichText', () => {
    it('should render successfully', () => {
        const { baseElement } = render(
            <LongRichText {...longRichTextGenerators.default()} />
        )
        expect(baseElement).toBeTruthy()
    })
})
