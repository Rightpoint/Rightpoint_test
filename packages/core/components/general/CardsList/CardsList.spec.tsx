import { render } from '@rightpoint/core/testing-library'

import { CardsList } from './CardsList.component'
import { cardsListGenerators } from './CardsList.data'

describe('CardsList', () => {
    it('should render successfully', () => {
        const { baseElement } = render(
            <CardsList {...cardsListGenerators.default()} />
        )
        expect(baseElement).toBeTruthy()
    })
})
