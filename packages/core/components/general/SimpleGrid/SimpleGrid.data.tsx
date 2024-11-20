import { SimpleGridItemProps, SimpleGridProps } from './SimpleGrid.component'
import { typography } from '@rightpoint/core/styles'
import { fakerWithSeed } from '@rightpoint/data-generators'
import { startCase, times } from 'lodash'
import { GridLayouts, GridItemVariants } from './SimpleGrid.styles'
import { makeTypedGeneratorFn } from '@rightpoint/core/utils'

const generateItems = ({ num = 5, body = '' } = {}): SimpleGridItemProps[] =>
    times(num, () => ({
        title: startCase(fakerWithSeed.commerce.color()),
        // subTitle: fakerWithSeed.lorem.sentence(),
        body: body || startCase(fakerWithSeed.lorem.sentences(5)),
    }))

export const gridGenerators = makeTypedGeneratorFn<SimpleGridProps>()({
    default: () => ({
        items: generateItems(),
        variant: GridItemVariants.ClientList,
    }),
    clientList: () => ({
        items: generateItems({
            body: `Ongoing transformation of IKEA's omnichannel commerce, in-store, and employee-facing products, including launching its first e-commerce app.`,
        }),
    }),
    capabilities: () => ({
        items: generateItems({
            body: `Concept Prototyping
                   Experience Design
                   Experience Mapping
                   Information Architecture`,
        }),
    }),
    logoGrid: () => ({
        items: times(6, (i) => ({
            image: {
                src: `/static/placeholder/logos/logo-${i + 1}.png`,
                alt: '',
            },
        })),
    }),
})
