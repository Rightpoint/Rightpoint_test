import { render } from '@rightpoint/core/testing-library'
import { ScrollerFreeMode } from './ScrollerFreeMode/ScrollerFreeMode.component'
import { scrollerGenerators } from './Scroller.data'

jest.spyOn(global.console, 'warn').mockImplementationOnce((message) => {
    if (!message.includes('whileInView animations will trigger on mount')) {
        global.console.warn(message)
    }
})

jest.spyOn(global.console, 'error').mockImplementationOnce((message) => {
    if (!message.includes('list should have a unique "key" prop.')) {
        global.console.warn(message)
    }
})

describe('Scroller', () => {
    it('should render successfully', () => {
        const { baseElement } = render(
            <ScrollerFreeMode {...scrollerGenerators.default()} />
        )
        expect(baseElement).toBeTruthy()
    })
})
