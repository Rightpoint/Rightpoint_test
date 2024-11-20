import { render } from '@rightpoint/core/testing-library'
import { Card } from './Card.component'
import { cardGenerators } from './Card.data'

describe('Card', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<Card {...cardGenerators.default()} />)
        expect(baseElement).toBeTruthy()
    })
})
