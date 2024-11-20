import { render } from '@rightpoint/core/testing-library'

import { HeaderTypewriter } from './HeaderTypewriter.component'
import { headerTypewriterGenerators } from './HeaderTypewriter.data'

describe('HeaderTypewriter', () => {
    it('should render successfully', () => {
        const { baseElement } = render(
            <HeaderTypewriter {...headerTypewriterGenerators.default()} />
        )
        expect(baseElement).toBeTruthy()
    })
})
