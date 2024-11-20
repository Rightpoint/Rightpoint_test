import { startCase, times } from 'lodash'
import { Card } from '../Card/Card.component'
import { cardGenerators } from '../Card/Card.data'
import { fakerWithSeed } from '@rightpoint/data-generators'
import { AspectWrapperContextProvider } from '../../utils/AspectWrapper/AspectWrapper.context'

export const generateScrollerChildren = ({ count = 4, titleWords = 2 }) => {
    return times(count, (i) => {
        const ratio = fakerWithSeed.random.arrayElement([16 / 9, 4 / 3, 1])
        return (
            <AspectWrapperContextProvider aspectWrapperRatio={ratio}>
                <Card key={i} {...cardGenerators.default()} />
            </AspectWrapperContextProvider>
        )
    })
}

export const scrollerGenerators = {
    default: ({ count = 10 } = {}) => ({
        children: generateScrollerChildren({ count }),
    }),
    fewer: () => ({ children: generateScrollerChildren({ count: 3 }) }),
    longerTitle: () => ({
        children: generateScrollerChildren({ count: 10, titleWords: 6 }),
    }),

    cardPersons: ({ count = 10 } = {}) => ({
        children: times(count, (index) => {
            return <></>
        }),
    }),
}
