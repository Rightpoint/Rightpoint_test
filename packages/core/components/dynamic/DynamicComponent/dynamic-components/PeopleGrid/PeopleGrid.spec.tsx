import { render } from '@rightpoint/core/testing-library'

import { PeopleGrid } from './PeopleGrid.component'
import { peopleGridGenerators } from './PeopleGrid.data'

describe('PeopleGrid', () => {
    it('should render successfully', () => {
        const { baseElement } = render(
            <PeopleGrid {...peopleGridGenerators.default()} />
        )
        expect(baseElement).toBeTruthy()
    })
})
