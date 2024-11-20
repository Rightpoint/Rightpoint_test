import { render } from '@rightpoint/core/testing-library'

import { Hero } from './Hero.component'

describe('Hero', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<Hero title="Hero Title" />)
        expect(baseElement).toBeTruthy()
    })
})
