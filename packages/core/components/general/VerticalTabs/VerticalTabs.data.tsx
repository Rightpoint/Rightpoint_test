import { multiMediaGenerators } from '../MultiMedia/MultiMedia.data'
import { VerticalTabsProps } from './VerticalTabs.component'

export const verticalTabsGenerators = {
    default: (): VerticalTabsProps => ({
        items: [
            {
                title: 'Insights',
                description: `Ongoing transformation of IKEA's omnichannel commerce, in-store, and employee-facing products, including launching its first e-commerce app.`,
                multiMediaProps: multiMediaGenerators.threeDimensional({
                    filename: '1',
                }),
            },
            {
                title: 'Strategy',
                description: `Ongoing transformation of IKEA's omnichannel commerce, in-store, and employee-facing products, including launching its first e-commerce app.`,
                multiMediaProps: multiMediaGenerators.threeDimensional({
                    filename: '2',
                }),
            },
            {
                title: 'Design',
                description: `Ongoing transformation of IKEA's omnichannel commerce, in-store, and employee-facing products, including launching its first e-commerce app.`,
                multiMediaProps: multiMediaGenerators.threeDimensional({
                    filename: '3',
                }),
            },
            {
                title: 'Content',
                description: `Ongoing transformation of IKEA's omnichannel commerce, in-store, and employee-facing products, including launching its first e-commerce app.`,
                multiMediaProps: multiMediaGenerators.threeDimensional({
                    filename: '4',
                }),
            },

            {
                title: 'Engineering',
                description: `Ongoing transformation of IKEA's omnichannel commerce, in-store, and employee-facing products, including launching its first e-commerce app.`,
                multiMediaProps: multiMediaGenerators.threeDimensional({
                    filename: '5',
                }),
            },
        ],
    }),
}
