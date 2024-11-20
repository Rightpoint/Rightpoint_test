import { render } from '@rightpoint/core/testing-library'

import { HorizontalCards } from './HorizontalCards.component'
import { horizontalCardsGenerators } from './HorizontalCards.data'

describe('HorizontalCards', () => {
    it('should render successfully', () => {
        const { baseElement } = render(
            <HorizontalCards {...horizontalCardsGenerators.default()} />
        )
        expect(baseElement).toBeTruthy()
    })
})
