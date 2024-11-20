import { render } from '@rightpoint/core/testing-library'

import { WhatWeDeliver } from './WhatWeDeliver.component'
import { whatWeDeliverGenerators } from './WhatWeDeliver.data'

describe('WhatWeDeliver', () => {
    it('should render successfully', () => {
        const { baseElement } = render(
            <WhatWeDeliver {...whatWeDeliverGenerators.default()} />
        )
        expect(baseElement).toBeTruthy()
    })
})
