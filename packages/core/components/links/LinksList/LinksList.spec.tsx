import { render } from '@rightpoint/core/testing-library'

import { LinksList } from './LinksList.component'
import { linksListGenerators } from './LinksList.data'

describe('LinksList', () => {
    it('should render successfully', () => {
        const { baseElement } = render(
            <LinksList {...linksListGenerators.default()} />
        )
        expect(baseElement).toBeTruthy()
    })
})
