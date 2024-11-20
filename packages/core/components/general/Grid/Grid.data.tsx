import { GridItemProps, GridLayoutProps, GridProps } from './Grid.component'
import { startCase, times } from 'lodash'
import { type MultiMediaProps } from '../MultiMedia/MultiMedia.component'
import { multiMediaGenerators } from '../MultiMedia/MultiMedia.data'
import { GridLayouts } from './Grid.types'
import { fakerWithSeed } from '@rightpoint/data-generators'
import { CardVariants } from '../Card/Card.component'
import { makeTypedGeneratorFn } from '@rightpoint/core/utils'

type ItemGeneratorProps = {
    titleWords: number
    num: number
    bodyWords: number
    multiMediaPropsFunc: () => MultiMediaProps
    withLink: boolean
}

type GenerateItems = (args?: Partial<ItemGeneratorProps>) => GridItemProps[]
const generateItems: GenerateItems = ({
    titleWords = 2,
    num = 10,
    bodyWords = 5,
    multiMediaPropsFunc = () => multiMediaGenerators.portrait(),
    withLink = true,
}) =>
    times(num ?? 10, (i) => ({
        title: startCase(fakerWithSeed.lorem.words(titleWords)),
        body: startCase(fakerWithSeed.lorem.words(bodyWords)),
        multiMediaProps: multiMediaPropsFunc(),
        linkProps: withLink
            ? {
                  href: fakerWithSeed.internet.url(),
                  text: 'Read more',
              }
            : undefined,
    }))

export const gridGenerators = makeTypedGeneratorFn<GridProps>()({
    default: ({ num = undefined, itemsProps = {} } = {}) => ({
        title: 'Grid1 Example',
        items: generateItems({ num, ...itemsProps }),
        gridLayout: GridLayouts.Grid1,
        cardVariant: CardVariants.Card1,
    }),

    grid2: ({ num = undefined, itemsProps = {} } = {}) => ({
        title: 'Grid2 Example',
        items: generateItems({ num, ...itemsProps }),
        gridLayout: GridLayouts.Grid2,
        cardVariant: CardVariants.Card2,
    }),

    grid3: ({ num = undefined, itemsProps = {} } = {}) => ({
        title: 'Grid3 Example',
        items: generateItems({
            num,
            titleWords: 5,
            bodyWords: 0,
            ...itemsProps,
        }),
        gridLayout: GridLayouts.Grid3,
        cardVariant: CardVariants.Card3,
    }),

    otherMultiMedia: ({ num = undefined, itemsProps = {} } = {}) => ({
        items: generateItems({
            num,
            titleWords: 5,
            bodyWords: 0,
            multiMediaPropsFunc: () => multiMediaGenerators.animatedImages(),
            ...itemsProps,
        }),
        title: 'Other MultiMedia Example',
        gridLayout: GridLayouts.Grid3,
        cardVariant: CardVariants.Card3,
    }),

    video: ({ num = undefined, itemsProps = {} }) => ({
        title: 'Video example',
        gridLayout: GridLayouts.Grid1,
        cardVariant: CardVariants.Card3,
        items: generateItems({
            num: 2,
            multiMediaPropsFunc: () => multiMediaGenerators.video(),
        }),
    }),
})
