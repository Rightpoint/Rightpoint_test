import { render } from '@rightpoint/core/testing-library'

import { IconEyebrow } from './IconEyebrow.component'
import { iconEyebrowGenerators } from './IconEyebrow.data'

describe('IconEyebrow', () => {
    it('should render successfully', () => {
        const { baseElement } = render(
            <IconEyebrow {...iconEyebrowGenerators.default()} />
        )
        expect(baseElement).toBeTruthy()
    })
})
