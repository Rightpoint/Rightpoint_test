import { render } from '@rightpoint/core/testing-library'

import { MidArticleCta } from './MidArticleCta.component'
import { midArticleCtaGenerators } from './MidArticleCta.data'

describe('MidArticleCta', () => {
    it('should render successfully', () => {
        const { baseElement } = render(
            <MidArticleCta {...midArticleCtaGenerators.default()} />
        )
        expect(baseElement).toBeTruthy()
    })
})
